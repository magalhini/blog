---
title: 'TypeScript Generics: A gentle introduction'
description: "Understanding generics isn't the easiest concept to grasp in TS. Let's break it down gently, and start from scratch to see how and when they can be useful. This is part one of a series in TS."
date: '2020-04-14T17:08:52.748Z'

published: true
---

If you’re fairly new to TypeScript, or if your usage of it never goes beyond the basics of `interfaces` or `enums`, then it’s likely that every time you have to deal with TS Generics, you cringe a little bit on the inside.

As someone who took quite a long while to truly understand them, I’m with you, so let's try to explain them in the simplest of ways.

You’ve probably seen something in the means of the following:

```ts
type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M>
}
```

Why would one type `<D, M>` instead of what’s actually expected, like an Array or a String? The key concept here is reusability. You won’t always need to use Generics for data typing; it’s in fact likely that your project doesn’t call for them right now. But first, let’s understand how they can be needed.

## Generics: An Introduction

Using Generics is, at is core, enabling another deeper layer of abstraction to your code: your interfaces, methods, and classes. These are particularly useful for building reusable components that can potentially work with a multitude of types.

In other ways, they allow for components to be typed correctly without resorting to the `any` type, guaranteeing that the provided arguments still comply with the typed definitions.

## The A-Ha Moment

TypeScript’s documentation on Generics starts with an `identity` function, and we’ll be picking up that example. But instead, I’ll reframe it as: _“how would you write (and type) a function that returns the same argument that’s passed into it?”_

“Easy”, I said.

```ts
function foobar(myArg: any): any {
  return myArg
}
```

Ok, that was too easy: we just throw a literally generic type `any` to it and we’re done. But we’re actually losing valuable information on the returned type once we consumed it from the function. How can we avoid `any`?

## Enter Generics

Let’s look at that implementation first:

```ts
function foobar<T>(myArg: T): T {
  return myArg
}
```

What’s going on above, like `<T>`?

First, it’s important to note that `<T>` could literally be `<A>` or `<B>`. We’re creating a new identity for that argument, and declaring it also as the return type of that function. Compilers are smart about this, so if that argument is a `string`, once you call `foobar('abc')` you will see that return value being treated as a string. Same goes for any other value type.

## What if my generic is an Array of “whatever”?

The same principle applies. `<T>` is just another _ghost_ type, meaning that you can declare arrays of it. So:

```ts
function foobar<T>(myArg: T[]): T[] {
  return myArg
}
```

This says: _if your argument in an array of strings, the returned type will also be an array of strings_. Because we’re also returning the exact same argument, we also type the function’s return type as `T[]`

## What about generics in Interfaces?

Let’s say we needed to type the value from calling this `foobar` function. The above is basically the same as doing this, below (which is unnecessary, as it’s repeating the same thing):

```ts
function foobar<T>(myArg: T[]): T[] {
  return myArg
}

const returnedValue: {
  <T>(myArg: T[]): T[]
} = foobar
```

This works okay, but it’s sort of... ugly and verbose. What if we moved the common type definition to an interface instead?

```ts
// let's extract that type to a separate interface...
interface MyUselessInterface {
  <T>(myArg: T[]): T[]
}

// nothing changed here...
function foobar<T>(myArg: T[]): T[] {
  return myArg
}

// but much cleaner here:
let returnedValue: MyUselessInterface = foobar
```

### What about <T, K>?

This syntax just means more than one typed generic parameter. You can separate them by commas, as demonstrated in this Class implementation:

```ts
class Shelf<T, K> {
  private items: K[]
  private otherItems: T[]

  constructor() {
    this.items = []
    this.otherItems = []
  }

  insert(item: K): K {
    this.items.push(item)
    return item
  }

  insertOther(item: T): void {
    this.otherItems.push(item)
  }
}

// Here's the kicker: we can instantiate two different instances of the shelves.
// Both have wildly different types for the two private collections

const shelf = new Shelf<string, number>()
const shelf2 = new Shelf<object, string>()
```

Our `Shelf` class is instantiated twice, but with different types for each one of its stored values. If you were to package and release this Class into the wild, this could be a way of guaranteeing your users would not be limited to `string`, `number` or any other, while still ensuring type safety.

Check out the [official documentation for more examples](https://www.typescriptlang.org/docs/handbook/generics.html)
