1) What is the difference between var, let, and const?
Ans: 
2) What is the difference between map(), forEach(), and filter()?
3) What are arrow functions in ES6?
4) How does destructuring assignment work in ES6?
5) Explain template literals in ES6. How are they different from string concatenation?


1. What is the difference between `var`, `let`, and `const`?

- **`var`**
    var a = 30;
    var a = 20; 


- **`let`**
  - Block-scoped (only available within `{ }`).
  - Can be updated but **cannot be redeclared** in the same scope.
  - Hoisted but not initialized (Temporal Dead Zone).
  - Example:

    let b = 10;
    b = 40; 
    let b = 30; 
**`const`**
  - Block-scoped.
  - Cannot be updated or redeclared** (value fixed after initialization).
  - Must be initialized at the time of declaration.
  - Example:
    const p = 100;
    p = 200;  


2. What is the difference between `map()`, `forEach()`, and `filter()`?

**`forEach()`**
  - Iterates over array elements.
  - Executes a function for each element.
  - **Does not return a new array**, only performs actions.
  - Example:
    [20, 25, 30].forEach(num => console.log(num * 2));
    

**`map()`**
  - Iterates over array elements.
  - Returns a **new array** with transformed values.
  - Example:
    const doubled = [2, 25, 30].map(num => num * 2);
    console.log(doubled); 

**`filter()`**
  - Iterates over array elements.
  - Returns a **new array** with elements that pass a given condition.
  - Example:

    const even = [20, 25, 30, 44].filter(num => num % 2 === 0);
    console.log(even); 


3. What are arrow functions in ES6?

- Shorter syntax for writing functions.
- Do **not** have their own `this`, they use `this` from the surrounding scope.
- More concise than traditional functions.
- Examples:

  // Normal function
  function add(a, b) {
    return a + b;
  }

  // Arrow function
  const addArrow = (a, b) => a + b;

---

4. How does destructuring assignment work in ES6?

- Allows extracting values from arrays or objects into separate variables easily.
- Example with **array**:
  const arr = [10, 20, 30];
  const [x, y] = arr;
  console.log(x, y); 
- Example with **object**:
  ```js
  const person = { name: "Rahim", age: 25 };
  const { name, age } = person;
  console.log(name, age);


5. Explain template literals in ES6. How are they different from string concatenation?
- Template literals use backticks (`` ` ``) instead of quotes.
- They allow:
  - **String interpolation** with `${expression}`
  - **Multi-line strings**
- Example:
  const studentName = "Rahim";
  const age = 25;

  // Old way (concatenation)
  console.log("My name is " + studentName + " and I am " + age + " years old.");

  // ES6 template literals
  console.log(`My name is ${studentName} and I am ${age} years old.`);
  
**Difference:**  
  - Concatenation (`+`) is harder to read.  
  - Template literals are cleaner, easier, and support multi-line strings directly.

