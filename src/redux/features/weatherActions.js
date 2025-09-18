import AsyncStorage from '@react-native-async-storage/async-storage'
import { addWeatherSearch, loadWeatherHistory } from './weatherSlice'

const WEATHER_KEY = 'weather_history' // for finding in local storage

// Save data into Redux and AsyncStorage
export const saveWeatherSearch = (weatherData) => async (dispatch) => {
  try {
    //Add to Redux 
    dispatch(addWeatherSearch(weatherData))
    
    // Get existing weather history from AsyncStorage
    const existingHistory = await AsyncStorage.getItem(WEATHER_KEY)
    const history = existingHistory ? JSON.parse(existingHistory) : []
    
    //Add new search with timestamp and ID
    const newSearch = {
      ...weatherData
    }
    history.unshift(newSearch)
    
    // Save to AsyncStorage (permanent)
    await AsyncStorage.setItem(WEATHER_KEY, JSON.stringify(history))
    
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

// Load weather history from AsyncStorage to Redux
export const loadWeatherFromStorage = () => async (dispatch) => {
  try {
    const history = await AsyncStorage.getItem(WEATHER_KEY)
    if (history) {
      dispatch(loadWeatherHistory(JSON.parse(history)))
    }
  } catch (error) {
    console.log('Error loading weather history:', error)
  }
}
