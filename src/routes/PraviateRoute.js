import React from 'react';
import {  Navigate } from 'react-router-dom';
import {  useAuth } from '../context/AuthProvider';

const PrivateRoute = ({children}) => {
const AuthPr=useAuth()
const auth = AuthPr.isAuthenticated;
// determine if authorized, from context or however you're doing it
// If authorized, return an outlet that will render child elements
 // If not, return element that will navigate to login page
return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

