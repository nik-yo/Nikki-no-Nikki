---
date: 2025-11-09
---

::post-title{:date="date"}
# Android Room Database Subsequent Insert Failed Due to Broken AutoIncrement
::

::notes
This is a repost from my old blog. First posted in 12/22/2019.
::

<br/>

Room DB has managed to abstract away complicated SQL statements which is pretty nice. But as with other new things, it takes a while to get used to.

<br/>

It all starts with an entity such as the following:

::code-block
```
@Entity
data class Item(
    @PrimaryKey(autoGenerate = true) val id: Int = Int.MIN_VALUE,
    @ColumnInfo val name: String?
}
```
::

and my Dao has the following function:

::code-block
```
@Insert(onConflict = OnConflictStrategy.IGNORE)
suspend fun insert(item: Item)
```
::

<br/>

The first insert went well, but I noticed my subsequent insert failed. 

<br/>

For somewhat reason, it tried to assign the same value as Id. After few trial and error, I managed to fix it by changing the Int.MIN_VALUE to 0. So the entity class becomes:

::code-block
```
@Entity
data class Item(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    @ColumnInfo val name: String?
}
```
::
