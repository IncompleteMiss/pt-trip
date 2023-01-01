import { defineStore } from 'pinia'
import {getHomeCategories, getHomeHouseList, getHomeSuggests} from '@/service/index.js'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage: 1,
    houseList: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      this.houseList = [ ...this.houseList, ...res.data]
      this.currentPage ++
    }
  }
})

export default useHomeStore