import React, { useState, useContext } from 'react';
import { Button, Form, Modal, Message } from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const { setAuth } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [errorOtp, setErrotOtp] = useState(null);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const { roleId } = useParams();
  const history = useHistory();

  const handleSendOtp = async () => {
    if (!email) return setError('Email must be filled!');

    try {
      const data = {
        email,
        roleId,
      };
      await axiosInstance.post('/auth/otp/create', data);
      setOpen(true);
    } catch (err) {
      setError(err.response.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!code) return setErrotOtp('Otp must be filled!');

    try {
      const response = await axiosInstance.post('/auth/otp/verify', { code });
      const user = response.data.user;
      const jwt = response.data.jwt;

      setAuth(user);
      localStorage.setItem('jwt', jwt);
      setOpen(false);
      history.push('/');
    } catch (err) {
      setErrotOtp(err.response.message);
    }
  };

  return (
    <div className="general-form center-vh">
      {error ? <Message negative>{error}</Message> : ''}

      <Form>
        <Form.Input
          label="Email"
          placeholder="johndoe@lorem.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button positive onClick={handleSendOtp}>
          Submit
        </Button>
      </Form>

      <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Type OTP Code</Modal.Header>
        <Modal.Content>
          {errorOtp ? (
            <Message negative>
              <p>{errorOtp}</p>
            </Message>
          ) : (
            ''
          )}

          <Form>
            <Form.Input
              label="OTP Code"
              placeholder="000000"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={handleVerifyOtp}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
