---
title: "Type narrowing and closures"
short: "Typescript offers a mechanism called type narrowing, which allows us to validate object's type with type guards and avoid explicit casts or error silencing. This post will give a brief demo of this feature and show it's interesting consequences."
tags: "typescript"
published: 2020-05-25
background: "#181f2b"

---

# Type narrowing

If you've worked with Typescript before, chances are you've already came across type narrowing. Let's consider a function that checks if a user has permissions for actions passed as an array of strings.

```typescript
function canUser(user: User, permissions: string[]): boolean {
    return permissions.every(permission =>
        user.permissions.includes(permission));
}

if (canUser(mike, ['todo.create', 'todo.update'])) {
    // ...
}

if (canUser(tom, ['piano.play'])) {
    // ...
}
```

Pretty simple. Let's improve the API a bit. Passing a single string instead of an array with one element will save developers some typing.

```typescript
function userCan(
    user: User,
    permissions: string | string[]): boolean {

    if (typeof permission === 'string') {
        // typescript knows that in this
        // scope permission is a string
        return user.permissions.includes(permission);
    } else {
        // in this scope permission can not be
        // a string, so it's an array
        return permissions.every(permission =>
            user.permissions.includes(permission));
    }
}

if (userCan(ben, 'car.drive')) {
    // ...
}
```

Type narrowing is occurring inside the if condition. In the first branch, the type `string | string[]` is narrowed to `string`. In else branch, Typescript assumes that the code will execute only if `permissions` is an array of strings.

Does `typeof` have special powers? No. `typeof` operator is a **type guard**. Its boolean result determines if a broader type (in this case union of two types) can be narrowed down. A function that you probably know by now - `Array.isArray` - is a type guard. We can define our own type guards too. Here is how they look like.

```typescript
type CartesianPoint = {
    x: number;
    y: number;
}

function isCartesianPoint(obj: any): obj is CartesianPoint {
    return !!obj &&
        typeof obj === 'object' &&
        typeof obj.x === 'number' &&
        typeof obj.y === 'number';
}

function drawCartesianPoint(point: CartesianPoint) {
    // draw on the screen
}

function draw(obj: object) {

    // this will give a compile time error,
    // because obj might not be a point
    drawCartesianPoint(obj);

    if (isCartesianPoint(obj)) {
        // this compiles, because type guard
        // guarantees that the object is a point
        drawCartesianPoint(obj);
    }
}
```

If you want to read more about type guards, check out [Typescript's handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#instanceof-type-guards).

# Simple feature, huh?

I recently run into a scenario that exposes a weird quirk of type narrowing. Take a look.

```typescript
function access(index: number, data: any[] | Map<number, any>) {
  let indirection = data; // notice let

  if (Array.isArray(indirection)) {
    const x = indirection[index];
    const y = () => indirection[index]; // error
    const z = (() => indirection[index])();
  }
}
```
The error message says:

> No index signature with a parameter of type 'number' was found on type 'any[] | Map<number, any>'.

Wait, what? I though Typescript would narrow down `indirection` to array type. And it did it when initializing `x`. What's wrong with `y`?

Type narrowing does not work when a `let` variable is captured by a function. Changing `let` to `const` fixes the error above. Seems weird at first glance, but it actually makes sense! Imagine that **after** creating function `y` we set variable `indirection` to a map and **then** call `y`.

```typescript
function access(index: number, data: any[] | Map<number, any>) {
  let indirection = data; // notice let

  if (Array.isArray(indirection)) {
    const y = () => indirection[index];
    indirection = new Map<number, any>();
    y(); // ?
  }
}
```

The call to `y` yields `undefined` because one line above `indirection` reference was set to a map, which does not have numerical properties. If `indirection` was declared with `const`, reassignment would not be allowed and thus the array guarantee would be always valid.

It's fascinating how Typescript tracks type changes. The difference in behavior between `let` and `cost` captured variables reminds me of Rust's borrow checker. `y` borrows `indirection`, which should not be changed until `y` is destroyed. Otherwise, the array invariant is broken. Interestingly, an IIFE assigned to `z` in the previous example does not trigger that error. Maybe Typescript noticed that the borrow immediately disappears and type may stay unchanged?
