import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/userSlice";
import { clearExpenses } from "../store/expenseSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chart from "../components/BarChart";
import Sidebar from "../components/Sidebar/Sidebar";
import ExpenseCard from "../components/ExpenseCard";
import { Modal } from "react-bootstrap";
import ExpenseModal from "../components/ExpenseModal";

export default function Home() {
  const [showExpense, setShowExpense] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleExpenseClose = () => setShowExpense(false);
  const handleExpenseShow = () => setShowExpense(true);

  const dispatch = useDispatch();
  const expense = useSelector((state) =>
    Array.from(state.expense.list.values())
  );
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const currency = useSelector((state) => state.user.currency);

  function calculateExpenses() {
    let total = 0;
    expense.forEach((element) => {
      total += Number(element.amount);
    });
    return total;
  }

  useEffect(() => {}, [filter]);

  return (
    <>
      <div className="d-flex flex-column rounded p-3 main my-5 pt-5">
        {
          (expense.length !== 0) ? (
            <div className="dashboard__recent-expenses">
              <ExpenseCard />
            </div>
          ) : ('')
        }
        <div className="bg-dark rounded border mt-4">
          <div className="border-bottom p-2">Quick access</div>
          <div className="d-flex justify-content-around p-3">
            <div className="chart-bg d-flex p-3 rounded icon" onClick={() => {
              handleExpenseShow();
            }}>
              <img src="logo512.png" alt="" width="30px" />
              <div className="ms-3">Add Expense</div>
            </div>
            <Modal show={showExpense} onHide={handleExpenseClose}>
              <ExpenseModal
                title={title}
                category={category}
                date={date}
                amount={amount}
                setAmount={setAmount}
                setTitle={setTitle}
                setCategory={setCategory}
                setDate={setDate}
                setShowExpense={setShowExpense}
              />
            </Modal>
            <div className="chart-bg d-flex p-3 rounded icon">
              <img src="logo512.png" alt="" width="30px" />
              <div className="ms-3">Dummy</div>
            </div>
            <div className="chart-bg d-flex p-3 rounded icon">
              <img src="logo512.png" alt="" width="30px" />
              <div className="ms-3">Dummy</div>
            </div>
            <div className="chart-bg d-flex p-3 rounded icon">
              <img src="logo512.png" alt="" width="30px" />
              <div className="ms-3">Dummy</div>
            </div>
          </div>
        </div>
        {
          (expense.length !== 0) ? (
            <div className="bg-dark rounded border mt-4">
              <div className="border-bottom p-2">Expense Graph</div>
              <div className="d-flex p-2">
                <div className="border-end w-50 px-2">
                  <div>Title</div>
                  <div style={{ height: "150px" }}>
                    <Chart data={Array.from(expense.values())} date={false} />
                  </div>
                </div>
                <div className="w-50 px-2">
                  <div>Date</div>
                  <div style={{ height: "150px" }}>
                    <Chart data={Array.from(expense.values())} date={true} />
                  </div>
                </div>
              </div>
            </div>
          ) : ('')
        }
      </div>
    </>
  );
}
