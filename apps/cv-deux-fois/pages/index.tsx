import { lazy, Suspense } from 'react';
import  Intro  from './index/intro';

import { Fade } from "react-awesome-reveal";

const Techs = lazy (() => import('./index/techs'));
const Portfolio = lazy (() => import('./portfolio'));

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

export default function Index({techs, icons, projects}) {
    return (
    <>
        <Intro />
        <Suspense>
        {techs && <Techs techs={techs} icons={icons}/>}
        <Portfolio projects={projects} icons={icons}/>
        </Suspense>
    </>
    );
}