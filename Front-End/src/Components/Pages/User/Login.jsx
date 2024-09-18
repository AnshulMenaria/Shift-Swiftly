import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import API_BASE_URL from '../../context/API_BASE_URL';
import { Spinner, Modal, Button } from 'react-bootstrap';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const loginTypeConfig = {
    transporter: {
      endpoint: `${API_BASE_URL}/tlogin`,
      storageKey: 'transporter',
      data: { mobile: identifier, password },
    },
    user: {
      endpoint: `${API_BASE_URL}/ulogin`,
      storageKey: 'user',
      data: { email: identifier, password },
    },
    admin: {
      endpoint: `${API_BASE_URL}/adminlogin`,
      storageKey: 'admin',
      data: { username: identifier, password },
    },
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { endpoint, storageKey, data } = loginTypeConfig[loginType];

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error || 'An error occurred. Please try again.');
        return;
      }

      const userData = loginType === 'transporter'
        ? responseData.transporter
        : loginType === 'admin'
        ? { role: 'admin' }
        : responseData.user;

      if (responseData.accessToken && userData) {
        localStorage.setItem('token', responseData.accessToken);

        if (loginType === 'transporter') {
          localStorage.setItem('city', userData.city || 'Udaipur');
          localStorage.setItem(storageKey, JSON.stringify(userData));
          navigate('/transporterpanel');
        } else if (loginType === 'admin') {
          localStorage.setItem(storageKey, JSON.stringify(userData));
          navigate('/adminpanel');
        } else {
          localStorage.setItem(storageKey, JSON.stringify(userData));
          navigate('/');
        }
      } else {
        console.error('Login failed:', responseData);
        setError('Login failed. No access token or user data provided.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/userforgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error || 'An error occurred. Please try again.');
        return;
      }

      setStep(2);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleVerifyOtpSubmit = async () => {
    try {
      const data = { email: forgotPasswordEmail, otp, newPassword };
      console.log('Sending data:', data);

      const response = await fetch(`${API_BASE_URL}/userverifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error || 'An error occurred. Please try again.');
        return;
      }

      setShowForgotPassword(false);
      setStep(1);
      setForgotPasswordEmail('');
      setOtp('');
      setNewPassword('');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'A' ) {
        setShowAdmin((prevShowAdmin) => !prevShowAdmin);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ul-login-background">
      <div className="ul-login-container p-4 bg-dark text-white ">
        <div className="ul-login-card text-center">
          <h2>Welcome Back!</h2>
          <p>Log in to your account</p>
          <div className="mb-3 d-flex justify-content-around">
            <button
              type="button"
              className={`btn ${loginType === 'user' ? 'btn-primary' : 'btn-secondary'} w-100`}
              onClick={() => setLoginType('user')}
            >
              User
            </button>
            <button
              type="button"
              className={`btn ${loginType === 'transporter' ? 'btn-primary' : 'btn-secondary'} w-100`}
              onClick={() => setLoginType('transporter')}
            >
              Transporter
            </button>
            {showAdmin && (
              <button
                type="button"
                className={`btn ${loginType === 'admin' ? 'btn-primary' : 'btn-secondary'} w-100`}
                onClick={() => setLoginType('admin')}
              >
                Admin
              </button>
            )}
          </div>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <form onSubmit={handleLoginSubmit}>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              {loginType === 'user' && (
                <>
                  <div className="ul-form-group mb-3 text-left">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  <div className="ul-form-group mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              {loginType === 'transporter' && (
                <>
                  <div className="ul-form-group mb-3 text-left">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      type="text"
                      id="mobile"
                      className="form-control"
                      placeholder="Enter your mobile number"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  <div className="ul-form-group mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              {loginType === 'admin' && (
                <>
                  <div className="ul-form-group mb-3 text-left">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Enter your username"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  <div className="ul-form-group mb-3 text-left">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary w-100 mb-3 ul-login-btn">
                Login
              </button>
            </form>
          )}
          <div className="ul-signup-link">
            <p className="mb-0 mt-3">
              Don't have an account?{' '}
              <a href="/userregistration" className="text-decoration-none">
                Sign Up
              </a>
            </p>
            <p className="mb-0 mt-3">
              Forgot your password?{' '}
              <button
                type="button"
                className="btn btn-link text-decoration-none p-0"
                onClick={() => setShowForgotPassword(true)}
              >
                Reset Password
              </button>
            </p>
          </div>
        </div>
      </div>

      <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="forgotPasswordEmail">Email</label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  className="form-control"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </div>
              <Button className="btn btn-primary mt-3" onClick={handleForgotPasswordSubmit}>
                Send OTP
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  id="otp"
                  className="form-control"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button className="btn btn-primary mt-3" onClick={handleVerifyOtpSubmit}>
                Reset Password
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgotPassword(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;