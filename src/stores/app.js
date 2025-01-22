import {
    getOrCreateUser,
  } from '@/api/app'
  
  import { defineStore } from 'pinia'

  import { useTelegram } from '@/services/telegram'
  
  const { user } = useTelegram()
  
  export const useAppStore = defineStore('app', {
    state: () => ({
      user: {},
      tasks: [],
    }),
    actions: {
      async init() {
        this.user = await getOrCreateUser()
      },
      async completeTask(task) {
        // await completeTask(this.user, task)
      },
      async fetchTasks() {
        // this.tasks = await fetchTasks()
      },
    },
  })
  