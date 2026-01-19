Your code is currently missing parameters. As it is written, it will throw a `ReferenceError` unless `a` and `b` are
defined globally.

To make this a functional, reusable function, you should pass `a` and `b` as **arguments**.

### 1. Standard Function
This is the most common way to write it:

```javascript
function sum(a, b) {
return a + b;
}

// How to use it:
console.log(sum(5, 10)); // Output: 15
```

### 2. ES6 Arrow Function (Modern & Concise)
If you want a shorter version, you can use an arrow function:

```javascript
const sum = (a, b) => a + b;

console.log(sum(5, 10)); // Output: 15
```

### What was wrong with the original?
In your original code:
```javascript
function sum(){
return a + b;
}
```
* The function expects `a` and `b` to exist somewhere else in your code (the global scope).
* If you call `sum()`, and `a` hasn't been defined yet, the program will crash.
* By adding `(a, b)` inside the parentheses, you tell the function to wait for those two specific values to be handed to
it when it is called.  