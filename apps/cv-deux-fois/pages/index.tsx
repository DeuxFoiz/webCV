import  Intro  from './index/intro';
import Portfolio from './portfolio';
import Techs from './index/techs';
import handleViewport from 'react-in-viewport';
import { useState } from 'react';
import Image from 'next/image';
import Blog from './blog';

const handleInSection = (section) => {
    const link = document.querySelectorAll('.link');
    link.forEach(item => { item.classList.remove('active'); });
    const navbar = document.querySelector(section);
    navbar.classList.add('active');

}


export default function Index({techs, icons, projects}) {
    const Homeblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        return (
            <div id='home' ref={forwardedRef} style={{height:"fit-content"}}>   
                <Intro />
                {techs && <Techs techs={techs} icons={icons}/>}
            </div>
        );
    };
    const tmpBLock = (props: { inViewport: boolean, forwardedRef: any }) => {
        return (
            <div ref={props.forwardedRef} style={{position:"relative", top:"-700px"}} />
        );
    };
    const Portfolioblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        const [isVisible, setIsVisible] = useState(false);
        if (inViewport && !isVisible) {
            setIsVisible(true);
        }
        return (
            <div id='portfolio' ref={forwardedRef} style={{marginTop:"-150px",height:"fit-content", minHeight:'1000px'}}>
                <Portfolio projects={projects} icons={icons} isVisible={isVisible}/>
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
            <div  ref={forwardedRef} style={{marginTop:"700px"}}>
                {isVisible ? <Blog /> : <div id='blog'/>}
            </div>
        );
    };
    const cvBlock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        return (
            <div id='cv' className='chapter'>
            <h1 className="title bullet-bar">Curriculum Vitae</h1>
            <div className='cv' ref={forwardedRef} style={{minWidth:'360px', maxWidth:'700px', width:'95%',overflow:'hidden'}}>
                <Image src="/assets/img/cv2.webp" alt="cv" width={707} height={980} layout="responsive" style={{marginLeft:'50%', translate:'translate(-50%, 0)'}} />
            </div>
            </div>
        );
    };
  

    const ViewportPortfolio = handleViewport(Portfolioblock);
    const ViewportHome = handleViewport(Homeblock);
    const ViewportTmp = handleViewport(tmpBLock);
    const ViewportBlog = handleViewport(Blogblock);
    const ViewportCv = handleViewport(cvBlock);
    return (
    <>

        <ViewportHome onEnterViewport={() => {handleInSection('#navhome')}} onLeaveViewport={() => {handleInSection('#navportfolio')}}/>
        <ViewportPortfolio  EnterViewport={() => {handleInSection('#navportfolio')}}/>
        <ViewportTmp onEnterViewport={() => {handleInSection('#navportfolio')}} />

        <ViewportCv onEnterViewport={() => {handleInSection('#navcv')}}/>
        
        <ViewportBlog onLeaveViewport={() => {handleInSection('#navcv')}} onEnterViewport={() => {handleInSection('#navblog')}}/>
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
