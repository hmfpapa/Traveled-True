import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CrimeList from "./CrimeList";
import CrimeDetails from "./CrimeDetails";
import MediaAddForm from "./MediaAddForm";
import CrimeAddForm from "./CrimeAddForm";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">
         <Route
          index
          element={isLoggedIn ? <CrimeList /> : <Navigate to="/login" />}
        />
        <Route
          path="crime/:id"
          element={isLoggedIn ? <CrimeDetails /> : <Navigate to="/login" />}
        /> 
        <Route
          path="crime/:id/addMedia"
          element={isLoggedIn ? <MediaAddForm /> : <Navigate to="/login" />}
        /> 
        <Route
          path="crime/add"
          element={isLoggedIn ? <CrimeAddForm /> : <Navigate to="/login" />}
        /> 
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
