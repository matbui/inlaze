import React, { useContext, useState } from 'react';
import { AuthContext } from '@/app/context/LoginContext';
import { useFetch } from '../app/utils/useFetch';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const api = useFetch();
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const body = {
        email,
        token: verificationCode,
        password: newPassword,
      };

      const response = await api.post('auth/restorePassword', body);
      console.log(response);
      
      if (response.status === 201) {
        setSuccessMessage('Password successfully reset. You can now log in with your new password.');
        setTimeout(() => router.push('/'), logout(), 3000);
      } else {
        setError('Failed to reset password. Please check the verification code and try again.');
      }
    } catch (err) {
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleResetPassword} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
        <button type="submit" style={buttonStyle}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#1C1C1C',
  color: '#fff',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputGroupStyle = {
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  backgroundColor: '#333',
  color: '#fff',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '16px',
};

const errorStyle = {
  color: 'red',
};

const successMessageStyle = {
  color: 'green',
};
