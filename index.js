const puppeteer = require('puppeteer')
const fs  = require('fs')
async function run(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.traversymedia.com/")
    //screenshot that webpage://
    //await page.screenshot({ path: 'example.png', fullPage: true})

    //download that page://
    //await page.pdf({ path: 'example.pdf', fullPage: true})

    //load html://
    //const html = await page.content()

    const title = await page.evaluate(()=>document.title)
    const text = await page.evaluate(()=>document.body.innerText)
    const links = await page.evaluate(()=>Array.from(document.querySelectorAll('a'),(e)=>e.href))

    const courses = await page.evaluate(()=>Array.from(document.querySelectorAll('#courses .card'),(e)=>({
        title:e.querySelector('.card-body h3').innerText,
        level:e.querySelector('.card-body .level').innerText,
        link:e.querySelector('.card-footer a').href,
        promocode:e.querySelector('.promo-code .promo').innerText
    })))

    //Alternative Way//
   /* const courses =  await page.$$eval('#courses .card',(elements)=>elements.map((e)=>({
        title:e.querySelector('.card-body h3').innerText,
        level:e.querySelector('.card-body .level').innerText,
        link:e.querySelector('.card-footer a').href,
        promocode:e.querySelector('.promo-code .promo').innerText
    })))*/
   // console.log(courses)
   //write json into file://
    fs.writeFileSync('courses.json',JSON.stringify(courses,"\n"),(err)=>{
        if(err) throw err
        console.log('file saved:')
    })
    await browser.close()
}
run()