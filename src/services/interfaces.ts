// Note interface
export interface Note {
  id: number;
  note: string;
  updatedAt: number;
}
export enum SORT_ORDER {
  ASC = "ASC",
  DESC = "DESC"
}
export type SortOrder = keyof typeof SORT_ORDER;
export enum SORT_BY {
  TITLE = "TITLE",
  DATE = "DATE"
}
export type SortBy = keyof typeof SORT_BY;

// Expense and Page interfaces

export enum ExpenseAmountType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  NA = 'NA' // Not Applicable or do not include
}

export interface Expense {
  id: number;
  title: string;
  description: string;

  amount: number;
  date: number;
  amountType: ExpenseAmountType;
}

export interface Page {
  id: number;
  title: string;
  description: string;

  expenses: Expense[];
  updatedAt: number;
}

// Constants

export const STATE_STORAGE_KEY = "BrowserExpenseTracker";
