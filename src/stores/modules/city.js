import { defineStore } from 'pinia'
import { getCityAll } from '@/service/index.js'

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},

    currentCity: {
      cityName: '北京 '
    }
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore