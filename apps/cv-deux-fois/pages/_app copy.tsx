import { Auth0Provider } from "@auth0/auth0-react";
import { AppProps } from 'next/app';
import Head from 'next/head';
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
    <Auth0Provider
    domain="dev-s4knuldn.us.auth0.com"
    clientId="qUbMSzjUSqD7cXXefbdHQRlspYe9nMxT"
    // redirectUri={'http://localhost:4200/'}
    redirectUri={'https://web-cv-nine.vercel.app/'}
    >
      <Head>
        <title>DeuxFois</title>
        <link rel="shortcut icon" href="/favico.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DeuxFois, étudiant en informatique qui aime apprendre et créer. Vous y trouverez mon portfolio, mon CV, mon blog et de quoi me contacter. Bonne visite !" />
        <meta name="language" content="French"></meta>
      </Head>
      <main className="app">
          <Component {...pageProps} />   
      </main>
    </Auth0Provider>
  );
}

export default App;
