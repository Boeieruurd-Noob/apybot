
const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;

require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Type "yieldly apy" to get the current apy of the YLDY/YLDY Pool.', {
  })
})

//fetches yieldly apy
bot.hears('yieldly apy', ctx => {
  var yldyapy;
  console.log(ctx.from)
  axios.get(`https://app.yieldly.finance/staking/pools/v3/233725850`)
  .then(response => {
    console.log(response.data)
    apy = (Math.round(response.data.apy * 100) / 100)
    tvlusd = (Math.round(response.data.tvlUSD))
    fixedtvlusd = (tvlusd.toLocaleString('en-US'))
    const message_id = ctx.message.message_id
    const message =
`The current APY of the YLDY/YLDY pool is: ${apy}%
The TVL of this pool is: ${fixedtvlusd} USD.`
    ctx.reply(message, { reply_to_message_id: message_id }) ,{
    }
  })
  })





bot.launch()
