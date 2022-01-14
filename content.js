const puppeteer = require("puppeteer");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Enter item\n`, product => {
    console.log(`Looking for ${product}.........`);
    let amazonAmt
    async function amazon() {
        // amazon link

        const browser = await puppeteer.launch();
        const Amazonpage = await browser.newPage();
        await Amazonpage.goto("https://www.amazon.com/")

        await Amazonpage.type("#twotabsearchtextbox", product);
        await Amazonpage.click("#nav-search-submit-button");

        await Amazonpage.waitForNavigation()


        const getResults = await Amazonpage.evaluate(() => {

            try {
                let whole = document.querySelectorAll('h1 div div div div span')[0].innerText
                num = whole.split(' ')[2];
                if(num === 'over') {num = `${whole.split(' ')[3]}+`}
            
            } catch {
                num = 0
            }
            return num;
        });

        browser.close();

        amazonAmt = getResults
        console.log(`${amazonAmt} types available of ${product} at Amazon`)
    }

    amazon()

    // nike
    var nikeAmt = 0
    async function nike() {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://www.nike.com/")

        await page.click(".pre-search-input-icon")

        await page.type("#VisualSearchInput", product);
        page.keyboard.press('Enter');
        await page.waitForNavigation();

        const getResults = await page.evaluate(() => {

            let results = ''

            try {
                results = document.querySelector('.subheading__result-count').innerText
           
            } catch {
                results = "no results"
                amt = 0
            }

            if (results !== "no results") {
                cards = document.querySelectorAll('.product-card css-1kkp26o css-z5nr6i css-11ziap1 css-14d76vy css-dpr2cn product-grid__card')
                let space = results.indexOf(' ')
                amt = results.substring(0, space)
                return amt;
            }
        });

        browser.close()
        nikeAmt = getResults
        console.log(`${nikeAmt} types available of ${product} at Nike`)
    }
    nike()

    // footlocker
    footlockerAmt = 0
    async function footlocker() {

        const search = ' ';
        const replaceWith = '%20';
        const result = product.split(search).join(replaceWith);
        try {
            url = `https://www.footlocker.com/search?query=${result}`


            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url)
    
            const getResults = await page.evaluate(() => {
                let results = ''
                try {
                    results = document.querySelectorAll('strong')[1].innerText
                    return results
                } catch {
                    results = 0
                }
            });
            browser.close()
            footlockerAmt = getResults
            console.log(`${footlockerAmt} types available of ${product} at Footlocker`)
        } catch {
            console.log("No items avaiable, pls provide specific name or try another product")
        }

    }
    footlocker()
    readline.close();
});