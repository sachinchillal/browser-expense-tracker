"use client";

import { isLoading, setLoading } from "@/services/appService";
import { Expense, ExpenseAmountType } from "@/services/interfaces";
import { formatDate } from "@/services/utilities";
import { RootState } from "@/store/appStore";
import { saveExpenses } from "@/store/features/expenseTrackerSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const _pages = useSelector((state: RootState) => state.expenseTracker.pages);


  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [pageId, setPageId] = useState<number>(0);

  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalNA, setTotalNA] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Add state for checkboxes
  const [showTitle, setShowTitle] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    setLoading(true);
    document.title = "Browser Notepad";
    const id = searchParams.get('id');
    if (id) {
      const pageId = parseInt(id);
      setPageId(pageId);
      const currentPage = _pages[pageId];
      if (currentPage) {
        setExpenses([...currentPage.expenses]);
      } else {
        setPageId(0);
        setExpenses([]);
      }
      setLoading(false);
    }
  }, [_pages, searchParams]);
  useEffect(() => {
    let sum = 0, credit = 0, debit = 0, na = 0;
    expenses.forEach(o => {
      sum += o.amount;
      if (o.amountType == ExpenseAmountType.ADD) {
        credit += o.amount;
      } else if (o.amountType == ExpenseAmountType.SUBTRACT) {
        debit += o.amount;
      } else {
        na += o.amount;
      }
    });

    setTotalCredit(credit);
    setTotalDebit(debit);
    setTotalNA(na);
    setGrandTotal(sum);
  }, [expenses]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>, o: Expense) => {
    const value = e.target.value;
    setExpenses(prevExpenses => prevExpenses.map(exp => ({
      ...exp,
      title: exp.id === o.id ? value : exp.title
    })));
  }

  const handleAmount = (ele: React.ChangeEvent<HTMLInputElement>, e: Expense) => {
    const value = parseFloat(ele.target.value);
    if (isNaN(value)) {
      return;
    }

    setExpenses(prevExpenses => prevExpenses.map(exp => {
      return {
        ...exp, amount: exp.id === e.id ? value : exp.amount
      };
    }));
  }

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>, o: Expense) => {
    const value = e.target.value;
    setExpenses(prevExpenses => prevExpenses.map(exp => ({
      ...exp,
      description: exp.id === o.id ? value : exp.description
    })));
  }

  const handleNewRow = () => {
    const id = Date.now();
    setExpenses(prevExpenses => [...prevExpenses, {
      id,
      title: "",
      description: "",
      amount: 0,
      date: id,
      amountType: ExpenseAmountType.ADD
    }]);
  }
  const handleSave = () => {
    if (pageId) {
      dispatch(saveExpenses({ pageId, expenses }));
    } else {
      alert("Invalid Page ID");
    }
  }
  const handleDelete = (o: Expense) => {
    setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== o.id));
  }
  const handleAmountType = (type: ExpenseAmountType, o: Expense) => {
    setExpenses(prevExpenses => prevExpenses.map(exp => ({
      ...exp,
      amountType: exp.id === o.id ? type : exp.amountType
    })));
  };
  if (isLoading) {
    return null;
  }

  if (pageId === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-red-900/10 border border-red-900 rounded-lg p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-700 dark:text-red-300 mb-4">Expense Page Not Found</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            The expense page you are looking for does not exist or the page ID is invalid.
          </p>
          <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">
            Show All Pages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 p-4 md:p-8 w-full justify-center items-stretch">
      <div className="w-full md:flex-1 mb-4 md:mb-0 h-[84vh] overflow-y-auto scrollbar">

        <ul className="space-y-2">
          {expenses.map(o => (
            <li key={o.id} className="relative rounded shadow p-2 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col mb-1">
                <div className="flex gap-2 mb-2">
                  {/* Conditionally render Title input */}
                  {showTitle && (
                    <input type="text" className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="Title" value={o.title} onChange={(e) => { handleTitle(e, o) }} />
                  )}
                  <input type="number" className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    placeholder="Amount" value={o.amount} onChange={(e) => { handleAmount(e, o) }} />
                </div>

                {/* Conditionally render Description textarea */}
                {showDescription && (
                  <textarea placeholder="Type your note here..."
                    className="border p-2 rounded resize-none min-h-[80px] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={o.description} onChange={(e) => { handleDescription(e, o) }}
                  />
                )}

              </div>

              <div className="flex gap-2 items-center">
                <div className="text-xs text-gray-500 ml-2">{formatDate(o.id)}</div>
                <i className="ms-auto"></i>
                <button
                  className="p-1 hover:bg-red-900 rounded"
                  title="Delete expense"
                  onClick={() => { handleDelete(o) }}
                  aria-label="Delete expense"
                >
                  &#128465;
                </button>


                {/* Switch Button for ExpenseAmountType */}
                <span className="ml-2 text-xs text-gray-500">Type</span>
                <div className="flex rounded overflow-hidden border border-gray-300 dark:border-gray-600">
                  <button
                    className={`px-3 py-1 text-xs font-semibold focus:outline-none transition ${o.amountType === ExpenseAmountType.ADD
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    onClick={() => handleAmountType(ExpenseAmountType.ADD, o)}
                    type="button"
                  >
                    Credit
                  </button>
                  <button
                    className={`px-3 py-1 text-xs font-semibold focus:outline-none transition ${o.amountType === ExpenseAmountType.SUBTRACT
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    onClick={() => handleAmountType(ExpenseAmountType.SUBTRACT, o)}
                    type="button"
                  >
                    Debit
                  </button>
                  <button
                    className={`px-3 py-1 text-xs font-semibold focus:outline-none transition ${o.amountType === ExpenseAmountType.NA
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    onClick={() => handleAmountType(ExpenseAmountType.NA, o)}
                    type="button"
                  >
                    NA
                  </button>
                </div>


              </div>
            </li>
          ))}
        </ul>

        {expenses.length === 0 && (
          <div className="text-gray-400 text-sm">
            No expenses added yet. Click &quot;Add New Expense&quot; to get started.
          </div>
        )}
      </div>
      <div className="w-full md:flex-1">
        <div className="flex gap-2 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleNewRow}>
            Add New Expense
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <table className="border border-gray-300 rounded w-fit">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-2 px-4">Type</th>
                <th className="text-left p-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Total Credit</td>
                <td className="py-2 px-4 bg-green-100 dark:bg-green-900 font-bold text-right">{totalCredit}</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td className="py-2 px-4">Total Debit</td>
                <td className="py-2 px-4 bg-green-100 dark:bg-green-900 font-bold text-right">{totalDebit}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Total NA</td>
                <td className="py-2 px-4 bg-green-100 dark:bg-green-900 font-bold text-right">{totalNA}</td>
              </tr>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td className="py-2 px-4">Grand Total</td>
                <td className="py-2 px-4 bg-green-200 dark:bg-green-700 font-bold text-right">{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 my-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTitle}
              onChange={() => setShowTitle(prev => !prev)}
            />
            Title
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showDescription}
              onChange={() => setShowDescription(prev => !prev)}
            />
            Description
          </label>
        </div>

      </div>
    </div>
  );
}
