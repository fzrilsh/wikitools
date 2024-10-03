# WikiTools

WikiHow tools for get contents on it

## Table of Contents

- [WikiTools](#wikitools)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [For Node.js](#for-nodejs)

## Usage

#### For Node.js

Install using:

```shell
npm install wikitools --save
```

In your code:

```javascript
var wikitools = require("wikitools");
wikitools("how to turn on tv").then(console.log)

// ->
{
  "status": true,
  "url": "https://www.wikihow.com/Deal-With-a-Long-Vacation-Car-Ride-(Teens)",
  "thumbnail": "https://www.wikihow.com/images/thumb/4/43/Deal-With-a-Long-Vacation-Car-Ride-%28Teens%29-Step-20.jpg/aid413055-v4-1200px-Deal-With-a-Long-Vacation-Car-Ride-%28Teens%29-Step-20.jpg",
  "headline": "4 Ways to Deal With a Long Vacation Car Ride (Teens) - wikiHow",
  "description": "A family vacation can often be the highlight of the summer, but getting there is a different story and there is usually a long car ride ahead of you. Fortunately, there are a few simple things you can do to keep yourself occupied during a...",
  "author": "Allison Broennimann, PhD",
  "timestamps": {
    "published": "2008-07-24",
    "updated": "2024-07-04"
  },
  "steps": [
    {
      "name": "Using Technology to Keep Yourself Busy",
      "lists": [
        "Listen to music. Sync your favorite tunes ...",
        "Watch a movie or TV show. Thanks to modern technology, it's now possible ...",
        ...
      ]
    },
    {
      "name": "Enjoying Your Trip",
      "lists": [
        "Draw up a dream itinerary. Put together a ...",
        "Take pictures. Start documenting ...",
        ...
      ]
    }
  ]
}
```