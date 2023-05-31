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
    await searchBox.sendKeys("scarpe nike"); //ciò che scrivo nel campo di ricerca
    await searchBox.sendKeys(Key.RETURN); //simulo "Enter"

    //premo il bottone per accettare i cookie 
    const Cookiebutton = await driver.wait(until.elementLocated(By.xpath("//button[@id='uc-btn-accept-banner']")), 10000);
    Cookiebutton.click();
    
  //premo il bottone "Ordina" per poi far mostrare solo i prodotti in offerta
    const Ordinabutton = await driver.wait(until.elementLocated(By.xpath("//body/div[4]/div[1]/div[1]/div[1]/div[1]/div[7]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/button[1]")), 10000);
    Ordinabutton.click();

    //premo il bottone "offerte" per far mostrare solo i prodotti in offerta
    const Offertebutton = await driver.wait(until.elementLocated(By.xpath("//body/div[16]/div[1]/div[2]/div[1]/form[1]/div[1]/div[5]/div[1]/label[1]")), 10000);
    Offertebutton.click();

  
    
  } catch (err) {
    console.log("Errore prelevato dal catch", err);
  }
})();
