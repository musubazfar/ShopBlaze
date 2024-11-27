import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background: ${({ variant }) =>
    variant === 'decrement'
      ? 'linear-gradient(135deg, #ff7e5f, #feb47b)'
      : 'linear-gradient(135deg, #76b852, #8dc26f)'};
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    transform: ${({ disabled }) => (!disabled ? 'scale(1.1)' : 'none')};
    box-shadow: ${({ disabled }) =>
      !disabled ? '0px 6px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`;

const QuantityButton = ({ type, onClick, disabled }) => {
  const symbol = type === 'decrement' ? '-' : '+';

  return (
    <StyledButton
      variant={type}
      onClick={onClick}
      disabled={disabled}
    >
      {symbol}
    </StyledButton>
  );
};

export default QuantityButton;
