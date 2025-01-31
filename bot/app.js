const { Telegraf, Markup } = require('telegraf');

const token = '7693523071:AAHxz45NAWMAdC0qiJcANGBU2sKmtfK0UlY';
const webAppUrl = 'https://drinks-assistant.netlify.app/';

const bot = new Telegraf(token);

bot.command('start', async (ctx) => {
  try {
    await ctx.reply(
      'Нажми, чтобы запустить приложение',
      Markup.inlineKeyboard([
        Markup.button.webApp('Открыть DrinkAssistant', webAppUrl),
      ])
    );
  } catch (error) {
    console.error('Ошибка при отправке:', error.message);
  }
});

// Обработка глобальных ошибок
bot.catch((err, ctx) => {
  console.error(`Ошибка в обновлении ${ctx.update.update_id}:`, err);
});

bot.launch();

// Корректное завершение работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));