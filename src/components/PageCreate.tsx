"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { createPage, setCurrentPage, updatePage } from "@/store/features/expenseTrackerSlice";

export function PageCreateComponent() {
  const _pages = useSelector((state: RootState) => state.expenseTracker.pages);
  const _currentPageId = useSelector((state: RootState) => state.expenseTracker.currentPageId);
  const dispatch = useDispatch();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPageId, setCurrentPageId] = useState<number | null>(null);


  useEffect(() => {
    if (_currentPageId) {
      const currentPage = _pages[_currentPageId];
      if (currentPage) {
        setTitle(currentPage.title);
        setDescription(currentPage.description);
      } else {
        // might have been deleted
        setTitle("");
        setDescription("");
        setCurrentPageId(null);
        dispatch(setCurrentPage({ id: null }));
      }
    } else {
      setTitle("");
      setDescription("");
      setCurrentPageId(null);
    }
    setCurrentPageId(_currentPageId);
  }, [_currentPageId, _pages, dispatch]);

  const handleSave = () => {
    const t = title.trim();
    const d = description.trim();
    if (t) {
      if (_currentPageId) {
        dispatch(updatePage({ id: _currentPageId, title: t, description: d }));
      } else {
        dispatch(createPage({ title: t, description: d }));
      }
      setTitle("");
      setDescription("");
    }
  };
  const handleCancel = () => {
    dispatch(setCurrentPage({ id: null }));
  }

  return (
    <div className="flex flex-col gap-2 p-4 border dark:border-gray-700 rounded shadow">
      <input type="text" placeholder="Title" value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
      <textarea
        className="border p-2 rounded resize-none min-h-[80px] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={handleSave}
        disabled={!title.trim()}
      >
        {currentPageId ? 'Update Page' : 'Create Page'}
      </button>
      {currentPageId && (
        <button title="Cancel Edit"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-900"
          onClick={handleCancel}
        >Cancel Edit
        </button>
      )}
    </div>
  );
}
