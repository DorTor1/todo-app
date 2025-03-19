import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './slices/todoSlice';

// Конфигурация персистентности для задач
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'], // сохраняем только задачи, не состояние загрузки
};

// Создаем персистентный редюсер
const persistedTodoReducer = persistReducer(persistConfig, todoReducer);

// Создаем store
export const store = configureStore({
  reducer: {
    todos: persistedTodoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Создаем persistor
export const persistor = persistStore(store);

// Типы для store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 