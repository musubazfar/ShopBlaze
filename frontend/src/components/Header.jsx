import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import logo from "../Assets/logo.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../Redux/slices/usersApiSlice";
import { logout } from "../Redux/slices/authSlice";

const StyledNavbar = styled(Navbar)`
  background: ${({ theme }) => theme.colors.headerBackground};
`;

const FireText = styled.span`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.aloeLight}, ${({ theme }) => theme.colors.aloeLight});
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
  font-weight: bold;
  font-size: 2rem;
  font-family: "Blaze", sans-serif;
`;

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async()=>{
    try {
      await logoutApiCall().unwrap;
      dispatch(logout());
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }
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
              <Link to="/cart" style={{ color: "white", textDecoration: "none", fontSize: "18px", marginLeft: "8px" }}>
                <div style={{ position: "relative", display: "inline-block", marginRight: "10px" }}>
                  <FaShoppingCart style={{ fontSize: "24px", color: "white" }} />
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "-5px", // Adjust position
                        right: "-10px", // Adjust position
                        fontSize: "12px",
                        minWidth: "18px",
                        minHeight: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </div>
                Cart
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                logout
              </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                  <FaUser /> Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </header>
  );
};

export default Header;
