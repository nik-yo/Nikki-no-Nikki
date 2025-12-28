---
date: 2025-12-28
---

::post-title{:date="date"}
# React Navigation Handle Header Button Click on Child Screen or Component
::

::notes
This is a repost from my old blog. First posted in 11/11/2020.
::

<br/>

I have a react native application which I need to handle header button / action button click on the detail screen. And the journey to solve it was not a short one.

<br/>

On the parent screen, I have defined a stack navigation and set the header button. Then I need to handle the header button click on the child screen. I read about passing the function as parameter but it's not easy. There are also options to useEffect or ref, but none of them are working for me.

<br/>

In the end, the one that works for me and pretty clean too is by using `React.useLayoutEffect`{.bg-gray-200 .p-2 .rounded} and `navigation.setOptions`{.bg-gray-200 .p-2 .rounded}:

::code-block
```
const ChildScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => ...} title="Right" />
      ),
    });
  }, [navigation]);
  
  return (...)
};
```
::

<br/>

Reference:

[https://reactnavigation.org/docs/header-buttons/#header-interaction-with-its-screen-component]{.text-blue-600}
