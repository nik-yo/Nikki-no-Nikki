---
date: 2025-10-30
---

::post-title{:date="date"}
# Amazon Aurora Serverless "The provider did not return a ProviderManifestToken string" Error
::

::notes
This is a repost from my old blog. First posted in 8/26/2019.
::

<br/>

We had a good working application which connect to Amazon Aurora Serverless pretty well and just recently it started to intermittently unable to connect with the error "The provider did not return a ProviderManifestToken string". The following is some spec of the application:

.NET Framework 4.6.2
MySQL.Data 6.10.9
MySQL.Data.Entity 6.10.9
EntityFramework 6.2.0 (EF6)

<br/>

When I debugged the application, it has inner exception which has the message: "Sequence contains more than one matching element". Upon more troubleshooting, I remember that Aurora Serverless is a cluster and it requires at least 2 subnets which reside in 2 different Available Zones. Amazon does not recommend the use of IP address instead provide us with an endpoint to connect to the cluster. That means, the endpoint might resolve to two IP addresses.

<br/>

So, I decided to see what DNS lookup will show and indeed, the endpoint resolves to two IP addresses. Hence, my suspect is the MySQLConnection was expecting a single IP and receive two instead from the URL and thus throws an error. I tried to replace the endpoint in the connection string with one of the IP addresses and no error, but that is not the expected solution.

<br/>

Additionally, there are intermittent errors with the following message:
Authentication to host '...' for user '...' using method 'mysql_native_password' failed with message: Reading from the stream has failed

<br/>

With more reading, I stumbled upon the following article:

[https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html]{.text-blue-600}

<br/>

At the end of the articles, it says "If you use the mysql client to connect, currently you must use the MySQL 8.0-compatible mysql command."

<br/>

I then realized that I have been using MySQL.Data version 6.10.9 and that might need an update. However, there is no MySQL.Data.Entity with major version of 8 which I found out later that it has been changed to MySQL.Data.EntityFramework for .NET Framework application (for .NET Core application, use MySQL.Data.EntityFrameworkCore). So I put the endpoint back into the connection string and update the Nuget packages to:

MySQL.Data 8.0.20 8.0.17 
MySQL.Data.EntityFramework 8.0.20 8.0.17

<br/>

And this time, the application is finally able to connect successfully. As a side note, MySQL Workbench with major version of 8 that can connect just fine.

<br/>

Additionally, we need to have a custom DbExecutionStrategy to handle the error that might happen, possibly because of cut-off connection due to scaling, and retry. In my case, it is like the following:

::code-block
```
Public Class MyCustomDbExecutionStrategy
        Inherits DbExecutionStrategy

    Sub New(maxRetryCount As Integer, maxDelay As TimeSpan)
        MyBase.New(maxRetryCount, maxDelay)
    End Sub

    Protected Overrides Function ShouldRetryOn(exception As Exception) As Boolean
        Return exception IsNot Nothing AndAlso exception.Message.Contains("Reading from the stream has failed")")
    End Function
End Class

And the custom DbExecutionStrategy has to be applied manually as follow:

Dim executionStrategy As New MyCustomDbExecutionStrategy(5, TimeSpan.FromSeconds(15))
executionStrategy.Execute(
    Sub()
        Using dbContext = New MyDbContext()
        ...
        End Using
    End Sub)
```
::

<br/>

Please refer to update July 2, 2020 and July 6, 2020 for additional information.

**Updates**
November 14, 2019
For somewhat reason, updating the Nuget packages to version 8.0.18 brings back the error, so we stay with 8.0.17 for now.

November 27, 2019
I have a bit of time to play so I checked if the new version really doesn't work. After upgrading it from 8.0.17 to 8.0.18, it truly doesn't work. The following are the error messages and stack traces 3 layer deep exception:

::code-block
```
Top level exception
"The provider did not return a ProviderManifestToken string."

   at System.Data.Entity.Core.Common.DbProviderServices.GetProviderManifestToken(DbConnection connection)
   at MySql.Data.EntityFramework.MySqlManifestTokenResolver.ResolveManifestToken(DbConnection connection)
   at System.Data.Entity.Utilities.DbConnectionExtensions.GetProviderInfo(DbConnection connection, DbProviderManifest& providerManifest)
   at System.Data.Entity.DbModelBuilder.Build(DbConnection providerConnection)
   at System.Data.Entity.Internal.LazyInternalContext.CreateModel(LazyInternalContext internalContext)
   at System.Data.Entity.Internal.RetryLazy`2.GetValue(TInput input)
   at System.Data.Entity.Internal.LazyInternalContext.InitializeContext()
   at System.Data.Entity.Internal.InternalContext.Initialize()
   at System.Data.Entity.Internal.InternalContext.GetEntitySetAndBaseTypeForType(Type entityType)
   at System.Data.Entity.Internal.Linq.InternalSet`1.Initialize()
   at System.Data.Entity.Internal.Linq.InternalSet`1.AsNoTracking()
   at System.Data.Entity.Infrastructure.DbQuery`1.AsNoTracking()
   at ...
```
::

First inner exception

::code-block
```
"Unable to connect to any of the specified MySQL hosts."

   at MySql.Data.MySqlClient.NativeDriver.Open()
   at MySql.Data.MySqlClient.Driver.Open()
   at MySql.Data.MySqlClient.Driver.Create(MySqlConnectionStringBuilder settings)
   at MySql.Data.MySqlClient.MySqlPool.CreateNewPooledConnection()
   at MySql.Data.MySqlClient.MySqlPool.GetPooledConnection()
   at MySql.Data.MySqlClient.MySqlPool.TryToGetDriver()
   at MySql.Data.MySqlClient.MySqlPool.GetConnection()
   at MySql.Data.MySqlClient.MySqlConnection.Open()
   at MySql.Data.MySqlClient.MySqlProviderServices.GetDbProviderManifestToken(DbConnection connection)
   at System.Data.Entity.Core.Common.DbProviderServices.GetProviderManifestToken(DbConnection connection)
```
::

Last inner exception

::code-block
```
"Sequence contains more than one matching element"

   at System.Linq.Enumerable.SingleOrDefault[TSource](IEnumerable`1 source, Func`2 predicate)
   at MySql.Data.Common.StreamCreator.GetTcpStream(MySqlConnectionStringBuilder settings)
   at MySql.Data.Common.StreamCreator.GetStream(MySqlConnectionStringBuilder settings)
   at MySql.Data.MySqlClient.NativeDriver.Open()
```
::

Searching online, I found the following thread:

[https://forums.mysql.com/read.php?38,678859,678859#msg-678859]{.text-blue-600}

which leads to the following bug report:

[https://bugs.mysql.com/bug.php?id=97448]{.text-blue-600}

And eventually the actual code change:

[https://github.com/mysql/mysql-connector-net/commit/9bc44843fda0c2e4aed1e22cc00c1221d17dc00b#diff-7440e953b4e85502ea58c60b17f249ee]{.text-blue-600}

For now, we still stick with 8.0.17 until further fix.

<br/>

June 25, 2020
Actually from the last update until now, we still experience intermittent issues with the error. So, I did few more testing. In my case, I took the following steps to get it completely error free. Probably some steps are not necessary but I haven't had time to test what is actually necessary.

**Step 1** (update 7/2/2020, the function somehow is not called)
Create custom DbExecutionStrategy. Mine is actually very simple. All I did is retry only when the error message contains "ProviderManifestToken". I found out MySqlExecutionStrategy that comes with the Nuget package doesn't work for my case.

::code-block
```
Protected Overrides Function ShouldRetryOn(exception As Exception) As Boolean
    Return exception IsNot Nothing AndAlso exception.Message.Contains("ProviderManifestToken")
End Function
```
::

<br/>

**Step 2**
Create a custom DbConfiguration. This is where we can set our custom DbExecutionStrategy. My custom class derives from MySqlEFConfiguration to get all the preset goodness.

::code-block
```
Public Class MyCustomDbConfiguration
        Inherits MySqlEFConfiguration

    Sub New()
        MyBase.New()
        SetExecutionStrategy(MySqlProviderInvariantName.ProviderName, Function() New MyCustomDbExecutionStrategy())
    End Sub

End Class
```
::

Couple of things to watch out for:
We can only use one DbConfiguration per provider per app domain. I got an error when trying to assign different configuration to different DbContext within a single application.
Somehow SetExecutionStrategy caused an error when we execute raw sql with the following message: "Index was out of range. Must be non-negative and less than the size of the collection. Parameter name: index". So we still use MySqlEFConfiguration for the application that has raw SQL.
SetExecutionStrategy is marked to cause an issue with Transactions in MySql GitHub.  For more info: [https://github.com/mysql/mysql-connector-net/blob/68c54371821c87ff40a773acc127ce357b46a5ae/Source/MySql.Data.EntityFramework6/MySqlEFConfiguration.cs]{.text-blue-600}

<br/>

**Step 3**
There are 3 different ways to apply a DbConfiguration according to the MySQL Connector documentation: [https://dev.mysql.com/doc/connector-net/en/connector-net-entityframework60.html]{.text-blue-600}

- Adding the DbConfigurationTypeAttribute on the context class
- Calling DbConfiguration.SetConfiguration(new MySqlEFConfiguration()) at the application start up
- Set the DbConfiguration type in the configuration file.

<br/>

What I didn't know is which one takes precedence over which. I found out later that the one in configuration file will take precedence over code-based:

[https://docs.microsoft.com/en-us/ef/ef6/fundamentals/configuring/code-based]{.text-blue-600}

<br/>

In my case, I need the DbContext to default to use MySqlEFConfiguration and overwrite as necessary. So for those applications that need to use the custom DbConfiguration, I added the codeConfigurationType attribute in the config file (app.config/web.config):

::code-block
```
<entityFramework codeConfigurationType="namespace.MyCustomDbConfiguration, assembly">
```
::

<br/>

**Step 4**
On my applications that has the error, the default connection factory was set to LocalDbConnectionFactory. So, following MySQL Connector documentation, I set it to the following under the `<entityFramework>`{.bg-gray-200 .p-2 .rounded} tag:

::code-block
```
<defaultConnectionFactory type="System.Data.Entity.Infrastructure.SqlConnectionFactory, EntityFramework"/>
```
::

I found out later that this step might not be necessary as it will only be used when there is no connection string, but I leave it that way since it doesn't hurt.

[https://docs.microsoft.com/en-us/ef/ef6/fundamentals/configuring/config-file#code-first-default-connection-factory]{.text-blue-600}

<br/>

**Step 5**
The server that hosted my problematic applications might not have MySql connector installed, so according to the MySQL Connector documentation, I should have added the following entry in the config file:

::code-block
```
<system.data>
   <DbProviderFactories>
     <remove invariant="MySql.Data.MySqlClient" />
     <add name="MySQL Data Provider" invariant="MySql.Data.MySqlClient" description=".Net Framework Data Provider for MySQL" 
          type="MySql.Data.MySqlClient.MySqlClientFactory, MySql.Data, Version=8.0.17.0, Culture=neutral, PublicKeyToken=c5687fc88969c44d" />
   </DbProviderFactories>
</system.data>
```
::

<br/>

Watch out for the version number. It needs to match the MySql.Data.dll assembly version.

<br/>

So far, the error has not re-appeared in my case. Also, there is a new version 8.0.20 Nuget packages as of this update. I haven't tested it extensively so I can't vouch for its compatibility for now. However, I might write an update once I am certain it doesn't cause issue in our applications.

<br/>

July 2, 2020
The steps on update June 25, 2020 was not working somehow. When we have a lot of processes hitting the database, the error message returns. I did a quick check and found out that the ShouldRetryOn function was not called. I ended up manually calling the execution strategy.

[https://docs.microsoft.com/en-us/ef/ef6/fundamentals/connection-resiliency/retry-logic#solution-manually-call-execution-strategy]{.text-blue-600}

::code-block
```
Dim executionStrategy As New MyCustomDbExecutionStrategy()
executionStrategy.Execute(
    Sub()
        Using dbContext = New MyDbContext()
        ...
        End Using
    End Sub)
```
::

On the Nuget version, I found out MySQL.Data and MySQL.Data.EntityFramework version 8.0.20 can connect to Aurora Serverless just fine.

<br/>

July 6, 2020
After diving deeper into the code, I had to make a few adjustment and finally managed to ensure that the exception was properly handled. 

First, I reanalyzed the exception details and found out the inner exception is slightly different than the one specified in update November 27, 2019 with the following message:

Authentication to host '...' for user '...' using method 'mysql_native_password' failed with message: Reading from the stream has failed

Second, by the time the exception reaches ShouldRetryOn method, it has been unwrapped.

[https://github.com/dotnet/ef6/blob/master/src/EntityFramework/Infrastructure/DbExecutionStrategy.cs]{.text-blue-600}

Third, I have to update my ShouldRetryOn to check for the error message above instead of checking for "ProviderManifestToken" string since it is the inner exception will be passed to ShouldRetryOn. In my case, I prefer to check for "Reading from the stream has failed" string with hope to capture broader errors.

::code-block
```
Protected Overrides Function ShouldRetryOn(exception As Exception) As Boolean
    Return exception IsNot Nothing AndAlso exception.Message.Contains("Reading from the stream has failed")")
End Function
```
::

Looking into the log file of my application, it finally retries fine and the application ran without issue.
