import  Intro  from './index/intro';
import Portfolio from './portfolio';
import Techs from './index/techs';
import handleViewport from 'react-in-viewport';
import { forwardRef, useState } from 'react';
import Navbar from './navbar';

const handleInSection = (section) => {
    const navbar = document.querySelector(section);
    navbar.classList.add('active');
}

const handleOutSection = (section) => {
    const navbar = document.querySelector(section);
    navbar.classList.remove('active');
}



export default function Index({techs, icons, projects}) {
    const Portfolioblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        const [isVisible, setIsVisible] = useState(false);
        if (inViewport && !isVisible) {
            setIsVisible(true);
        }
        return (
            <div ref={forwardedRef} style={{marginTop:"-300px", height:"fit-content"}}>
                {isVisible ? <Portfolio projects={projects} icons={icons} /> : null}
            </div>
        );
    };
    const Homeblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        return (
            <div ref={forwardedRef}>
                <Intro />
            </div>
        );
    };

  

    const ViewportPortfolio = handleViewport(Portfolioblock, { rootMargin: '-150px 0px' });
    const ViewportHome = handleViewport(Homeblock);
    return (
    <>
        <header>
            <Navbar />
        </header>
        <ViewportHome onEnterViewport={() => {handleInSection('#home')}} onLeaveViewport={() => {handleOutSection('#home')}}/>
        {techs && <Techs techs={techs} icons={icons}/>}
        <ViewportPortfolio  onEnterViewport={() => {handleInSection('#portfolio')}} onLeaveViewport={() => {handleOutSection('#portfolio')}} />
        {/* <Portfolio projects={projects} icons={icons}/> */}
    </>
    );
}




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
