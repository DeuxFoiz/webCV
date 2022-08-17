import  Intro  from './index/intro';
import Portfolio from './portfolio';
import Techs from './index/techs';
import handleViewport from 'react-in-viewport';
import { forwardRef, useState } from 'react';
import Image from 'next/image';



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
    console.log("INDOEX");
    const Homeblock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        return (
            // <div ref={forwardedRef} style={{marginBottom: "700px", height:"fit-content"}}>
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
        return (
            <div  ref={forwardedRef} style={{marginTop:"700px"}}>
                <Blog />
            </div>
        );
    };
    const cvBlock = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;

        function loaded({numPages}) {
            console.log(numPages);
        }
        return (
            <div id='cv' className='chapter' style={{ marginTop:'100px',overflow:'hidden'}}>
            <h1 className="title bullet-bar">Curriculum Vitae</h1>
            <div className='cv' ref={forwardedRef} style={{minWidth:'400px',overflow:'hidden'}}>
                <Image src="/assets/img/cv2.webp" alt="cv" width={707} height={980} layout="responsive" style={{marginLeft:'50%', translate:'translate(-50%, 0)'}} />

            </div>
            </div>
        );
    };
  

    const ViewportPortfolio = handleViewport(Portfolioblock);
    const ViewportHome = handleViewport(Homeblock);
    const ViewportTmp = handleViewport(tmpBLock);
    const ViewportTmp2 = handleViewport(tmpBLock);
    const ViewportBlog = handleViewport(Blogblock);
    const ViewportCv = handleViewport(cvBlock);
    return (
    <>

        <ViewportHome onEnterViewport={() => {handleInSection('#navhome')}} onLeaveViewport={() => {handleInSection('#navportfolio')}}/>
        <ViewportPortfolio  EnterViewport={() => {handleInSection('#navportfolio')}}/>
        <ViewportTmp onEnterViewport={() => {handleInSection('#navportfolio')}} />

        <ViewportCv onEnterViewport={() => {handleInSection('#navcv')}}/>

        
        {/* <ViewportTmp2 /> */}
        <ViewportBlog onLeaveViewport={() => {handleInSection('#navcv')}} onEnterViewport={() => {handleInSection('#navblog')}}/>
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
