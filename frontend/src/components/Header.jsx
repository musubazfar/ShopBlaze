import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styled from "styled-components";
import logo from '../Assets/logo.png';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const StyledNavbar = styled(Navbar)`
  background: ${({ theme }) => theme.colors.headerBackground}
`;

const FireText = styled.span`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.aloeLight}, ${({ theme }) => theme.colors.aloeLight});
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Blaze', sans-serif;
`;

const Header = () => {
  return (
    <header>
      <StyledNavbar variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Shop-Blaze-logo" height="100%" width="70px" />
            <FireText>-Gadgets</FireText>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-3">
              <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
                <FaShoppingCart /> Cart
              </Link>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
                <FaUser /> Sign In
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </header>
  );
};

export default Header;
