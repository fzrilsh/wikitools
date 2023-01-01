const wikitools = require('wikitools')

(async() => {
    const getStep = await wikitools("how to ride a car?")
    console.log(getStep.url)
    console.log(getStep.steps)
})