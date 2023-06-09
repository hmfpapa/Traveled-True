import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
        <img src="https://res.cloudinary.com/dggkcaqhs/image/upload/v1683751008/Capstone/TT_Logo2_kn0jzw.png" alt="Traveled + True"
        height = "50"/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
       
          <Nav className="mr-auto" navbar>
          {userProfile && (
              <NavItem>
                <NavLink>Welcome, {userProfile.name}!</NavLink>
              </NavItem>
            )}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/allCrimes">
                    All Crimes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/myItineraries">
                    My Journeys
                  </NavLink>
                </NavItem>
                
                 {  userProfile?.admin? (<NavItem>
                  <NavLink tag={RRNavLink} to="/crime/add">
                    Add Crime
                  </NavLink>
                </NavItem>):(<></>)}  
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
                )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
