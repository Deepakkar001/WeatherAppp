import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import authReducer from './features/authSlice'
import weatherReducer from './features/weatherSlice'

const persistConfig = {
  key: 'root',//identifiaction
  storage: AsyncStorage,//location
  whitelist: ['auth', 'weather'] //permission for persisted
}

const rootReducer = combineReducers({ //used to combine multiple reducers into one root reducers
  auth: authReducer,
  weather: weatherReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer) //Creation of Persisted Reducer for storing data into async storage

export const store = configureStore({ //Create a store with persist reducers
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
})

export const persistor = persistStore(store) //used for loading data into store when app reloads or reopen
