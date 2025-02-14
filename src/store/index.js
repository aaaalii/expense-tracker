import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import expenseListSlice from './expenseSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import setTransform from './setTransform';
import { enableMapSet } from "immer";

enableMapSet();
// Separate persist configs for user and expense
const userPersistConfig = {
  key: "user",
  storage,
};

const expensePersistConfig = {
  key: "expense",
  storage,
  transforms: [setTransform],
};

const persistedUser = persistReducer(userPersistConfig, userSlice);
const persistedExpense = persistReducer(expensePersistConfig, expenseListSlice);

export const store = configureStore({
  reducer: { 
    user: persistedUser,
    expense: expenseListSlice,
   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);