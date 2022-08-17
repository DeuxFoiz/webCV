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
import Navbar from './navbar';
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
      <header>
            <Navbar />
        </header>
      <main className="app">
          <Component {...pageProps} />   
      </main>
    </Auth0Provider>
  );
}

export default App;


export async function getServerSideProps() {
  // const port = process.env.PORT || 4200;
  // const techs = await fetch(`http://localhost:${port}/api/techs`).then(res => res.json());
  // const icons = await fetch(`http://localhost:${port}/api/icons`).then(res => res.json());
  // const projects = await fetch(`http://localhost:${port}/api/projects`).then((res) => res.json());
  
  const techs = await fetch(`https://${process.env.VERCEL_URL}/api/techs`).then(res => res.json());
  const icons = await fetch(`https://${process.env.VERCEL_URL}/api/icons`).then(res => res.json());
  const projects = await fetch(`https://${process.env.VERCEL_URL}/api/projects`).then((res) => res.json());

  return {
      props: {
          techs: techs.data,
          icons: icons.data,
          projects: projects.data
      }
  }

}
