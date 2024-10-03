const wikitools = require('../index.js');

(async() => {
    const getStep = await wikitools("how to ride a car?")
    console.log(JSON.stringify(getStep, null, 2));
})()