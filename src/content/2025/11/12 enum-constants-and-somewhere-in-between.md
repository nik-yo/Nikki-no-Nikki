---
date: 2025-11-12
---

::post-title{:date="date"}
# Enum, Constants, and Somewhere in Between
::

<br/>

I was showing a younger developer in my team on some techniques to implement strongly typed constants without using enum. For example, we have a method/function:

::code-block
```
public async void DoSomething(string activity)
```
::

<br/>

And we want to limit the value of activity parameter to let say **Run** and **Bike**. One way is to use enum:

::code-block
```
public enum Activity
{
    Run,
    Bike
}

public async void DoSomething(Activity activity)

public async void DoToday()
{
    DoSomething(Activity.Run);
}
```
::

Sometimes, we want to get the string value and enum can be tricky, so there's a tendency to loosen the parameter type, let say using static property or string constants.

::code-block
```
public class Activity
{
    public static string Run { get; set; } = "Run";
    public static string Bike { get; set; } = "Bike";
}

public async void DoSomething(string activity)
{
  Debug.WriteLine($"Activity: {activity}")
}

public async void DoToday()
{
    DoSomething(Activity.Run);
}
```
::

Which means the following is now valid but not intended:

::code-block
```
DoSomething("Sleep");
```
::

So, how do we find a sweet spot between enum and string? One option is to use class but lock down the constructor so it can't be initialized with unintended value. This way, it is still flexible enough to extract the string value.

::code-block
```
public class Activity
{
    private readonly string _value;
    private Activity(string value) { _value = value; }
    public static Activity Run { get; set; } = new Activity("Run");
    public static Activity Bike { get; set; } = new Activity("Bike");
    public string Value { get { return _value; } }
}

public async void DoSomething(Activity activity)
{
    Debug.WriteLine($"Activity: {activity.Value}");
}

public async void DoToday()
{
    DoSomething(Activity.Run);
}
```
::

The compiler will flag the following as invalid, thus we can control what are valid values for the activity parameter.

::code-block
```
DoSomething(new Activity("Sleep"));
```
::