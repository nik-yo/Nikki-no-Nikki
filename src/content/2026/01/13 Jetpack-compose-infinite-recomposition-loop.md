---
date: 2026-01-01
---

::post-title{:date="date"}
# Jetpack Compose Infinite Recomposition Loop
::

::notes
This is a repost from my old blog. First posted in 8/14/2024.
::

<br/>

I finally got some time to get back to mobile development after many years. And Android has a new way to create an app with Jetpack Compose. At a glance, it is amazing, I managed to create a complex app much faster than using XAML, yep, you read that right, that's how I used to do it.

<br/>

All is well until I encountered infinite loop when trying to remove item in a mutableList displayed using LazyColumn on a button click. Basically, the button click somehow causing a recomposition and then the recomposition retrigger the button click event again and again.

<br/>

But it only happened when I remove an item, adding an item is fine. Here's the example of initial code:

::code-block
```
data class Pet(var timestamp: Instant, var name: String)
  
@Composable
fun Screen() {
    val pets = remember { mutableStateListOf<Pet>() }
  
    fun addPet() {
        pets.add(Pet(Clock.System.now(), "Pochi"))
        if (pets.count() > 5) {
             pets.removeAt(0)
        }
    }
  
    addPet()
    
    Surface {
        LazyColumn {
            items(items = pets,
                  key = { it.timestamp.toEpochMilliseconds() }) {
                Text(text = it.name)
            }
        }
        Button(onClick = { addPet() }) {
             Text(text = "Add")
        }
    }
}
```
::


I did some searching, even using ChatGPT, but what helps me understand is this article:

[https://developer.android.com/develop/ui/compose/performance/bestpractices#avoid-backwards]{.text-blue-600}

<br/>

Apparently, I accidentally did a backward write. I did a small experiment and the following code doesn't cause recomposition loop:

::code-block
```
data class Pet(var timestamp: Instant, var name: String)
  
@Composable
fun Screen() {
    val pets = remember { mutableStateListOf<Pet>() }
  
    fun addPet() {
        pets.add(Pet(Clock.System.now(), "Pochi"))
    }
  
    addPet()
    
    Surface {
        LazyColumn {
            items(items = pets,
                  key = { it.timestamp.toEpochMilliseconds() }) {
                Text(text = it.name)
            }
        }
        Button(onClick = { 
             addPet() 
             
             // Moved from addPet()
             if (pets.count() > 5) {
                 pets.removeAt(0)
             }
             
             }) {
             Text(text = "Add")
        }
    }
}
```
::

<br/>

Both snippets look very similar especially on what the button click will do. However, on the first snippet, pets.count() causes state read due to addPet() call and thus button onClick will cause a backwards write with pets.add().

<br/>

Now the question is won't moving the pets.count() to within button onClick cause backwards write as well?

<br/>

The answer is, it won't, because the recomposition scope is different. This article will be helpful in understanding more on the recomposition scope. The key is "Deferring state reads will ensure that Compose re-runs the minimum possible code on recomposition"

[https://developer.android.com/develop/ui/compose/performance/bestpractices#defer-reads]{.text-blue-600}

<br/>

By moving the pets.count() to the onClick, we reduce the recomposition scope to only the button and because of that, the recomposition doesn't try to recompose everything including the button and its onClick which can cause recomposition loop because onClick will be triggered infinitely.

