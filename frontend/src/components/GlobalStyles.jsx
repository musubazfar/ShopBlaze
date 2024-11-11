// src/components/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Massilia';
    src: url('/fonts/Massilia_Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Blaze';
    src: url('/fonts/Blaze.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Massilia', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    color: ${({theme})=> theme.colors.textPrimary}
  }
  
  #root{
    display: flex;
    flex-direction: column;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
