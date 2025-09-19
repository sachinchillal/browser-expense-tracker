"use client";
import React, { useEffect, useState } from "react";
import { Page, SORT_BY, SORT_ORDER, SortBy, SortOrder } from "@/services/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

import { deletePage, setCurrentPage, setSort } from "@/store/features/expenseTrackerSlice";
import { formatDate } from "@/services/utilities";
import Link from "next/link";

export function PagesComponent() {
  const _pages = useSelector((state: RootState) => state.expenseTracker.pages);
  const _sortBy = useSelector((state: RootState) => state.expenseTracker.sortBy);
  const _sortOrder = useSelector((state: RootState) => state.expenseTracker.sortOrder);
  const dispatch = useDispatch();

  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    document.title = "Expense Pages";
  }, []);

  useEffect(() => {
    const p: Page[] = Object.values(_pages);
    sortPages([...p], _sortBy, _sortOrder);
  }, [_pages, _sortBy, _sortOrder]);

  const sortPages = (__pages: Page[], __sortBy: SortBy, __sortOrder: SortOrder) => {
    if (__sortBy === SORT_BY.DATE) {
      __pages.sort((a, b) =>
        __sortOrder === SORT_ORDER.DESC ? b.id - a.id : a.id - b.id
      );
    } else if (__sortBy === SORT_BY.TITLE) {
      __pages.sort((a, b) =>
        __sortOrder === SORT_ORDER.DESC
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title)
      );
    }
    setPages(__pages);
  }

  const handleSortByDate = () => {
    let newSortOrder = _sortOrder;
    if (_sortBy === SORT_BY.DATE) {
      newSortOrder = _sortOrder === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;
    }
    dispatch(setSort({ sortBy: SORT_BY.DATE, sortOrder: newSortOrder }));
  };
  const handleSortByTitle = () => {
    let newSortOrder = _sortOrder;
    if (_sortBy === SORT_BY.TITLE) {
      newSortOrder = _sortOrder === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC;
    }
    dispatch(setSort({ sortBy: SORT_BY.TITLE, sortOrder: newSortOrder }));
  };


  if (!pages.length) {
    return (
      <div className="p-4 text-gray-500">No pages yet.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mb-4">Your Pages
          <span className="text-xs text-gray-500 ml-2">({pages.length})</span>
        </h2>
        <i className="ms-auto"></i>
        <button type="button" title="Sort by Date" onClick={handleSortByDate}
          className={`px-0.5 rounded${_sortBy === SORT_BY.DATE ? ' bg-green-900' : ''}`}>&#128290;</button>
        <button type="button" title="Sort by Title" onClick={handleSortByTitle}
          className={`px-0.5 rounded ${_sortBy === SORT_BY.TITLE ? 'bg-green-900' : ''}`}>&#128288;</button>
      </div>
      <ul className="space-y-2">
        {pages.map(page => (
          <li key={page.id} className="relative rounded shadow p-2 border border-gray-200 dark:border-gray-700">
            <div className="mb-2">{page.title}</div>
            <div className="mb-2">{page.description}</div>
            <div className="flex gap-2 items-center">
              <div className="text-xs text-gray-500">{formatDate(page.id)}</div>
              <div className="text-xs text-gray-500">|</div>
              <div className="text-xs text-gray-500">{page.expenses.length} expenses</div>
              <i className="ms-auto"></i>
              <button
                className="p-1 hover:bg-red-900 rounded"
                title="Delete Page"
                onClick={() => dispatch(deletePage(page))}
                aria-label="Delete Page"
              >
                &#128465;
              </button>
              <button
                className="p-1 hover:bg-blue-900 rounded"
                title="Edit Page"
                onClick={() => { dispatch(setCurrentPage({ id: page.id })) }}
                aria-label="Edit Page"
              >
                &#9999;
              </button>
              <button
                className="p-1 hover:bg-green-900 rounded"
                title="Copy Page"
                onClick={() => navigator.clipboard.writeText(page.title)}
                aria-label="Copy Page"
              >
                &#128196;
              </button>
              <Link href={`/page?id=${page.id}`}>
                <button
                  className="p-1 hover:bg-green-900 rounded"
                  title="Open Page"
                  aria-label="Open Page"
                >
                  &#128214;
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

