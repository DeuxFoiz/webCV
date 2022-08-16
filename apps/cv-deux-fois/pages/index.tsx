import  Intro  from './index/intro';
import Portfolio from './portfolio';
import Techs from './index/techs';
import handleViewport from 'react-in-viewport';
import { forwardRef, useState } from 'react';
import Navbar from './navbar';
import Blog from './blog';
const handleInSection = (section) => {
    const link = document.querySelectorAll('.link');
    link.forEach(item => { item.classList.remove('active'); });
    const navbar = document.querySelector(section);
    navbar.classList.add('active');

}

// const handleOutSection = (section) => {
//     const link = document.querySelectorAll(section);
//     link.forEach(item => { item.classList.remove('active'); });
//     const navbar = document.querySelector(section);
//     navbar.classList.remove('active');
// }



export default function Index({techs, icons, projects}) {
    const Homeblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        return (
            // <div ref={forwardedRef} style={{marginBottom: "700px", height:"fit-content"}}>
            <div ref={forwardedRef} style={{height:"fit-content"}}>   
                <Intro />
                {techs && <Techs techs={techs} icons={icons}/>}
            </div>
        );
    };
    const tmpBLock = (props: { inViewport: boolean, forwardedRef: any }) => {
        return (
            <div ref={props.forwardedRef} style={{position:"relative", top:"800px", height:"1480px"}} />
        );
    };
    const Portfolioblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        const [isVisible, setIsVisible] = useState(false);
        if (inViewport && !isVisible) {
            setIsVisible(true);
        }
        return (
            <div ref={forwardedRef} style={{marginTop:"-150px",height:"fit-content"}}>
                {isVisible ? <Portfolio projects={projects} icons={icons} /> : null}
            </div>
        );
    };
    const Blogblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        const [isVisible, setIsVisible] = useState(false);
        if (inViewport && !isVisible) {
            setIsVisible(true);
        }
        return (
            <div ref={forwardedRef} style={{position:"relative", top:"700px"}}>
                <Blog />
            </div>
        );
    };

  

    const ViewportPortfolio = handleViewport(Portfolioblock);
    const ViewportHome = handleViewport(Homeblock);
    const ViewportTmp = handleViewport(tmpBLock);
    const ViewportTmp2 = handleViewport(tmpBLock);
    const ViewportBlog = handleViewport(Blogblock);
    return (
    <>
        <header>
            <Navbar />
        </header>
        <ViewportHome onEnterViewport={() => {handleInSection('#home')}} onLeaveViewport={() => {handleInSection('#portfolio')}}/>
        {/* <ViewportTmp onEnterViewport={() => {handleInSection('#portfolio')}} /> */}
        <ViewportPortfolio  EnterViewport={() => {handleInSection('#portfolio')}}/>
        {/* <ViewportTmp2 /> */}
        <ViewportBlog onLeaveViewport={() => {handleInSection('#portfolio')}} onEnterViewport={() => {handleInSection('#blog')}}/>
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
