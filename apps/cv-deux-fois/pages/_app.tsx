import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Navbar from './navbar';
import './styles/global.css';
import './styles/themes.css';
import './styles/navbar/navbar.css';
import './styles/navbar/expand.css';
import './styles/index/intro.css';
import './styles/navbar/btn-darkMode.css';
import './styles/edit.css';
import './styles/portfolio.css';
import './styles/blog.css';

const SSR = typeof window === 'undefined';
if (!SSR) document.documentElement.setAttribute('data-theme', 'light')


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DeuxFois</title>
        <link rel="shortcut icon" href="/favico.ico" />
      </Head>
      <header>
      <Navbar/>
      </header>

      <main className="app">
          <Component {...pageProps} />   
      </main>
    </>
  );
}

export default App;
