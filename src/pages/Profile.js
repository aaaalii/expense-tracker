import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [currency, setCurrency] = useState(user.currency);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  return (
    <>
      <div className="p-3 main my-5 rounded">
        <div>
          <div className="d-flex justify-content-between">
            <h2>User Profile</h2>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-dark text-light">
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(setUser({
                    username,
                    currency,
                  }));
                  handleClose();
                }}
              >
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="bg-dark text-light"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    className="bg-dark text-light"
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-2">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <div>Name: {user.username}</div>
        <div>Currency: {user.currency}</div>
      </div>
    </>
  );
}
