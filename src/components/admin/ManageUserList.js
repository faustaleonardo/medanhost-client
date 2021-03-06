/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import axiosInstance from 'utils/axiosInstance';
import { Redirect } from 'react-router-dom';

import { UserContext } from 'context/users/userState';
import { AuthContext } from 'context/auth/authState';
import WarningModal from 'components/partials/WarningModal';

export default () => {
  const { users, setUsers, deleteUser } = useContext(UserContext);
  const { auth } = useContext(AuthContext);

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get('/api/v1/users');
      const data = response.data;

      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteModal = (userId) => {
    setUserId(userId);
    setOpenWarningModal(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      // delete room
      await axiosInstance.delete(`/api/v1/users/${userId}`);

      deleteUser(userId);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err.response.data);
    }
    setOpenWarningModal(false);
  };

  const renderContent = () => {
    return users.map((user) => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.googleId}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{user.role.value}</Table.Cell>
          <Table.Cell>
            {user.role.id === 1 ? (
              '-'
            ) : (
              <Button negative onClick={() => handleDeleteModal(user.id)}>
                Delete
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  if (auth === false) return <Redirect to="/" />;
  if (!users.length) return null;

  return (
    <div>
      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        id={userId}
        action={handleDeleteUser}
        title={'Delete User'}
      />

      <h1>Users</h1>
      {error ? <Message negative>{error}</Message> : ''}
      <div className="mb-3r">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Google ID</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderContent()}</Table.Body>
        </Table>
      </div>
    </div>
  );
};
