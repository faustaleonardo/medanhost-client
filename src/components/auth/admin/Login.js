import React, { useContext, useState } from 'react';
import { Button, Segment, Divider, Message } from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';
import axiosInstance from 'utils/axiosInstance';
import { AuthContext } from 'context/auth/authState';
import { useHistory, Redirect } from 'react-router-dom';

export default () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleEmailLogin = () => {
    history.push(`/login/otp/1`);
  };

  const history = useHistory();
  const handleGoogleResponse = async ({ profileObj }) => {
    try {
      const profile = {
        googleId: profileObj.googleId,
        email: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        roleId: 1,
      };

      const response = await axiosInstance.post('/api/v1/users', profile);
      const { user, jwt } = response.data;

      setAuth(user);
      localStorage.setItem('jwt', jwt);
      window.location.reload();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (auth) return <Redirect to="/" />;

  return (
    <div className="center-vh">
      <h3 className="text-center">Login as Admin</h3>
      {error ? (
        <Message negative>
          <p>{error}</p>
        </Message>
      ) : (
        ''
      )}

      <Segment basic textAlign="center">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleResponse}
          cookiePolicy={'single_host_origin'}
        />
        <Divider horizontal>Or</Divider>
        <Button
          positive
          icon="mail"
          labelPosition="left"
          content="Email"
          className="ml-05r"
          onClick={handleEmailLogin}
        />
      </Segment>
    </div>
  );
};
