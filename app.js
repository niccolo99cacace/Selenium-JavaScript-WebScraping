const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');


(async function example() {
    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(new chrome.ServiceBuilder('C:\\Users\\napol\\Documents\\BrowserDriversSelenium\\chromeDriver\\chromedriver.exe'))
    .build();
  try {
    await driver.get('http://www.google.com');

  } catch(err) {
    console.log("Errore prelevato dal catch",err);
  }
})();