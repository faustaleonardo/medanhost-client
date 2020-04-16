import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal, Message } from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';
import { useParams, Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [error, setError] = useState(null);
  const [errorOtp, setErrotOtp] = useState(null);
  const [info, setInfo] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const { roleId } = useParams();

  useEffect(() => {
    setError(null);
    setInfo(null);
    setEmail('');
  }, []);

  const handleSendOtp = async () => {
    if (!email) return setError('Email must be filled!');

    try {
      const data = {
        email,
        roleId: parseInt(roleId),
      };
      setLoadingSend(true);
      await axiosInstance.post('/auth/otp/create', data);
      setLoadingSend(false);
      setInfo(
        'We have sent OTP code to your email. Click Verify OTP Code to continue.'
      );
    } catch (err) {
      setError(err.response.data.message);
      setLoadingSend(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!code) return setErrotOtp('OTP code must be filled!');
    if (code.length > 6) return setErrotOtp('Invalid OTP Code');

    try {
      setLoadingVerify(true);
      const response = await axiosInstance.post('/auth/otp/verify', {
        code: parseInt(code),
        roleId: parseInt(roleId),
      });
      setLoadingVerify(false);
      const user = response.data.user;
      const jwt = response.data.jwt;

      setAuth(user);
      localStorage.setItem('jwt', jwt);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      setErrotOtp(err.response.data.message);
      setLoadingVerify(false);
    }
  };

  if (auth) return <Redirect to="/" />;

  return (
    <div className="general-form center-vh">
      <h1>Login via Email</h1>
      {info ? <Message info>{info}</Message> : ''}
      {error ? <Message negative>{error}</Message> : ''}

      <Form>
        <Form.Input
          label="Email"
          placeholder="johndoe@lorem.com"
          value={email}
          type={'text'}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button positive onClick={handleSendOtp} loading={loadingSend}>
          Send OTP Code
        </Button>

        <Button onClick={() => setOpen(true)}>Verify OTP Code</Button>
      </Form>

      <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
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
              type="number"
              onChange={(event) => setCode(event.target.value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={handleVerifyOtp} loading={loadingVerify}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
