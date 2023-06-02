const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

(async () => {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeService(
      new chrome.ServiceBuilder(
        "C:\\Users\\napol\\Documents\\BrowserDriversSelenium\\chromeDriver\\chromedriver.exe"
      )
    )
    .build();
  try {
    await driver.get("https://www.zalando.it/");
    await driver.manage().window().maximize();
    const searchBox = await driver.findElement(By.name("q")); // 'q' è il nome generico per il campo di ricerca.
    await searchBox.sendKeys("scarpe da calcio"); //ciò che scrivo nel campo di ricerca
    await searchBox.sendKeys(Key.RETURN); //simulo "Enter"

    await new Promise(resolve => setTimeout(resolve, 5000));

    //premo il bottone per accettare i cookie 
    const Cookiebutton = await driver.wait(until.elementLocated(By.xpath("//button[@id='uc-btn-deny-banner']")), 20000);
    Cookiebutton.click();
    
  //premo il bottone "Ordina" per poi far mostrare solo i prodotti in offerta
    const Ordinabutton = await driver.wait(until.elementLocated(By.xpath("//body/div[4]/div[1]/div[1]/div[1]/div[1]/div[7]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/button[1]")), 10000);
    Ordinabutton.click();

    //premo il bottone "offerte" per far mostrare solo i prodotti in offerta
    const Offertebutton = await driver.wait(until.elementLocated(By.css("body.is-uc:nth-child(2) div._0ofwUT.KVKCn3.DpImHu.CIcWFg.DcVjqF.MMd_43._0xLoFW._78xIQ-.LyRfpJ.zvYeCP div.VAkC61.hj1pfK._8n7CyI.KLaowZ div.KLaowZ form:nth-child(1) div.B_F_kS._0xLoFW._aLdvK.parent._78xIQ- div.ywxJ27.JT3_zV._0xLoFW._78xIQ-.EJ4MLB:nth-child(5) div.OxR88i._0xLoFW.JT3_zV.FCIprz.LyRfpJ > label._0Foye_.KxHAYs._2kjxJ6.FxZV-M.LkH0Rh.Z1Xqqm._8xiD-i.JT3_zV.ZkIJC-.Md_Vex.JCuRr_.CzGCn5._0xLoFW.FCIprz._4F506m.oHZ46w.a2XEVb")), 10000);
    Offertebutton.click();

    await new Promise(resolve => setTimeout(resolve, 5000));

/*
    const product = await driver.wait(until.elementLocated(By.xpath("//body/div[4]/div[1]/div[1]/div[1]/div[1]/div[7]/div[1]/div[2]/div[2]/div[2]/div")), 10000);
    let html = await product.getAttribute('innerHTML');
    console.log(html);   */


    const products = await driver.wait(until.elementsLocated(By.css("._5qdMrS.w8MdNG.cYylcv.BaerYO._75qWlu.iOzucJ.JT3_zV._Qe9k6")), 10000);

    let productData = [];

    let x = 0;

    for (let product of products) {

      
      let name = await product.findElements(By.css('.KxHAYs.lystZ1.FxZV-M._4F506m.ZkIJC-.r9BRio.qXofat.EKabf7.nBq1-s._2MyPg2'));

      
      if(name.length === 0)  console.log("NULLA");

      else {   

        let price = await product.findElements(By.css('.KxHAYs.lystZ1.dgII7d._3SrjVh'));
        let brand = await product.findElements(By.css('._6zR8Lt.lystZ1.FxZV-M._4F506m.ZkIJC-.r9BRio.qXofat.EKabf7.nBq1-s._2MyPg2')); 


        let productName = await name[0].getText();
        let productPrice = await price[0].getText();
        let productBrand = await brand[0].getText();
        productData.push({productName,productPrice,productBrand}); 
        x++;
      }

      // Aggiungi le informazioni del prodotto all'array
      //productData.push({name, price});


      
    }
    console.log(productData);
    console.log(x);
    

    
  } catch (err) {
    console.log("Errore prelevato dal catch", err);
  }
})();
