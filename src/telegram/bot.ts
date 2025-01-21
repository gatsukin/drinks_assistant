import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { useInventoryStore } from '../stores/inventory';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.VITE_WEBAPP_URL || 'https://your-webapp-url.com';

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
}

const bot = new TelegramBot(token, { polling: true });
const store = useInventoryStore();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я помогу тебе найти коктейли, которые ты можешь приготовить.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть приложение", web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.onText(/\/add (.+)/, (msg, match) => {
  if (!match) return;
  
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const item = match[1];
  
  if (userId) {
    store.addToInventory(userId, item);
    bot.sendMessage(chatId, `Добавлено: ${item}`);
  }
});

bot.onText(/\/remove (.+)/, (msg, match) => {
  if (!match) return;
  
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const item = match[1];
  
  if (userId) {
    store.removeFromInventory(userId, item);
    bot.sendMessage(chatId, `Удалено: ${item}`);
  }
});

bot.onText(/\/list/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (userId) {
    const inventory = store.getInventory(userId);
    const message = inventory.length > 0 
      ? `Ваш инвентарь:\n${inventory.join('\n')}`
      : 'Ваш инвентарь пуст';
    
    bot.sendMessage(chatId, message);
  }
});

bot.onText(/\/cocktails/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (userId) {
    store.updateAvailableCocktails(userId);
    const cocktails = store.availableCocktails;
    
    if (cocktails.length > 0) {
      const message = cocktails.map(cocktail => 
        `🍸 ${cocktail.name}\nИнгредиенты: ${cocktail.requiredIngredients.join(', ')}\nРецепт: ${cocktail.instructions}`
      ).join('\n\n');
      
      bot.sendMessage(chatId, `Доступные коктейли:\n\n${message}`);
    } else {
      bot.sendMessage(chatId, 'К сожалению, из имеющихся ингредиентов нельзя приготовить коктейли');
    }
  }
});

console.log('Telegram bot started');