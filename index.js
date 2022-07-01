const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;

require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Sends instruction when starting the bot

bot.command('start', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Type "yieldly apy" to get information about yieldly-finance staking pools.', {
  })
})

//bot action
bot.hears('yieldly apy', ctx => {

  console.log(ctx.from)

//fetches apy values
axios.all([
    axios.get('https://app.yieldly.finance/staking/pools/v3/233725850'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/786777082'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/779181697'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/754135308'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/751347943'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/792754415')
  ])
  .then(axios.spread((yieldlyRes, glitterRes, algxRes, boardRes, asastatsRes, kitsuneRes) => {
    // do something with both responses





//defines apy / tvl and rounds the numbers gotten from yieldly.

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



//defines message_id to quote respond on telegram, and defines the message to respond.

    const message_id = ctx.message.message_id
    const message =
`
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
`

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
