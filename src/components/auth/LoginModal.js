import React, { useState, useContext } from 'react';
import { Button, Modal, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import GoogleLogin from 'react-google-login';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const [error, setError] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();

  const handleEmailLogin = () => {
    setOpen(false);
    history.push(`/login/otp/${roleId}`);
  };

  const handleGoogleResponse = async ({ profileObj }, roleId) => {
    try {
      const profile = {
        googleId: profileObj.googleId,
        email: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        roleId,
      };

      const response = await axiosInstance.post('/api/v1/users', profile);
      const { user, jwt } = response.data;

      setOpen(false);
      setAuth(user);
      localStorage.setItem('jwt', jwt);
      window.location.reload();
      history.push('/');
    } catch (err) {
      console.log(err);
      // setError(err.response.data.message);
    }
  };

  const handleOpenModal = (role) => {
    if (role === 'guest') {
      // guest
      setRoleId(2);
      setOpen(true);
    } else {
      // host
      setRoleId(3);
      setOpen(true);
    }
  };

  const handleCloseModal = () => {
    setError(null);
    setOpen(false);
  };

  return (
    <div>
      <Button positive onClick={() => handleOpenModal('guest')}>
        Login as Guest
      </Button>

      <Button positive onClick={() => handleOpenModal('host')}>
        Login as Host
      </Button>

      <Modal size={'mini'} open={open} onClose={handleCloseModal}>
        <Modal.Header>Choose login method</Modal.Header>
        <Modal.Content>
          {error ? (
            <Message negative>
              <p>{error}</p>
            </Message>
          ) : (
            ''
          )}

          <p>I would like to login with ...</p>
        </Modal.Content>
        <Modal.Actions>
          <GoogleLogin
            clientId={
              '426480471724-9kuhcp47rvngg0b9igvbe2pat2hd8mbu.apps.googleusercontent.com'
            }
            buttonText="Login"
            onSuccess={(response) => handleGoogleResponse(response, roleId)}
            onFailure={(response) => handleGoogleResponse(response, null)}
            cookiePolicy={'single_host_origin'}
          />
          <Button
            positive
            icon="mail"
            labelPosition="left"
            content="Email"
            onClick={handleEmailLogin}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
