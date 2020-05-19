/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate, { alretOptions } from '../components/Alert';
// import AlertTemplate from 'react-alert-template-basic';

import Store from '../Redux/Store';
import { theme, GlobalStyle } from '../style';
import Loader from '../components/Basic/Loader';
import Alert from '../components/Basic/Alert';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/vendor/nprogress.css';
import '../assets/vendor/code.css';

import { loggedUpdate } from '../Redux/Actions/userActions';

function Wrapper({ children, logged }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loggedUpdate(logged));
  }, []);
  return (
    <>
      {children}
    </>
  );
}

function MyApp({
  Component, pageProps, logged,
}) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    NProgress.start();
    setTimeout(() => {
      setLoader(false);
      NProgress.done();
    }, 500);
  }, []);

  Router.onRouteChangeStart = () => {
    NProgress.start();
  };
  Router.onRouteChangeComplete = () => {
    NProgress.done();
  };

  Router.onRouteChangeError = () => {
    NProgress.done();
  };

  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <AlertProvider template={AlertTemplate} {...alretOptions}>
          <Wrapper logged={logged}>
            <GlobalStyle />
            <Loader show={loader} />
            <Alert />
            <Component {...pageProps} />
          </Wrapper>
        </AlertProvider>
      </ThemeProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = nextCookie(ctx);
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  // Anything returned here can be accessed by the client
  return { pageProps, logged: !!token };
};

export default MyApp;