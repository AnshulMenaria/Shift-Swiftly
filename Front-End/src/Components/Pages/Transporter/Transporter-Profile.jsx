import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Transporter-Profile.css'; // Import custom CSS
import API_BASE_URL from '../../context/API_BASE_URL';

const TransporterProfile = () => {
  const { id } = useParams();
  const [transporter, setTransporter] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false); // State to track password change

  useEffect(() => {
    const fetchTransporter = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transporter/${id}`);
        const data = await response.json();
        if (response.ok) {
          setTransporter(data);
        } else {
          console.error('Error fetching transporter:', data.error);
        }
      } catch (error) {
        console.error('Error fetching transporter:', error);
      }
    };

    fetchTransporter();
  }, [id]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/transporter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setTransporter(data);
        setEditMode(false);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordChanged(true); // Set password changed flag to true
      } else {
        console.error('Error updating password:', data.error);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleUpdateTransporter = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transporter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: transporter.name,
          email: transporter.email,
          mobile: transporter.mobile,
          city: transporter.city,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTransporter(data);
        setEditMode(false);
      } else {
        console.error('Error updating transporter:', data.error);
      }
    } catch (error) {
      console.error('Error updating transporter:', error);
    }
  };

  useEffect(() => {
    let redirectTimer;
    if (passwordChanged) {
      redirectTimer = setTimeout(() => {
        // Implement your redirection logic here
        // For example, redirect to the login page
        console.log('Redirecting to login...');
        // Replace with actual redirect logic
        window.location.href = '/login'; // Example: Redirect to login page
      }, 3000); // Redirect after 3 seconds (adjust as needed)
    }

    return () => {
      clearTimeout(redirectTimer); // Clear timer on component unmount or state change
    };
  }, [passwordChanged]);

  if (!transporter) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={8}>
          <Table bordered hover size="lg" className="table-large">
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>
                  {editMode ? (
                    <Form.Control
                      type="text"
                      value={transporter.name}
                      onChange={(e) => setTransporter({ ...transporter, name: e.target.value })}
                    />
                  ) : (
                    transporter.name
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Number</strong></td>
                <td>
                  {editMode ? (
                    <Form.Control
                      type="text"
                      value={transporter.mobile}
                      onChange={(e) => setTransporter({ ...transporter, mobile: e.target.value })}
                    />
                  ) : (
                    transporter.mobile
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>
                  {editMode ? (
                    <Form.Control
                      type="email"
                      value={transporter.email}
                      onChange={(e) => setTransporter({ ...transporter, email: e.target.value })}
                    />
                  ) : (
                    transporter.email
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>City</strong></td>
                <td>
                  {editMode ? (
                    <Form.Control
                      type="text"
                      value={transporter.city}
                      onChange={(e) => setTransporter({ ...transporter, city: e.target.value })}
                    />
                  ) : (
                    transporter.city
                  )}
                </td>
              </tr>
              {editMode && (
                <>
                  <tr>
                    <td><strong>New Password</strong></td>
                    <td>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Confirm Password</strong></td>
                    <td>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {passwordError && <div className="text-danger">{passwordError}</div>}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
          {!editMode ? (
            <Button variant="secondary" onClick={() => setEditMode(true)}>Edit</Button>
          ) : (
            <>
              <Button variant="primary" className="mr-2" onClick={handleUpdateTransporter}>Update</Button>
              <Button variant="danger" onClick={() => setEditMode(false)}>Cancel</Button>
              <Button variant="success" className="ml-2" onClick={handleChangePassword}>Change Password</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TransporterProfile;
