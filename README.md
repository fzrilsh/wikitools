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
  url: 'https://www.wikihow.com/Turn-On-Your-TV',
  steps: [
    '(Method 1 of 3:) With Remote\n' +
      '1. To turn on your TV with the remote, grab the remote and press the power button.Read How to Use a Basic Television Remote to know how to use the TV remote.\n' +
      '- If you have additional speakers, games consoles or DVD players, etc., be aware that you may have to turn them on separately too.',
    '(Method 2 of 3:) With Remote and Cable Box\n' +
      "1. Make sure the cable box is on first.Look at the cable box. Is it showing a number or is the screen blank? If it's showing a number, it's probably already on.\n" +
      '- Get the remote control for the cable box. Sometimes it is different than the one for the TV.\n' +
      '- On this Comcast remote, you would press the "All On" button. If this remote controls both your TV and your cable box, it will turn both of them on at the same time. If it only controls your cable box, proceed to the next step.\n' +
      `2. Press the power button on the TV remote.If the TV doesn't turn on, something might be wrong with the remote. Check the batteries or, if it's a universal remote, press the "TV" button and try the power button again.\n` +
      `- If the TV turns on but you're not seeing a channel (just a blue screen, or the phrase "no signal"):\n` +
      '- Check that the cable box is indeed on.\n' +
      '- Check that the TV is on the correct channel to receive a signal from the cable box. In many cases, this is channel "zero".',
    '(Method 3 of 3:) Without Remote\n' +
      '1. To turn on your TV without the remote, just walk over to the TV and hit the power button.Read through any manuals that came with your television if you still have them.\n' +
      '- Check if your TV has a visible touch power button. It is usually at the middle point of the lower panel of your TV.\n' +
      '- Check the the left and right sides and the top of your TV, some TVs have power buttons there. It may be distinguishable by size, color, label, or a power symbol such as the one displayed here.\n'
  ]
}
```