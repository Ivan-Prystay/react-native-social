import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: composeWithDevTools({
    // Опціонально: вказуйте шлях підключення до Redux DevTools
    // Наприклад, якщо розширення Redux DevTools запущене на localhost:8000
    // У режимі розробки веб-додатку можна використовувати `localhost` або `127.0.0.1`
    // У випадку мобільного додатку React Native, вам потрібно вказати IP-адресу вашої машини
    // У режимі розробки React Native ви можете використовувати `10.0.2.2` для Android або IP-адресу вашої машини для iOS
    // У режимі продакшену не забудьте видалити або відключити цю опцію
    realtime: true,
    hostname: "localhost",
    port: 9000,
  }),
});
