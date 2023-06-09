//utilizzeremo SELENIUM su CHROME per fare web scraping 

const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const readline = require("readline");


//let searchQuery = process.argv[2];


/* la funzione prende in input il prodotto da cercare. 
Poi in automatico imposterà il filtro "offera" per filtrare i prodotti del giorno in offera
Poi prende come secondo parametro la percentuale di sconto minima 
Infine restituisce in input un array con gli elementi scontati e il numero di prodotti presenti nell'array */

exports.scrapingProdottiZalando  = async (productType,discountPercentageValue) => {

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeService(
      new chrome.ServiceBuilder(
        "C:\\Users\\Administrator\\Documents\\Selenium-BrowserDriver\\ChromeDriver\\chromedriver.exe"
      )
    )
    .build();
  try {
    await driver.get("https://www.zalando.it/");
    await driver.manage().window().maximize();
    const searchBox = await driver.findElement(By.name("q")); 
    await searchBox.sendKeys(productType); 
    await searchBox.sendKeys(Key.RETURN); 

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const Cookiebutton = await driver.wait(
      until.elementLocated(By.xpath("//button[@id='uc-btn-deny-banner']")),
      20000
    );
    Cookiebutton.click();

    const Ordinabutton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//body/div[4]/div[1]/div[1]/div[1]/div[1]/div[7]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/button[1]"
        )
      ),
      10000
    );
    Ordinabutton.click();

    const Offertebutton = await driver.wait(
      until.elementLocated(
        By.css(
          "body.is-uc:nth-child(2) div._0ofwUT.KVKCn3.DpImHu.CIcWFg.DcVjqF.MMd_43._0xLoFW._78xIQ-.LyRfpJ.zvYeCP div.VAkC61.hj1pfK._8n7CyI.KLaowZ div.KLaowZ form:nth-child(1) div.B_F_kS._0xLoFW._aLdvK.parent._78xIQ- div.ywxJ27.JT3_zV._0xLoFW._78xIQ-.EJ4MLB:nth-child(5) div.OxR88i._0xLoFW.JT3_zV.FCIprz.LyRfpJ > label._0Foye_.KxHAYs._2kjxJ6.FxZV-M.LkH0Rh.Z1Xqqm._8xiD-i.JT3_zV.ZkIJC-.Md_Vex.JCuRr_.CzGCn5._0xLoFW.FCIprz._4F506m.oHZ46w.a2XEVb"
        )
      ),
      10000
    );
    Offertebutton.click();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const products = await driver.wait(
      until.elementsLocated(
        By.css("._5qdMrS.w8MdNG.cYylcv.BaerYO._75qWlu.iOzucJ.JT3_zV._Qe9k6")
      ),
      10000
    );

    let productData = [];

    let numberProductsFound = 0;

    for (let product of products) {
      let productName = await product.findElements(
        By.css(
          ".KxHAYs.lystZ1.FxZV-M._4F506m.ZkIJC-.r9BRio.qXofat.EKabf7.nBq1-s._2MyPg2"
        )
      );

      let str = await product.findElements(
        By.css(".KxHAYs.goVnUa.FxZV-M._3SrjVh.r9BRio")
      );

      if (productName.length === 0 || str.length === 0) continue;
      else {
        
        let stringaPercentage = await str[0].getText();
        let index = stringaPercentage.indexOf("%");
        let discountPercentageString = stringaPercentage.substring(
          index - 2,
          index
        );

        let discountPercentageInt = parseInt(discountPercentageString);

        if (discountPercentageInt < discountPercentageValue) continue;

        let productPrice = await product.findElement(
          By.css(".KxHAYs.lystZ1.dgII7d._3SrjVh")
        );

        let productBrand = await product.findElement(
          By.css(
            "._6zR8Lt.lystZ1.FxZV-M._4F506m.ZkIJC-.r9BRio.qXofat.EKabf7.nBq1-s._2MyPg2"
          )
        );

        let porductUrl = await product.findElement(
          By.css(
            "._LM.JT3_zV.CKDt_l.CKDt_l.LyRfpJ"
          )
        );

        let productImg = await product.findElement(By.css("img.KxHAYs.lystZ1.FxZV-M._2Pvyxl.JT3_zV.EKabf7.mo6ZnF._1RurXL.mo6ZnF._7ZONEy"));


        let name = await productName[0].getText();
        let price = await productPrice.getText();
        let brand = await productBrand.getText();
        let url = await porductUrl.getAttribute('href');
        let img = await productImg.getAttribute('src');

        productData.push({ name, price, brand, discountPercentageInt, url, img });

        numberProductsFound++;
      }
    }

    return {productData, numberProductsFound};

  } catch (err) {
    console.log("\nErrore prelevato dal catch", err);
    return null;
  }
}

