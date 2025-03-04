import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'user', // Change 'root' to match your reducer name
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({ 
  user: persistedUserReducer, 
});



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
      },
    }),
});

export const persistor = persistStore(store);
