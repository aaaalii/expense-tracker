import { Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenseSlice";

export default function ExpenseModal({title, amount, category, date, setTitle, setAmount, setCategory, setDate, setShowExpense}){
  const dispatch = useDispatch();
  const handleExpenseClose = () => setShowExpense(false);

  return (
    <>
      <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={(e) => {
            e.preventDefault();
            dispatch(addExpense({ title, amount: parseInt(amount), category, date }));
            setTitle('');
            setAmount('');
            setCategory('');
            setDate('');
            handleExpenseClose();
          }}>
            <Form.Group>
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control autoFocus type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-dark text-light" required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Amount" value={amount} className="bg-dark text-light" onChange={(e) => setAmount(e.target.value)} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={category} className="bg-dark text-light" onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="category 1">Category 1</option>
                <option value="category 2">Category 2</option>
                <option value="category 3">Category 3</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={date} className="bg-dark text-light" onChange={(e) => setDate(e.target.value)} required />
            </Form.Group>
            <input type="submit" className="btn btn-success mt-2" value='Add Expense' />
          </Form>
        </Modal.Body>
    </>
  );
}