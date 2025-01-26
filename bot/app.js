import { Telegraf, Markup } from 'telegraf'

const token = '7693523071:AAHxz45NAWMAdC0qiJcANGBU2sKmtfK0UlY'
const webAppUrl = 'https://drinks-assistant.netlify.app/'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
  ctx.reply(
    'Нажми, чтобы запустить приложение',
    Markup.inlineKeyboard([
      Markup.button.webApp('Открыть DrinkAssistant', `${webAppUrl}`),
    ])
  )
})

bot.launch()
