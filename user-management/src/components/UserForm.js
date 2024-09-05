// src/components/UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api';

const UserForm = ({ user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if we are editing or creating
  const isEditing = Boolean(user);
  const id = user ? user.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update user
        await updateUser(id, { name, email, phone });
      } else {
        // Create user
        await createUser({ name, email, phone });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving user', error);
      setError('Failed to submit form.');
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit User' : 'Create User'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? 'Update User' : 'Create User'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserForm;
