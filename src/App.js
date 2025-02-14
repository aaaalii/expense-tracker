import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Expense from "./pages/Expense";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './components/Protected';

function AppContent() {
  const auth = useSelector((state) => state.user?.auth);
  const username = useSelector((state) => state.user.username);
  const location = useLocation();

  return (
    <div className="d-flex">
      {location.pathname !== '/login' && (
        <div className="sidebar position-fixed">
          <Sidebar name={username} img="logo512.png" />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Protected isAuth={auth}>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/login"
          exact
          element={<Login />}
        />
        <Route
          path="/expenses"
          exact
          element={
            <Protected isAuth={auth}>
              <Expense />
            </Protected>
          }
        />
        <Route
          path="/profile"
          exact
          element={
            <Protected isAuth={auth}>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}