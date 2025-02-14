import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('expenseList');
    if (serializedState === null) {
      return new Map();
    }
    return new Map(JSON.parse(serializedState));
  } catch (err) {
    console.error("Could not load state", err);
    return new Map();
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(Array.from(state));
    localStorage.setItem('expenseList', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const initialState = {
  list: loadState(),
}

const expenseListSlice = createSlice({
  name: 'expenseList',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      if (state.list.has(action.payload.title)) {
        alert('Expense already added');
        return;
      }
      state.list.set(action.payload.title, action.payload);
      saveState(state.list);
    },
    editExpense: (state, action) => {
      if (!state.list.has(action.payload.title)) {
        alert('Expense not found');
        return;
      }
      state.list.set(action.payload.title, action.payload);
      saveState(state.list);
    },
    clearExpenses: (state) => {
      state.list = new Map();
      saveState(state.list);
    },
    deleteExpense: (state, action) => {
      state.list.delete(action.payload.title);
      saveState(state.list)
    }
  }
});

export const { addExpense, clearExpenses, editExpense, deleteExpense } = expenseListSlice.actions;
export default expenseListSlice.reducer;