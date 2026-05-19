---
date: 2026-05-19
---

::post-title{:date="date"}
# Access JavaScript Object Properties with String and Reduce
::

<br/>

In this case, I parsed a json file and need to query the object using a string and JavaScript can get one level down using Bracket notation.

::code-block
```
const theObject = {
  topLevel: 0
};

const topLevelValue = theObject["topLevel"];

console.log(topLevelValue); // will be 0
```

<br/>

However, bracket notation can't handle multiple levels:

::code-block
```
const theObject = {
  topLevel: {
    firstLevel: 1
  }
};

const firstLevelValue = theObject["topLevel.firstLevel"]; // Doesn't work
```
::

<br/>

So, consult with Claude Sonnet and managed to use reduce to get it to work. I tried not to use JMESPath or JsonPath or other query libraries.

::code-block
```
const theObject = {
  topLevel: {
    firstLevel: 1
  }
};

function getValue(queryString) {
  const keys = queryString.split('.');
  const lastKey = keys.pop();
  const lastObj = keys.reduce((acc, part, index) => {
    const nextKey = keys[index + 1] !== undefined ? keys[index + 1] : lastKey;
    if (acc[part] === undefined || acc[part] === null) {
      acc[part] = {};
    }
    return acc[part];
  }, theObject);

  return lastObj[lastKey];
}

const firstLevelValue = getValue("topLevel.firstLevel");

console.log(firstLevelValue); // will be 1
```
::

<br/>

It works by turning "topLevel.firstLevel" into `theObject[topLevel][firstLevel]`{.bg-gray-200 .p-2 .rounded} iteratively and it works for multiple level.

<br/>

Next, I need to handle array, so I can use "topLevel.firstLevel.1.secondLevel" to get the second element of firstLevel array and return the value of secondLevel property.

<br/>

It requires a small tweaked to the code above:

::code-block
```
const theObject = {
  topLevel: {
    firstLevel: [
      {
        secondLevel: "firstElement"
      },
      {
        secondLevel: "secondElement"
      }
    ]
  }
};

function getValue(queryString) {
  const keys = queryString.split('.');
  const lastKey = keys.pop();
  const lastObj = keys.reduce((acc, part, index) => {
    const nextKey = keys[index + 1] !== undefined ? keys[index + 1] : lastKey;
    if (acc[part] === undefined || acc[part] === null) {
      acc[part] = isNaN(parseInt(nextKey)) ? {} : [];
    }
    return acc[part];
  }, theObject);

  return lastObj[lastKey];
}

const secondLevelValue = getValue("topLevel.firstLevel.1.secondLevel");

console.log(secondLevelValue); // will be "secondElement"
```
::

<br/>

Without the code change, it turns "topLevel.firstLevel.1.secondLevel" into `theObject[topLevel][firstLevel]["0"][secondLevel]`{.bg-gray-200 .p-2 .rounded}

<br/>

With the change, basically, if it encounters a number, treat it as an array, so it turns "topLevel.firstLevel.1.secondLevel" into `theObject[topLevel][firstLevel][0][secondLevel]`{.bg-gray-200 .p-2 .rounded}
