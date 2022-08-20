
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
import './styles/contact.css';

const SSR = typeof window === 'undefined';
if (!SSR) document.documentElement.setAttribute('data-theme', 'light')


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DeuxFois</title>
        <link rel="shortcut icon" href="/favico.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DeuxFois, étudiant en informatique qui aime apprendre et créer. Vous y trouverez mon portfolio, mon CV, mon blog et de quoi me contacter. Bonne visite !" />
        <meta name="language" content="French"></meta>
      </Head>
      <header>
            <Navbar />
        </header>
      <main className="app">
          <Component {...pageProps} />   
      </main>
    </>
  );
}

export default App;


