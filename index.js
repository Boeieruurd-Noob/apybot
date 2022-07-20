const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;

require('dotenv').config();

const { Telegraf } = require('telegraf');

// Creates new bot instance, fetches the telegram api token.

const bot = new Telegraf(process.env.BOT_TOKEN);

// Sends instruction when starting the bot

bot.command('start', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Type "yieldly apy" to get the current apy of the YLDY/YLDY Pool.', {
  })
})

//bot starts action when it hears a predefined string

bot.hears('apy', ctx => {

  console.log(ctx.from)

//fetches the needed data from defined endpoints.

axios.all([
    axios.get('https://app.yieldly.finance/staking/pools/v3/233725850'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/786777082'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/779181697'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/754135308'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/751347943'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/792754415')
  ])

  // spreads the returned data in the order we made the requests in and stores it in individualy labeled responses.

  .then(axios.spread((yieldlyRes, glitterRes, algxRes, boardRes, asastatsRes, kitsuneRes) => {

  // Now we can do something with our fetched data.


  //Extracts needed data from our responses, formats it correctly, rounds the numbers and gives it names.

    yieldlyapy = (Math.round(yieldlyRes.data.apy * 100) / 100)
    yieldlytvlusd = (Math.round(yieldlyRes.data.tvlUSD))
    yieldlyfixedtvlusd = (yieldlytvlusd.toLocaleString('en-US'))

    glitterapy = (Math.round(glitterRes.data.apy * 100) / 100)
    glittertvlusd = (Math.round(glitterRes.data.tvlUSD))
    glitterfixedtvlusd = (glittertvlusd.toLocaleString('en-US'))

    algxapy = (Math.round(algxRes.data.apy * 100) / 100)
    algxtvlusd = (Math.round(algxRes.data.tvlUSD))
    algxfixedtvlusd = (algxtvlusd.toLocaleString('en-US'))

    boardapy = (Math.round(boardRes.data.apy * 100) / 100)
    boardtvlusd = (Math.round(boardRes.data.tvlUSD))
    boardfixedtvlusd = (boardtvlusd.toLocaleString('en-US'))

    asastatsapy = (Math.round(asastatsRes.data.apy * 100) / 100)
    asastatstvlusd = (Math.round(asastatsRes.data.tvlUSD))
    asastatsfixedtvlusd = (asastatstvlusd.toLocaleString('en-US'))

    kitsuneapy = (Math.round(kitsuneRes.data.apy * 100) / 100)
    kitsunetvlusd = (Math.round(kitsuneRes.data.tvlUSD))
    kitsunefixedtvlusd = (kitsunetvlusd.toLocaleString('en-US'))



//Defines message_id as the message that originally initiated the request so we can respond to it later.

    const message_id = ctx.message.message_id

//Defines the message to send, markup in html.

    const message =
`
<b>Yieldly Pools:</b>

<b>YLDY/YLDY APY:</b> <i>${yieldlyapy}%</i>
<b>TVL:</b> <i>${yieldlyfixedtvlusd} USD</i>

<b>YLDY/XGLI APY:</b> <i>${glitterapy}%</i>
<b>TVL:</b> <i>${glitterfixedtvlusd} USD</i>

<b>YLDY/ALGX APY:</b> <i>${algxapy}%</i>
<b>TVL:</b> <i>${algxfixedtvlusd} USD</i>

<b>YLDY/BOARD APY:</b> <i>${boardapy}%</i>
<b>TVL:</b> <i>${boardfixedtvlusd} USD</i>

<b>YLDY/ASASTATS APY:</b> <i>${asastatsapy}%</i>
<b>TVL:</b> <i>${asastatsfixedtvlusd} USD</i>

<b>YLDY/KITSU APY:</b> <i>${kitsuneapy}%</i>
<b>TVL:</b> <i>${kitsunefixedtvlusd} USD</i>

<i>Looking for other pools? Try: "lp apy" or "distro apy"</i>
`
//replies the above message to "message_id" and defines the mode to parse "message" in.

    ctx.reply(message, { reply_to_message_id: message_id, parse_mode: "HTML"})
  }))})

//bot starts action when it hears a predefined string

  bot.hears('distro apy', ctx => {

    console.log(ctx.from)

  //fetches the needed data from defined endpoints.

  axios.all([
      axios.get('https://app.yieldly.finance/staking/pools/v3/779198429'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/772221734')
    ])

  // spreads the returned data in the order we made the requests in and stores it in individualy labeled responses.

    .then(axios.spread((algxRes, xetRes) => {

  //defines apy / tvl and rounds the numbers stored in our responses.

      algxapy = (Math.round(algxRes.data.apy * 100) / 100)
      algxtvlusd = (Math.round(algxRes.data.tvlUSD))
      algxfixedtvlusd = (algxtvlusd.toLocaleString('en-US'))

      xetapy = (Math.round(xetRes.data.apy * 100) / 100)
      xettvlusd = (Math.round(xetRes.data.tvlUSD))
      xetfixedtvlusd = (xettvlusd.toLocaleString('en-US'))


   //Defines message_id as the message that originally initiated the request so we can respond to it later.

      const message_id = ctx.message.message_id

   //Defines the message to send, markup in html.

      const message =
  `
  <b>Distro Pools:</b>

  <b>ALGX APY:</b> <i>${algxapy}%</i>
  <b>TVL:</b> <i>${algxfixedtvlusd} USD</i>

  <b>XET APY:</b> <i>${xetapy}%</i>
  <b>TVL:</b> <i>${xetfixedtvlusd} USD</i>

  <i>Looking for other pools? Try: "apy" or "lp apy"</i>

  `
  //replies the above message to "message_id" and defines the mode to parse "message" in.

      ctx.reply(message, { reply_to_message_id: message_id, parse_mode: "HTML"})
    }))})

    //bot starts action when it hears a predefined string

  bot.hears('lp apy', ctx => {

    console.log(ctx.from)

  //fetches the needed data from defined endpoints.

  axios.all([
      axios.get('https://app.yieldly.finance/staking/pools/v3/804484890'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/792740888'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/786781576'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/779189004'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/772207612'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/762480142'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/754147756'),
      axios.get('https://app.yieldly.finance/staking/pools/v3/751372353')

    ])

  // spreads the returned data in the order we made the requests in and stores it in individualy labeled responses.

    .then(axios.spread((yldyalgoRes, kitsuyldyRes, glityldyRes, algxyldyRes, xetyldyRes, treesyldyRes, boardyldyRes, asastatsyldyRes) => {

  //defines apy / tvl and rounds the numbers stored in our responses.

  yldyalgoapy = (Math.round(yldyalgoRes.data.apy * 100) / 100)
  yldyalgotvlusd = (Math.round(yldyalgoRes.data.tvlUSD))
  yldyalgofixedtvlusd = (yldyalgotvlusd.toLocaleString('en-US'))

  kitsuyldyapy = (Math.round(kitsuyldyRes.data.apy * 100) / 100)
  kitsuyldytvlusd = (Math.round(kitsuyldyRes.data.tvlUSD))
  kitsuyldyfixedtvlusd = (kitsuyldytvlusd.toLocaleString('en-US'))

  glityldyapy = (Math.round(glityldyRes.data.apy * 100) / 100)
  glityldytvlusd = (Math.round(glityldyRes.data.tvlUSD))
  glityldyfixedtvlusd = (glityldytvlusd.toLocaleString('en-US'))

  algxyldyapy = (Math.round(algxyldyRes.data.apy * 100) / 100)
  algxyldytvlusd = (Math.round(algxyldyRes.data.tvlUSD))
  algxyldyfixedtvlusd = (algxyldytvlusd.toLocaleString('en-US'))

  xetyldyapy = (Math.round(xetyldyRes.data.apy * 100) / 100)
  xetyldytvlusd = (Math.round(xetyldyRes.data.tvlUSD))
  xetyldyfixedtvlusd = (xetyldytvlusd.toLocaleString('en-US'))

  treesyldyapy = (Math.round(treesyldyRes.data.apy * 100) / 100)
  treesyldytvlusd = (Math.round(treesyldyRes.data.tvlUSD))
  treesyldyfixedtvlusd = (treesyldytvlusd.toLocaleString('en-US'))

  boardyldyapy = (Math.round(boardyldyRes.data.apy * 100) / 100)
  boardyldytvlusd = (Math.round(boardyldyRes.data.tvlUSD))
  boardyldyfixedtvlusd = (boardyldytvlusd.toLocaleString('en-US'))

  asastatsyldyapy = (Math.round(asastatsyldyRes.data.apy * 100) / 100)
  asastatsyldytvlusd = (Math.round(asastatsyldyRes.data.tvlUSD))
  asastatsyldyfixedtvlusd = (asastatsyldytvlusd.toLocaleString('en-US'))


   //Defines message_id as the message that originally initiated the request so we can respond to it later.

      const message_id = ctx.message.message_id

   //Defines the message to send, markup in html.

      const message =
  `
  <b>Liquidity Token Pools:</b>

  <b>YLDY/ALGO LP APY:</b> <i>${yldyalgoapy}%</i>
  <b>TVL:</b> <i>${yldyalgofixedtvlusd} USD</i>

  <b>KITSU/YLDY LP APY:</b> <i>${kitsuyldyapy}%</i>
  <b>TVL:</b> <i>${kitsuyldyfixedtvlusd} USD</i>

  <b>XGLI/YLDY LP APY:</b> <i>${glityldyapy}%</i>
  <b>TVL:</b> <i>${glityldyfixedtvlusd} USD</i>

  <b>ALGX/YLDY LP APY:</b> <i>${algxyldyapy}%</i>
  <b>TVL:</b> <i>${algxyldyfixedtvlusd} USD</i>

  <b>XET/YLDY LP APY:</b> <i>${xetyldyapy}%</i>
  <b>TVL:</b> <i>${xetyldyfixedtvlusd} USD</i>

  <b>TREES/YLDY LP APY:</b> <i>${treesyldyapy}%</i>
  <b>TVL:</b> <i>${treesyldyfixedtvlusd} USD</i>

  <b>BOARD/YLDY LP APY:</b> <i>${boardyldyapy}%</i>
  <b>TVL:</b> <i>${boardyldyfixedtvlusd} USD</i>

  <b>ASASTATS/YLDY LP APY:</b> <i>${asastatsyldyapy}%</i>
  <b>TVL:</b> <i>${asastatsyldyfixedtvlusd} USD</i>

  <i>Looking for other pools? Try: "apy" or "distro apy"</i>

  `
  //replies the above message to "message_id" and defines the mode to parse "message" in.

      ctx.reply(message, { reply_to_message_id: message_id, parse_mode: "HTML"})
    }))})

  // Start webhook via launch method (preferred)

  bot.launch({
      webhook: {
        domain: 'https://bot.boeieruurd.com',
        port: process.env.PORT
      }
    })

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
