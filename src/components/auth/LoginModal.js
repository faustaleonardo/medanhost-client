import React, { useState, useContext } from 'react';
import { Button, Modal, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import GoogleLogin from 'react-google-login';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const [open, setOpen] = useState(false);
  const { setAuth, setError, error } = useContext(AuthContext);
  const history = useHistory();

  const handleEmailLogin = () => {
    setOpen(false);
    history.push('/login/otp');
  };

  const handleGoogleResponse = async ({ profileObj }) => {
    try {
      const profile = {
        googleId: profileObj.googleId,
        email: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        roleId: 2,
      };

      const response = await axiosInstance.post('/api/v1/users', profile);
      const { user, jwt } = response.data;

      setAuth(user);
      localStorage.setItem('jwt', jwt);
      setOpen(false);
      console.log(localStorage.getItem('jwt'));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <Button positive onClick={() => setOpen(true)}>
        Login
      </Button>

      <Modal size={'mini'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Choose login method</Modal.Header>
        <Modal.Content>
          {error ? (
            <Message negative>
              <Message.Header>
                We're sorry we can't apply that discount
              </Message.Header>
              <p>That offer has expired</p>
            </Message>
          ) : (
            ''
          )}

          <p>I would like to login with ...</p>
        </Modal.Content>
        <Modal.Actions>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogleResponse}
            onFailure={handleGoogleResponse}
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
