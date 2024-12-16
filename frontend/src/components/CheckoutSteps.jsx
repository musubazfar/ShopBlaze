import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import blazeTheme from "./Theme";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const { colors } = blazeTheme;

  const navLinkStyle = {
    color: colors.linkColor,
    textDecoration: "none",
  };

  const disabledStyle = {
    color: colors.textSecondary,
    backgroundColor: colors.primaryBackground,
    cursor: "not-allowed",
    opacity: 0.7,
  };

  return (
    <Nav className="justify-content-center flex-nowrap mb-4" style={{ "--bs-nav-link-padding-x": "0.2rem" }}>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link style={navLinkStyle}>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={disabledStyle}>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link style={navLinkStyle}>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={disabledStyle}>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link style={navLinkStyle}>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={disabledStyle}>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link style={navLinkStyle}>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={disabledStyle}>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
