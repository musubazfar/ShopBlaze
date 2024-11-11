import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

// Styled component for the footer text color
const StyledFooterText = styled.p`
  color: ${({ theme }) => theme.colors.footerText};
`;

// Styled component for the Col element with dynamic background color
const StyledCol = styled(Col)`
  background-color: ${({ theme }) => theme.colors.footerBackground};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Row style={{ width: '100%', boxSizing: 'border-box', margin: 0 }}>
        {/* Apply the styled Col with dynamic background color */}
        <StyledCol className="d-flex justify-content-center align-items-center py-3 flex-1">
          <StyledFooterText className="m-0">
            ShopBlaze, All Rights Reserved &copy; {currentYear}
          </StyledFooterText>
        </StyledCol>
      </Row>
    </footer>
  );
};

export default Footer;
