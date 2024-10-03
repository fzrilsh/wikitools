const scrape = require('scrape-it')
const { JSDOM } = require('jsdom')
const strSim = require('string-similarity')

async function scrapeRC(url){
    const content = (await scrape(url)).body
    const { document } = (new JSDOM(content)).window

    const rawGraph = document.querySelectorAll('script[type="application/ld+json"]')[1].textContent
    try {
        const graphData = JSON.parse(rawGraph.toString())
        const steps = graphData.step.map(step => ({
            name: step.name,
            lists: step.itemListElement.map(item => item.text)
        }))


        return {
            status: true,
            url,
            thumbnail: graphData.image.url.replace(/\\/g, ''),
            headline: graphData.headline,
            description: graphData.description,
            author: graphData.author.name,
            timestamps: {
                published: graphData.datePublished,
                updated: graphData.dateModified
            },
            steps
        }
    } catch (error) {
        return false
    }
}

module.exports = async(q = 'how to turn on tv') => {
    try {
        const content = (await scrape("https://www.wikihow.com/wikiHowTo?search="+q)).body
        const { document } = (new JSDOM(content)).window
        
        let list = document.querySelectorAll('a[class="result_link"]')
        let data = Array.from(list).map(v => {
            return {
                link: v.href,
                title: v.querySelector('.result_title').textContent,
                views: v.querySelector('.sr_view').textContent,
                updated: v.querySelector('.sr_updated').textContent,
            }
        })

        var bestMatch = strSim.findBestMatch(q.toString(), data.map(v => v.title)).ratings.splice(0,5)
        var webs = data.filter(({title}) => bestMatch.find(v => v.target === title))

        for (let index = 0; index < webs.length; index++) {
            const web = webs[index];
            let scraped = await scrapeRC(web.link)

            if(scraped === false) continue;
            else return scraped 
        }

        return { status: false, message: 'Not found.' }
    } catch (error) {
        throw error
    }
}

