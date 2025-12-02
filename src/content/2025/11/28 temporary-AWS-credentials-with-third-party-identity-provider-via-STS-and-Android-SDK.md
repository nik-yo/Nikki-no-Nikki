---
date: 2025-11-28
---

::post-title{:date="date"}
# Temporary AWS Credentials with Third Party Identity Provider via STS and Android SDK
::

::notes
This is a repost from my old blog. First posted in 5/25/2020.
::

<br/>

Role has been the preferred way to gain access to AWS for mobile apps instead of hard coded credentials. A mobile app can assume a specific role via AWS STS (Security Token Service) in which a temporary AWS credentials will be returned. However, the implementation is not as easy as I thought it would be. 

<br/>

During my implementation time, I found that the documentation was not as clear and ended up spending a lot of time doing trial and error and re-reading articles.

<br/>

One of my requirements is I don't want to rely on AWS Cognito for identity at all since I already use a third party identity provider. It is, however, possible to use AWS Cognito as a bridge between the mobile app and the third party identity provider. My next requirement is I don't want to use AWS Amplify. AWS pushes Amplify usage very hard and it is indeed very easy to use, but I'm not too fond of the level of abstraction for my application. Another requirement is if possible, I want to use SDK instead of manually making a REST call.

<br/>

With those requirements in mind, I went to look for the documentation. My first meaningful documentation is the following article about AssumeRoleWithWebIdentity:

[https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#api_assumerolewithwebidentity]{.text-blue-600}

<br/>

In that section, AWS recommends AWS Cognito and nowhere obvious can I find what to do if I don't want to use it. After missing it a few times, the link that says AmazonSTSCredentialsProvider at the end of the section gives a clue and it leads to the following blog post:

[https://aws.amazon.com/blogs/mobile/using-the-amazoncredentialsprovider-protocol-in-the-aws-sdk-for-ios/]{.text-blue-600}

<br/>

Although the blog says for iOS, it is also applicable to Android.

<br/>

After rummaging through the API reference, AmazonSTSCredentialsProvider has many implementations, in which the one applicable to my case is the WebIdentityFederationSessionCredentialsProvider since it takes a token from third party identity provider and roleArn.

[https://aws-amplify.github.io/aws-sdk-android/docs/reference/com/amazonaws/auth/WebIdentityFederationSessionCredentialsProvider.html]{.text-blue-600}

<br/>

At this point, it is still not clear on what I need to do to be able to use the class above. 

<br/>

After few more online searches, I found the articles below to be helpful:

[https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html]{.text-blue-600}

<br/>

[https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html]{.text-blue-600}

<br/>

Eventually, the articles above lead to the article that helps me setup the whole thing:

[https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc_manual.html]{.text-blue-600}

To make it work, few things I need to do:

1. Create a role and note the ARN
2. Create an IAM Identity Provider entity. The link can be found in the IAM console page.
3. Set the role's Trust relationship with the Identity Provider as the trusted entity
4. On the mobile app, I use the following code:
5. At first, I made a mistake by providing an access token. It threw an error that it can't find iat property. When I switched to use id token, it managed to retrieve the temporary credentials which I then used to successfully to make an API call. For example, DynamoDB API call.

<br/>

In conclusion, my code in Kotlin that works is:

::code-block
```
val wif = WebIdentityFederationSessionCredentialsProvider(
                idToken,
                null,
                roleArn)
val dynamoDBClient = AmazonDynamoDBClient(wif)
dynamoDBClient.setRegion(Region.getRegion(region))
val scanRequest = ScanRequest(tableName)
```
::