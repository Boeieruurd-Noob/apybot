const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;

require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Sends instruction when starting the bot

bot.command('start', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Type "yieldly apy" to get the current apy of the YLDY/YLDY Pool.', {
  })
})

//bot action
bot.hears('yieldly apy', ctx => {

  console.log(ctx.from)

//fetches apy values
axios.all([
    axios.get('https://app.yieldly.finance/staking/pools/v3/233725850'),
    axios.get('https://app.yieldly.finance/staking/pools/v3/786777082')
  ])
  .then(axios.spread((yieldlyRes, glitterRes) => {
    // do something with both responses





//defines apy / tvl and rounds the numbers gotten from yieldly.

    yieldlyapy = (Math.round(yieldlyRes.data.apy * 100) / 100)
    yieldlytvlusd = (Math.round(yieldlyRes.data.tvlUSD))
    yieldlyfixedtvlusd = (yieldlytvlusd.toLocaleString('en-US'))

    glitterapy = (Math.round(glitterRes.data.apy * 100) / 100)
    glittertvlusd = (Math.round(glitterRes.data.tvlUSD))
    glitterfixedtvlusd = (glittertvlusd.toLocaleString('en-US'))



//defines message_id to quote respond on telegram, and defines the message to respond.

    const message_id = ctx.message.message_id
    const message =
`
YLDY/YLDY APY is: ${yieldlyapy}%
TVL: ${yieldlyfixedtvlusd} USD.

YLDY/XGLI APY is: ${glitterapy}%
TVL: ${glitterfixedtvlusd} USD.

`

    ctx.reply(message, { reply_to_message_id: message_id })
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
