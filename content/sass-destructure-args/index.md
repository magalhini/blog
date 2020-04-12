---
title: Using named arguments in Sass Mixins
date: 2017-02-16 12:31:19
description: Sass mixins support named arguments to be passed in, instead of leaving it up for guesses. Let's use them more, shall we?
categories:
  - Development
  - Sass

published: true
---

Something bugs me a lot when working with Sass `mixins`: passing an endless amount of arguments. Think about JavaScript methods without an object-structure passed in as arguments; it's impossible to memorize their and you have to come back to the source every single time.

However, Sass can deal with this out of the box with **named arguments**, and I thought it would be worth remembering everone to use them more often: easier to read, easier to use.

### An example of the issue

```scss
@include myMixin(true, 'left' 20, 2em);
```

What does true stand for? What's the 20? And the `2em`? I won't know until I look up the mixin in the codebase.

### Let's create a mixin

So let's say we want a mixin to apply CSS's animation properties. We want to be able to pass in only the properties we want to customise, and this also means using **default values** in the mixin.

We'll pass in the animation name, delay and duration in seconds, timing-function, and so on.

Here's something:

```scss
@mixin animateKeyframe(
  $name,
  $duration: 1s,
  $delay: 0s,
  $timing: linear,
  $count: 1,
  $direction: normal
) {
  animation-name: $name;
  animation-delay: $delay;
  animation-duration: $duration;
  animation-timing-function: $timing;
  animation-iteration-count: $count;
  animation-direction: $direction;
}
```

Pretty straight-forward: our mixin accepts a bunch of properties, the first being the `@keyframes` animation name, followed by duration, delay, timing-function, count, and direction.

So how do we use it? Well, typically you'd use it like so:

```scss
@include animateKeyframe(spin360, 2s, 1s);
```

### What's wrong with this?

Well, it works. But look at this implementation. The first argument is obvious, it's clearly the animation name. What about the second and third? Which one is the duration, which one is the delay? It's unclear and it leaves us with two options: either trial and error, or look up the mixin source.

### Enter Sass's named arguments

What you might not know is that Sass accepts **named arguments** out of the box, as if you're passing a configuration object! So instead of leaving it up for guesses, you can (and should) use it like so:

```scss
@include animateKeyframe(
  $name: spin360,
  $duration: 2s,
  $delay: 1s,
  $count: infinite
);
```

Now everything is pretty straight-forward. Just by looking at the implementation we can tell which property is which. Yes, if we need to customise the other ones we still look to look into the mixin's signature to see what are the variable's names, but at least the code is readable at first.

Here's the full source for a very spinny demo.

<p data-height="268" data-theme-id="0" data-slug-hash="MKRYQO" data-default-tab="result" data-user="magalhini" class='codepen'>See the Pen <a href='http://codepen.io/magalhini/pen/MKRYQO/'>Sass named arguments example</a> by Ricardo Magalhães (<a href='http://codepen.io/magalhini'>@magalhini</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

```scss
body {
  padding: 2em;
}

@-webkit-keyframes spin360 {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}

@mixin animateKeyframe(
  $name,
  $duration: 1s,
  $delay: 0s,
  $timing: linear,
  $count: 1,
  $direction: normal
) {
  animation-name: $name;
  animation-delay: $delay;
  animation-duration: $duration;
  animation-timing-function: $timing;
  animation-iteration-count: $count;
  animation-direction: $direction;
}

.box {
  @include animateKeyframe($name: spin360, $duration: 2s, \$count: infinite);

  // Instead of: // @include animateKeyframe(spin360, 2s, 1s);

  width: 120px;
  height: 120px;
  background-color: cyan;
  position: absolute;
  opacity: 0.75;
  will-change: transform;

  &:nth-child(2) {
    animation-duration: 0.3s;
    background-color: rebeccapurple;
  }
}
```

Keep Sassy. If you spot any typos or have any suggestions, don't be afraid to ping me on [Twitter](http://twitter.com/magalhini).
