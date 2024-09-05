import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';  // Import the UserDetail component
import EditUser from './components/EditUser';
import UserForm from './components/UserForm';  // Import the UserForm component
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route to list all users */}
        <Route path="/" element={<UserList />} />
        
        {/* Route to view user details */}
        <Route path="/detail/:id" element={<UserDetail />} /> 
        
        {/* Route to edit a user */}
        <Route path="/edit/:id" element={<EditUser />} />
        
        {/* Route to create a new user */}
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
