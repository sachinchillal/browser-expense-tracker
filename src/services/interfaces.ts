export interface Note {
  id: number;
  note: string;
}

export const STATE_STORAGE_KEY = "BrowserNotes";
export const STATE_STORAGE_KEY_SORT_TYPE = STATE_STORAGE_KEY + "SortType";
export const STATE_STORAGE_KEY_SORT_DIRECTION = STATE_STORAGE_KEY + "SortDirection";
