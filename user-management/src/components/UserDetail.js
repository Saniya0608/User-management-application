// src/components/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, deleteUser } from '../api'; // Adjusted import

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUserById(id);
        setUser(userData);
      } catch (error) {
        setError('Failed to fetch user details.');
      }
    };

    getUserDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      navigate('/');
    } catch (error) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;
