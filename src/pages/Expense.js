import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense, editExpense } from "../store/expenseSlice";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExpenseModal from "../components/ExpenseModal";

export default function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");
  const expenses = Array.from(
    useSelector((state) => state.expense.list.values())
  );
  const currency = useSelector((state) => state.user.currency);
  const [show, setShow] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleExpenseClose = () => setShowExpense(false);
  const handleExpenseShow = () => setShowExpense(true);

  const dispatch = useDispatch();

  const sortedExpenses = () => {
    if (sortOrder === "1") {
      return expenses.sort((a, b) => b.amount - a.amount);
    } else if (sortOrder === "2") {
      return expenses.sort((a, b) => a.amount - b.amount);
    } else {
      return expenses;
    }
  };

  return (
    <>
      <div className="p-3 main my-5 rounded">
        <div className="d-flex justify-content-between border-bottom-custom">
          {expenses.length === 0 ? (
            <h2>No expenses yet</h2>
          ) : (
            <>
              <h2>Expenses</h2>
            </>
          )}
          <div className="d-flex">
            <div className="me-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  handleExpenseShow();
                }}
              >
                + New Expense
              </button>
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
            {expenses.length !== 0 ? (
              <div>
                <select onChange={(e) => setSortOrder(e.target.value)} className="bg-dark text-light p-1 rounded">
                  <option value="">Sort By</option>
                  <option value="1">High to Low</option>
                  <option value="2">Low to High</option>
                </select>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mt-3">
          {
            (expenses.length !== 0 ) ? (

              <Table
                striped
                // bordered
                hover
                responsive
              >
                <thead>
                  <tr>
                    <th className="bg-dark text-light">Title</th>
                    <th className="bg-dark text-light">Category</th>
                    <th className="bg-dark text-light">Date</th>
                    <th className="bg-dark text-light">Amount</th>
                    <th className="bg-dark text-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedExpenses().map((expense, index) => (
                    <tr key={index}>
                      <td className="bg-dark text-light p-2">{expense.title}</td>
                      <td className="bg-dark text-light p-2">{expense.category}</td>
                      <td className="bg-dark text-light p-2">{expense.date}</td>
                      <td className="bg-dark text-light p-2">
                        {expense.amount} {currency}
                      </td>
                      <td className="bg-dark text-light p-2">
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => {
                            setEditTitle(expense.title);
                            setEditAmount(expense.amount);
                            setEditCategory(expense.category);
                            setEditDate(expense.date);
                            handleShow();
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            if (window.confirm("Delete expense?")) {
                              dispatch(deleteExpense(expense));
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : ('')
          }
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                editExpense({
                  title: editTitle,
                  amount: parseInt(editAmount),
                  category: editCategory,
                  date: editDate,
                })
              );
              handleClose();
            }}
          >
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                as="select"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="category 1">Category 1</option>
                <option value="category 2">Category 2</option>
                <option value="category 3">Category 3</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
