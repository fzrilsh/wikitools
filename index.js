const scrape = require('scrape-it')
const { JSDOM } = require('jsdom')
const strSim = require('string-similarity')

async function scrapeRC(link){
    const content = (await scrape(link)).body
    const { document } = (new JSDOM(content)).window
    console.log(link)

    const steps = []
    const template0 = `({method}) {title}\n{headline}\n{step}`
    const template1 = `({method}) {title}\n{step}`

    var wt_steps = Array.from(document.querySelector('div[class="mf-section-1 collapsible-block"]').querySelectorAll('div > .steps'))
    for (const elem of wt_steps) {
        if(elem.querySelectorAll('.step_num').length){
            const step_arr = Array.from(elem.querySelectorAll('ol > li'))
            var step_str = step_arr.map(s => {
                if(s.querySelector('.step > ul')?.textContent)

                    return s.querySelector('.step_num').textContent+". "+s.querySelector('b.whb').textContent+s.querySelector('.step > ul').textContent.split('\n').filter(function (r) { return r.length>1 }).join("\n- ")
            }).join('\n')

            steps.push(
                template1
                 .replace('{method}', elem.querySelector('.method_label').textContent)
                 .replace('{title}', elem.querySelector('.mw-headline').textContent)
                 .replace('{step}', step_str)
            )
        }else{
            const step_arr = Array.from(elem.querySelectorAll('ul > li'))
            var step_str = step_arr.map(s => {
                return s.querySelector('.step_num').textContent+". "+s.querySelector('b.whb').textContent+"\n- "+s.querySelector('.step > ul').textContent.split('\n').filter(function (r) { return r.length>1 }).join("\n- ")
            }).join('\n')

            steps.push(
                template0
                 .replace('{method}', elem.querySelector('.method_label').textContent)
                 .replace('{title}', elem.querySelector('.mw-headline').textContent)
                 .replace('{headline}', elem.querySelector('b.whb').textContent)
                 .replace('{step}', "- "+elem.querySelector('ul').textContent.split('\n').join("\n- "))
            )
        }
    }

    return steps.join('\n\n')
}

module.exports = async(q) => {
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
        var similarity = data.find(v => v.title == strSim.findBestMatch(q, data.map(v => v.title)).bestMatch.target)

        return await scrapeRC(similarity.link)
    } catch (error) {
        throw error
    }
}