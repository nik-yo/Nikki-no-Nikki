---
date: 2025-11-14
---

::post-title{:date="date"}
# Generate API Call with Orval and Axios from OpenAPI Schema
::

::notes
This is a repost from my old blog. First posted in 1/20/2020.
::

<br/>

I have a project with .NET Core 9.0 backend and React frontend. With the built-in OpenAPI support via ` Microsoft.AspNetCore.OpenApi`{.bg-gray-200 .p-2 .rounded}, it makes it so much easier to generate OpenAPI documents. For more information, visit [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview?view=aspnetcore-9.0]{.text-blue-600}.

<br/>

To automate the process, I want to generate the document after built. And that's pretty easy as well by following instructions in (Generate OpenAPI documents at build-time)[https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/aspnetcore-openapi?view=aspnetcore-9.0&tabs=visual-studio%2Cvisual-studio-code#generate-openapi-documents-at-build-time]{.text-blue-600} article.

<br/>

In my csproj file, I put the following entries, so the Open API documents can be exported to a common location outside of the backend project directory with name `api.json`{.bg-gray-200 .p-2 .rounded}.

::code-block
```
<PropertyGroup>
  <OpenApiDocumentsDirectory>../../../openapi</OpenApiDocumentsDirectory>
  <OpenApiGenerateDocumentsOptions>--file-name api</OpenApiGenerateDocumentsOptions>
  ...
</PropertyGroup>
```
::

<br/>

On the frontend, I would like to automatically ingest that document and automatically generate code to make the api call. That's where Orval ([https://orval.dev/]{.text-blue-600}) comes in. Since I want to use custom Axios instance, I use the following guide: [https://orval.dev/guides/custom-axios]{.text-blue-600}. My `orval.config.js`{.bg-gray-200 .p-2 .rounded} looks like the following:

::code-block
```
import { defineConfig } from 'orval';

export default defineConfig({
  api: { //custom name, it can be any friendly name.
    input: '../openapi/api.json',
    output: {
      mode: 'single',
      target: 'src/api/api.ts',
      schemas: 'src/api/model',
      mock: false,
      override: {
        mutator: {
          path: './src/services/axios-service.ts',
          name: 'request'
        }
      }
    }
  }
});
```
::

<br/>

The `input`{.bg-gray-200 .p-2 .rounded} is the path to the Open API document. Within output, `mode: Single`{.bg-gray-200 .p-2 .rounded} tells Orval to generate a single file for all calls (usually one function per endpoint): [https://orval.dev/reference/configuration/output#value-single]{.text-blue-600}. And `target`{.bg-gray-200 .p-2 .rounded} is the output location and name of the generated code. While `schemas`{.bg-gray-200 .p-2 .rounded} will hold the generated models/DTOs that represents request and response data. I just turn `mock`{.bg-gray-200 .p-2 .rounded} to false since I don't use Faker at this time [https://orval.dev/reference/configuration/output#mock]{.text-blue-600}.

<br/>

The override is where the interesting thing happen. In my case, it basically says, use the `request`{.bg-gray-200 .p-2 .rounded} function in `./src/services/axios-service.ts`{.bg-gray-200 .p-2 .rounded} to make the call.

<br/>

My axios-service.ts contains the following:

::code-block
```
export const request = <T>(
    config: AxiosRequestConfig,
    params?: Params
  ): Promise<T> => {
    axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;

    const source = axios.CancelToken.source();
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${params?.accessToken}`
      }
    };
    
    const promise = axiosInstance(axiosConfig).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled');
    };

    return promise;
  };
```
::

This way, I use the BASE_URL specified in .env file so I can differentiate between local and remote environment. Also, I allow injection of access token, so my call can be authorized by the backend.

<br/>

Orval will then generate something similar to the following calls in api.ts:

::code-block
```
options?: SecondParameter<typeof request<UserResponse>>,) => {
      return request<UserResponse>(
      {url: `/users`, method: 'POST'
    },
      options);
    }
  
export const getCustomers = (
    
 options?: SecondParameter<typeof request<CustomersResponse[]>>,) => {
      return request<CustomersResponse[]>(
      {url: `/customers`, method: 'GET'
    },
      options);
    }
  
export const postCustomers = (
    customersRequest: CustomersRequest,
 options?: SecondParameter<typeof request<void>>,) => {
      return request<void>(
      {url: `/customers`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: customersRequest
    },
      options);
    }
```
::

In package.json, I added command to run orval during `npm run dev`{.bg-gray-200 .p-2 .rounded} and `npm run build`{.bg-gray-200 .p-2 .rounded} commands:

::code-block
"scripts": {
  "dev": "orval && ...",
  "build": "orval && ...",
  ...
}
```
::

That way, when I run the frontend locally, it will generate the code using the latest document. It will also generate when run within CI/CD pipeline. It saves a lot of time by automatically modify the frontend code when the backend api changes.