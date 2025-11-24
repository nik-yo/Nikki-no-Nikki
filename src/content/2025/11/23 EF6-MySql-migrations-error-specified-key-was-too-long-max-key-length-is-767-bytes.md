---
date: 2025-11-23
---

::post-title{:date="date"}
# EF6 MySql Migrations Error "Specified key was too long; max key length is 767 bytes"
::

::notes
This is a repost from my old blog. First posted in 3/18/2020.
::

<br/>

We were in the middle of moving to MySQL and would like to use EF Migrations against MySQL. But the error held us back a little.

<br/>

When trying to apply EF Migrations, it failed with "Specified key was too long; max key length is 767 bytes" error.

<br/>

The following article helped solve my problem.

[https://docs.microsoft.com/en-us/aspnet/identity/overview/getting-started/aspnet-identity-using-mysql-storage-with-an-entityframework-mysql-provider#adding-custom-migrationhistory-context]{.text-blue-600}

<br/>

Under "Adding custom MigrationHistory context" section, it talks about creating a custom HistoryContext class. In my case:

::code-block
```
Public Class MySqlHistoryContext
        Inherits HistoryContext

    Sub New(existingConnection As DbConnection, defaultSchema As String)
        MyBase.New(existingConnection, defaultSchema)
    End Sub

    Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
        MyBase.OnModelCreating(modelBuilder)
        modelBuilder.Entity(Of HistoryRow)().Property(Function(h) h.MigrationId).HasMaxLength(100).IsRequired()
        modelBuilder.Entity(Of HistoryRow)().Property(Function(h) h.ContextKey).HasMaxLength(200).IsRequired()
    End Sub
End Class
```
::

Then use it on the generated Configuration file. My problem is fixed afterwards.

::code-block
```
Friend NotInheritable Class Configuration
        Inherits DbMigrationsConfiguration(Of MyDbContext)

    Public Sub New()
        AutomaticMigrationsEnabled = False

        SetHistoryContextFactory(MySqlProviderInvariantName.ProviderName, Function(connection, schema) New MySqlHistoryContext(connection, schema))
    End Sub

    Protected Overrides Sub Seed(context As MyDbContext)
    End Sub

End Class
```
::