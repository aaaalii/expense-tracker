import { useSelector } from "react-redux";

export default function ExpenseCard() {
  const expenses = useSelector((state) =>
    Array.from(state.expense.list.values())
  );
  const currency = useSelector((state) => state.user.currency);
  return (
    <>
      <div className="expense-card bg-dark text-light rounded border w-50">
        <div className="expense-card__header border-bottom p-2">
          Recent Expenses
        </div>
        <div className="expense-card__body p-1 px-3">
          <table className="w-100">
            <thead>
              <tr class="">
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(-5).reverse().map((expense, index) => (
                <tr key={index} className=" overflow-hidden">
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>
                    {expense.amount} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
