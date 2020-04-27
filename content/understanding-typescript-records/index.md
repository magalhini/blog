---
title: 'Understanding TypeScript Records'
description: 'A quick explanation on how and when to use the `Record` type in TypeScript. Records are useful, and they also spin you round round.'
date: '2020-04-25T22:08:52.748Z'
categories:
  - Development
  - TypeScript

published: true
---

👋 By the end of this article, you'll be able to understand what `Record<T, K>` means in TS and how to use it. Unless I did a really bad job, in which case you should [angry tweet at me](https://twitter.com/magalhini).

## A definition of `Record`

Typescript 2.1 [introduced the Record type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt), and the official documentation defines it as:

> Constructs a type with a set of properties `K` of type `T`. This utility can be used to map the properties of a type to another type.

Its definition shows how it works internally, but it can be a little scary to newcomers to the language:

```ts
type Record<K extends string, T> = {
  [P in K]: T
}
```

But let's start with a practical example. Consider the following JS object:

```js
const object = {
  prop1: 'value',
  prop2: 'value2',
  prop3: 'value3',
}
```

If we know the types that both keys and values of that object will receive, typing it with a `Record` can be extremelly useful. A `Record<K, T>` is an object type whose property keys are `K` and whose property values are `T`.

<!-- That is, `keyof Record<K, T>` is equivalent to `K`, and `Record<K, T>[K]` is (basically) equivalent to T. -->

One post on StackOverflow that initially helped me understand what `Record` did [was this post](https://stackoverflow.com/questions/51936369/what-is-the-record-type-in-typescript), in which it's clear to see that the following type definition:

```ts
type PropResponse = Record<'prop1' | 'prop2' | 'prop3', string>
```

Is pretty much the same as writing this, which you're probably already familiar with as a normal `type` definition:

```ts
type PropResponse = {
  prop1: string
  prop2: string
  prop3: string
}
```

Let's go back to our object we want to type. We know that it has 3 keys, `prop1`, `prop2` and `prop3`, and that each of them has the value of a string. We can use the previous `PropResponse` to type it, like so:

```ts
type PropResponse = Record<'prop1' | 'prop2' | 'prop3', string>

const object: PropResponse = {
  prop1: 'value',
  prop2: 'value2',
  prop3: 'value3',
}
```

Notice that if we change any of the values to a `boolean`, TypeScript will not compile:

```ts
const object: PropResponse = {
  prop1: 'value',
  prop2: 'value2',
  prop3: true, // Type 'true' is not assignable to type 'string'
}
```

Of course, very often an object is a mixed bag of types, where you'll get strings, numbers, booleans and so on. `Record` still works in these cases, because it accepts a `type` as one of its values. Let's look at a more complex example.

## The classic Store example

Let's switch to the classic _Store_ example, with real life data. We'd like to type the in-store availability of products, grouped by ID. Each ID has an object as a value, with `availability` typed as a string and the `amount` available for each product.

```js
const store = {
  '0d3d8fhd': { availability: 'in_stock', amount: 23 },
  '0ea43bed': { availability: 'sold_out', amount: 0 },
  '6ea7fa3c': { availability: 'sold_out', amount: 0 },
}
```

We want to do a few things to type this correctly. We must:

- Type the key as the product ID, as a string
- Type the value with a range of `availability` types
- Type the `amount` as a number

```ts
// Our product ID will be a string
type ProductID = string

// Defining our available types: anything out of this range will not compile
type AvailabilityTypes = 'sold_out' | 'in_stock' | 'pre_order'
```

We can also define the `Availability` as a type itself, containing a value which will be **one of the** `AvailabilityTypes` and contain the `amount` as a number:

```ts
interface Availability {
  availability: AvailabilityTypes
  amount: number
}
```

💡 _Aside_: note that we could have also inlined our stock strings instead of creating a new type entirely. The following would have also worked:

```ts
interface Availability {
  availability: 'sold_out' | 'in_stock' | 'pre_order'
  amount: number
}
```

💡

And we put it all together in a `Record` type, where the first argument is for our key (`ProductID`) and the second is for its value (`Availability`). That leaves us with `Record<ProductID, Availability>` and we use it like so:

```ts
const store: Record<ProductID, Availability> = {
  '0d3d8fhd': { availability: 'in_stock', amount: 23 },
  '0ea43bed': { availability: 'sold_out', amount: 0 },
  '6ea7fa3c': { availability: 'sold_out', amount: 0 },
}
```

Here's the full typing for this example:

```ts
// types.ts

type ProductID = string
type AvailabilityTypes = 'sold_out' | 'in_stock' | 'pre_order'

interface Availability {
  availability: AvailabilityTypes
  amount: number
}

// store.ts

const store: Record<ProductID, Availability> = {
  '0d3d8fhd': { availability: 'in_stock', amount: 23 },
  '0ea43bed': { availability: 'sold_out', amount: 0 },
  '6ea7fa3c': { availability: 'sold_out', amount: 0 },
}
```

(you can play with [the playground here](https://www.typescriptlang.org/play/#code/C4TwDgpgBACgTgezAJQgZzAgdm6BeKAbwCgooxEwBGALijWDgEssBzAGlPMoCY6HmbTmQpIAzP0YsOxAL7FiAY2wMoCAEYArCIuB14SVBhX4iXUdToByAG4BDADYBXCFeHckfKLccueb80oJKEYXTnliAHpIqABlOyxoOzQ6UEgoABUACzgICFipNgMwNCgCVGU4ABMAHisLKisoAB9vC38WtqC3ekLWAD4FKJiAUQAPOwBbMAdoYAB3BBoFNOgDKqddAEkAETLewVYAbhXwaABBeyYHO3VrplAMs9KCKzQEByqAfQQnYCbWlYWF8GAhFABrAFdCA-aoQOBWBQsYDwgBmdkUFyuNzuDgeIDMZDIdmxt3uoDolzs1zJeMezxORKgU1+WD0UCwTkm6nhJwiyhwwCgYzoFQQ1Rq602wF27CgVJpuPx-X2JCZVgADFUxFUAByorJVKx0QjM0lKineYGgiE9FlONl0HhiKCydxkTUQOwAFjEPKNJrN1Jx5JA1nenx+fztk1Z7I1rvd3gAbF6AOzosSKY1EIOK0Phj7fX7-OX2x1QBNuuQnIA))

There are other ways to go about and type this object of course, but `Record` itself proves to be a useful abstraction that will check keys and value types for us.

Check out the [official documentation for more examples](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt) and I'll soon be back for more starter guides on TS! 🎉
