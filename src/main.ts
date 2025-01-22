import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router';
import './style.css'
import App from './App.vue'

if (import.meta.env.VITE_DEV) {
    if (!window.Telegram) {
        window.Telegram = {
            WebApp: {
              initDataUnsafe: {
                user: {
                  id: 12345,
                  first_name: 'Dev User'
                }
              },
              ready: () => console.log('Telegram WebApp ready'),
              expand: () => console.log('Telegram WebApp expanded'),
              BackButton: {
                show: () => console.log('BackButton shown'),
                hide: () => console.log('BackButton hidden'),
                onClick: (cb: () => void) => cb()
              }
            } as any
          };
    }
}

const app = createApp(App)
app.use(createPinia())
app.use(router);
app.mount('#app')