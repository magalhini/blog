---
title: Feeding different server responses into a Node.js render with Promises
date: 2017-02-05 12:31:19
description: You can send the result of multiple calls to an Express view using Promise.all
published: true
categories:
  - Development
---

_Despite the fact that I've been working with Node.js and express for quite a while now, I have never come across the need to feed an **Express View the result of two server responses** before. While this is an easy problem to solve, I wanted to find an elegant (and technically relevant) solution to it. And like so, `Promises` to the rescue!_

Code: [Direct link to the full Gist](https://gist.github.com/magalhini/e23dd1dc69ee843c0eef590d31534441)

### The problem

Let's say your `home.hbs` view expects a `user` and its `books` information, but they're coming from two different server calls. You can send only one `res.send()` to the view, of course... so how do you chain the two calls and feed them into the view?

Two calls are needed: `/api/books` will return a `books` object and `/api/user` will return the `user` object. Basically we want to make this work:

```js
app.get('/', (req, res) => { // somehow make the calls and only then...
res.send({ user // from call #1 books // from call #2 })) .catch(err => res.send('Ops, something has gone wrong')) })
```

One simple and elegant way to make this work is using `Promise.all`.

### Create a helper get() using node-fetch

To help us make both our calls, let's create a simple wrapper around fetch, like so:

```js
function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}
```

This simply wraps the server call in a Promise. We can use it like:

```js
get('http://localhost/api/whatever').then(...)
```

### Promise.all

`Promise.all` receives an array of Promises and resolves only when all of them have been successfully resolved (or at least one has failed). You can then consume all the individual responses since they're all in order.

So let's try this in our main route:

```js
app.get('/', (req, res) => {
  Promise.all([
    get(`http://localhost:3000/api/user`),
    get(`http://localhost:3000/api/books`),
  ])
    .then(([user, { books }]) => res.send({ user: user.name, books }))
    .catch(err => res.send('Ops, something has gone wrong'))
})
```

Now, `res.send` will only feed the responses to the View **once both Promise calls have been fulfilled**. Notice the object destructuring around the `{books}` object, this is simply an example of what you can do if you need to extract a certain key out of your response.

### A complete example

Here's my full example, [also available as a Gist](https://gist.github.com/magalhini/e23dd1dc69ee843c0eef590d31534441):

```js
const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 3000

app.get('/api/user', (req, res) => {
  res.json({ name: 'Richard' })
})

app.get('/api/books', (req, res) => {
  res.json({ books: 545 })
})

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

app.get('/', (req, res) => {
  Promise.all([
    get(`http://localhost:${PORT}/api/user`),
    get(`http://localhost:${PORT}/api/books`),
  ])
    .then(([user, { books }]) => res.send({ user: user.name, books }))
    .catch(err => res.send('Ops, something has gone wrong'))
})

app.use(express.static(\_\_\_dirname + '/'))
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
```

You can also read more about `Promise.all` at [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

---

Anything I might have overlooked or gotten wrong? Don't be afraid to ping me on [Twitter](http://twitter.com/magalhini).

```

```
