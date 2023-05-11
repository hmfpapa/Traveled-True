import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CrimeList from "./Crimes/CrimeList";
import CrimeDetails from "./Crimes/CrimeDetails";
import MediaAddForm from "./MediaAddForm";
import CrimeAddForm from "./Crimes/CrimeAddForm";
import ItineraryList from "./Itineraries/ItineraryList";
import { DeleteItinerary } from "./Itineraries/DeleteItinerary";
import ItineraryForm from "./Itineraries/ItineraryForm";
import { ItineraryEditForm } from "./Itineraries/ItineraryEdit";
import LandingPage  from "./LandingPage";

export default function ApplicationViews({ isLoggedIn, userProfile }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={isLoggedIn ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/allCrimes"
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
        <Route
          path="myItineraries"
          element={isLoggedIn ? <ItineraryList userProfile={userProfile} /> : <Navigate to="/login" />}
        />
        <Route
          path="myItineraries/edit/:id"
          element={isLoggedIn ? <ItineraryEditForm /> : <Navigate to="/login" />}
        />
        <Route
          path="createItinerary"
          element={isLoggedIn ? <ItineraryForm userProfile={userProfile} /> : <Navigate to="/login" />}
        />
        <Route
          path="deleteItinerary/:id"
          element={isLoggedIn ? <DeleteItinerary /> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
