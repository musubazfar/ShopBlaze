import React from 'react';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';
import blazeTheme from './components/Theme';
import GlobalStyles from './components/GlobalStyles'
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <ThemeProvider theme={blazeTheme}>
        <GlobalStyles/>
        <Header />
        <main style={{ backgroundColor: blazeTheme.colors.primaryBackground, flexGrow: 1 }} className="py-3">
          <Container>
            <Outlet/>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
