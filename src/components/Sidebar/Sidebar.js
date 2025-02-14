import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "./Icon";
import { faHome, faMoneyBill, faPersonRifle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { clearExpenses } from "../../store/expenseSlice";

export default function Sidebar({name, img}){

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <>
      <div className="sidebar__container full-height p-4 d-flex flex-column bg-dark">
        <div className="sidebar__header d-flex flex-column align-items-center">
          <img src={img} alt="" width='50px'/>
          <div>{name}</div>
        </div>
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="sidebar__main mt-5">
            <div className="icon" onClick={() => {
              navigate('/');
            }}>
              <Icon icon={<FontAwesomeIcon icon={faHome}/>} name='Home' active={location.pathname === '/'}/>
            </div>
            <div className="icon" onClick={() => {
              navigate('/expenses');
            }}>
              <Icon icon={<FontAwesomeIcon icon={faMoneyBill}/>} name='Expenses' active={location.pathname === '/expenses'}/>
            </div>
            <div className="icon" onClick={() => {
              navigate('/profile');
            }}>
              <Icon icon={<FontAwesomeIcon icon={faPersonRifle}/>} name='Profile' active={location.pathname === '/profile'}/>
            </div>
            <div className="icon" onClick={() => {
                dispatch(resetUser());
                dispatch(clearExpenses());
            }}>
              <Icon icon={<FontAwesomeIcon icon={faSignOut}/>} name='Logout'/>
            </div>
          </div>
            <img src={img} alt="" width='70px' className="mx-auto"/>
        </div>
      </div>
    </>
  );
}