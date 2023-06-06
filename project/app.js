const scrapingProdottiZalando = require("./scraping_zalando")



//chiamata alla funzione di scraping

/*
scrapingProdottiZalando.scrapingProdottiZalando('nike',20)
.then(result => {
  console.log(result.productData); // stampa il numero di articoli
  console.log("\n Numero prodotti trovati : ",result.numberProductsFound); // stampa l'array di dati del prodotto
})
  .catch(error => console.error(error));

  */


  
  const TelegramBot = require('node-telegram-bot-api');
  const token = '5812866661:AAFBRaqi4nyBDuNi3uSpe5DVC0NC6IBlps8';
  const chatId = '-1001716230871';
  
  const bot = new TelegramBot(token, { polling: true });
  
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Benvenuto nel Zalando bot! \n Strumento indispensabile per trovare nuovi sconti');
  });
  
  bot.on('message', async (msg) => {
    if (msg.text.startsWith('#')) {
      const productName = msg.text.substring(1);
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, `L'utente ha inviato il nome del prodotto: ${productName}`);
  
      try {
        const result = await scrapingProdottiZalando.scrapingProdottiZalando(productName, 20);
      //  console.log(result.productData);
       // console.log("\n Numero prodotti trovati : ", result.numberProductsFound);


       //NOTA : map è una funzione SINCRONA (NON restituisce una Promise ma un array)
       //Aggiungere await sarebbe inutile (map è già BLOCCANTE di per sè)
        let prodotti = result.productData.map((n) => n.name);
        console.log(prodotti);
        console.log(prodotti.length);

        let x = 0;
        for(let prodotto of prodotti){
        bot.sendMessage(chatId, `${prodotto}`);
        
        x++;
        await new Promise((resolve) => setTimeout(resolve, 300));

        bot.sendMessage(chatId, `${x}`);

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      } catch (error) {
        console.error(error);
      }
    } else {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, `CAZZ ai SCRITT???`);
    }
  });
  
  bot.on('polling_error', (error) => {
    console.log(error);
  });






//per l'id del gruppo
/*
const token = '5812866661:AAFBRaqi4nyBDuNi3uSpe5DVC0NC6IBlps8';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log("L'ID del gruppo è:", chatId);
});

*/





