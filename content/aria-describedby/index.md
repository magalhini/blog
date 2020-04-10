---
title: 'Accessibility with aria-describedby and aria-labelledby'
date: '2017-06-02T21:38:16.708Z'
description: 'When, and how, to use aria-describedby and aria-labelledby to significantly improve the a11y of your pages.'
categories: [development]

published: true
canonical_link: https://medium.com/@magalhini/on-purpose-80b2cd22830f
redirect_from:
  - /on-purpose-80b2cd22830f
---

As web developers, we sometimes stay away from doing accessibility right because we're afraid of causing more harm than good. I had that fear myself, when worrying about a11y was, shamefully, something I _could_ dismiss at first. However, at Shopify, a11y is a non-negotiable, and I'm learning that there is absolutely no excuse to at least not do the very basics right.

One of the most common questions I see people having is about some ARIA attributes, namely when to use _aria-labelledby_ and _aria-describedby_. So today, I'd like to share some quicks tips on how you can and should start including these key attributes in your HTML semantics right now.

## aria-labelledby

As the name implies, "labelled by", this attribute receives the IDs of elements which establish a relationship between the elements. Unlike the _label_ elements, which we should always use to name the elements, _labelledby_ gives extended information that helps make sense of what the element is.

To understand this better, remember this: the _aria-labelledby_ attribute is read by a screenreader after it says out loud the field type. An example of when you'd want to use this is labeling choices, which are labeled by a previously appearing title:

```html
<h3 id="lunch_label">Café Options</h3>

<ul aria-labelledby="lunch_label" role="radiogroup">
  <li id="o1">Macchiato</li>
  ...
  <li id="o2">Cappuccino</li>
  ...
  <li id="o3">Latte</li>
  ...
</ul>
```

Notice we're using **labelledby** to refer to the previous **h3** element. **It always expects an ID string**, which can be more than 1.

**Another example, with multiple labels:**

```html
<div id="billing">Billing:</div>

<div>
  <div id="name">Name:</div>
  <input type="text" aria-labelledby="billing name" />
</div>
<div>
  <div id="address">Address:</div>
  <input type="text" aria-labelledby="billing address" />
</div>
```

_(This example was taken out of <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute">MDN web docs for this attribute</a>)._

The main takeaway from this previous example is the fact we're passing in two identifiers: _billing_ and _name_. This tells the screenreader that the inputs are part of a subsection within a section; in this case, the _name_ input is labelled by the text _Name:_ and its section, _Billing._

### For read-only visual representations

Imagine this very common pattern: you have a star rating component for a product in your page. You're displaying 4 images of full stars, and 1 image of an empty star. To sighted users, it's clear this product has a 4 out of 5 rating; but what about those who can't see the stars? How to overcome this issue?

★★★★☆

There are many different ways to approach this problem, and all will depend on how much control you have over your own system. But an easy way to provide a text representation of the rating is to use _aria-labelledby_ to point to an element ID which has a written value for the rating. Consider this:

```html
<div role="img" aria-labelledby="star-rating">
  ★★★★☆
</div>
```

### Using describedby for error messages

One of the most useful things about _aria-describedby_ is that screen readers can use them to indicate when a field is in an error state (invalid password, malformed credit card details, etc). Have you ever stopped and wondered how do non-sighted users know when this happens, and what we can do about it?

An input element, for example, can be told to be described by an error message ID field. **If the describing field has no content, screen readers will ignore it;** but when it's visible in the DOM and with content, screen readers will pick up on this and use it to read the corresponding error message. How great is this? Take the following example:

### For error states

```html
<input type="text" aria-describedby="message-error" />
<span id="message-error" class="visually-hidden">
  Error: this field is invalid
</span>
```

Adding the error message to the _#message-error_ element will make sure the input associates the corresponding error message with this field. There's also, of course, other things to consider such as _aria-invalid_, but we'll leave that for another time.

### For tooltips associated with fields

When there's tooltips involved to help give more information about a certain field, it's very important to link the tooltip with the respective element. A sighted user can easily read the tooltip once the icon is hovered, but this is meaningless for non-sighted users. Here's a common example, about a CVV field for a credit card:

![Hovering over a tooltip](https://cldup.com/LPtQ6hwANu.gif)

Without any ARIA attributes, this is all that VoiceOver reads once the input is in focus: _CVV: Edit Text_ (and this is assuming you have a _label-for_ correctly in place. You do, don't you?). There's no information about a tooltip being there for the user to know where to find a CVV.

![No information](https://cldup.com/rdKWXr5Mce-3000x3000.jpeg)

However, it only takes a simple _aria-describedby="id-of-your-tooltip"_ to make a world of a difference to non-sighted users. Take a look at VoiceOver will read now:

![The input is linked to the text of the tooltip](https://cldup.com/doG3TAvS1E-3000x3000.jpeg)

```html
<div class="form cvv">
  <label for="cvv">CVV</label>
  <input aria-describedby="cvv-label" type="text" name="CVV" id="cvv" />
  <span class="cvv__tip">ℹ️</span>
  <span id="cvv-label" class="cvv__info"
    >These are the 3 digits on the back of your credit card</span
  >
</div>
```

### Things to note

There's a few things to note when using any of these ARIA techniques. When we're using _aria-labelledby_, the associated ID is read **instead** of its own text content, rather than having the element being read in addition to the text content. [This section on W3C](https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html) describes it well:

<span class="blockquote">The specified behaviour of aria-labelledby is that the associated label text is announced instead of the link text (not in addition to the link text). When the link text itself should be included in the label text, the ID of the link should be referenced as well in the string of IDs forming the value of the aria-labelledby attribute.</span>

It should never replace the use of _label_ elements in forms. Consider it for the situations when you need multiple labels.

### More resources

1. [MDN aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
2. [MDN aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)

---

Anything I might have overlooked or gotten wrong? Don't be afraid to ping me on [Twitter](http://twitter.com/magalhini).
