import { Expense, Page, SORT_BY, SORT_ORDER, SortBy, SortOrder } from '@/services/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface ExpenseTrackerState {
  pages: {
    [key: number]: Page
  },
  currentPageId: number | null;
  sortBy: SortBy,
  sortOrder: SortOrder
}

const initialState: ExpenseTrackerState = {
  pages: {},
  currentPageId: null,
  sortBy: SORT_BY.DATE,
  sortOrder: SORT_ORDER.DESC
};

const expenseTrackerSlice = createSlice({
  name: 'expenseTracker',
  initialState,
  reducers: {
    createPage: (state, action: { payload: { title: string; description: string } }) => {
      const id = Date.now();
      const newPage: Page = {
        id,
        title: action.payload.title,
        description: action.payload.description,
        expenses: [],
        updatedAt: id
      };
      state.pages[newPage.id] = newPage;
    },
    updatePage: (state, action: { payload: { id: number; title: string; description: string } }) => {
      const page = state.pages[action.payload.id];
      if (page) {
        page.title = action.payload.title;
        page.description = action.payload.description;
        page.updatedAt = Date.now();
      }
    },
    deletePage: (state, action: { payload: { id: number } }) => {
      delete state.pages[action.payload.id];
    },
    setCurrentPage: (state, action: { payload: { id: number | null } }) => {
      state.currentPageId = action.payload.id;
    },
    setSort: (state, action: { payload: { sortBy: SortBy, sortOrder: SortOrder } }) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    saveExpenses: (state, action: { payload: { pageId: number, expenses: Expense[] } }) => {
      const page = state.pages[action.payload.pageId];
      if (page) {
        page.expenses = action.payload.expenses;
      }
    }
  },
});

export const { createPage, updatePage, deletePage, setCurrentPage, setSort, saveExpenses } = expenseTrackerSlice.actions;
export default expenseTrackerSlice.reducer;
