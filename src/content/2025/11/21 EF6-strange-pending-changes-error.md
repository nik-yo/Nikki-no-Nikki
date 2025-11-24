---
date: 2025-11-21
---

::post-title{:date="date"}
# EF6 Strange Pending Changes Error
::

::notes
This is a repost from my old blog. First posted in 3/16/2020.
::

<br/>

One of the complicated errors on EF6 that I often troubleshoot is the following:

::code-block
```
Unable to update database to match the current model because there are pending changes and automatic migration is disabled. Either write the pending model changes to a code-based migration or enable automatic migration. Set DbMigrationsConfiguration.AutomaticMigrationsEnabled to true to enable automatic migration.
```
::

Usually, I will just run `Add-Migration`{.bg-gray-200 .p-2 .rounded} on Package Manager Console to see what changes in the schema. But this time it is strange, the Add-Migration includes the code to create existing tables. I searched for the migration files between the time those tables were created and the latest migration, I can't find anywhere that those tables were dropped. When trying to find some clue online, I bumped into the following amazing article: [https://tech.trailmax.info/2014/03/inside_of_ef_migrations/]{.text-blue-600}.

<br/>

So, I went into the database and decompress a few blob/binary files from Model column. The files contain schema snapshots in the form of XML. And in my case, somewhere along the migrations, the tables were suddenly missing from the snapshots. However, the actual tables were still in the database.

<br/>

I also found out that my coworker at one time commented those tables out. But it is weird because if they were commented out and Add-Migration was triggered, the generated file would have DropTable code. When I asked my coworker, the migration file was not changed manually, so the DropTable code was not generated in the first place. But the latest snapshot doesn't have those tables in it.

<br/>

So, no DropTable, no manual migration file modification and no tables in the snapshot. It took me a few hours to understand how to recreate the issue.

<br/>

With everything as is, I run Add-Migration once. EF then generates a new migration file and shows the following message in the console:

::code-block
```
The Designer Code for this migration file includes a snapshot of your current Code First model. This snapshot is used to calculate the changes to your model when you scaffold the next migration. If you make additional changes to your model that you want to include in this migration, then you can re-scaffold it by running 'Add-Migration TestMigration' again.
```
::

Then I commented out the table that I want to go missing and rerun the Add-Migration. Usually, when you need to rescaffold a migration, you use the -Force option, in this case I did not. I simply re-ran the same Add-Migration command. This time EF shows the following message in the console:

::code-block
```
Only the Designer Code for migration 'TestMigration' was re-scaffolded. To re-scaffold the entire migration, use the -Force parameter.
```
::

Nothing changed on the generated file, but notice that the Designer Code which has the model snapshot has been changed. That means the table that I commented has been removed from the snapshot, but no DropTable code. And when I run Update-Database, EF inserted the model snapshot along with the latest migration file name into the database.

Since no table was dropped, when I uncommented the table and ran the application, EF throws the pending changes error. Eventually to summarize the steps:

1. Run Add-Migration
2. Comment a table
3. Run the same Add-Migration (without -Force option)
4. Update-Database
5. Uncomment the table
6. To fix it, I simply reverted the migrations and re-did them properly. 

Also, not sure if the following code plays a part in the issue, but we have them in our code:

::code-block
```
Database.SetInitializer<DbContext>(null);
```
::

