/*
@File    :   counter.ts
@Time    :   2023/04/14 21:28:08
@Author  :   Lison LIN
@Version :   1.0
@Contact :   lisonlin22@qq.com
@Desc    :   状态管理器
*/

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
