import  Intro  from './index/intro';
import Portfolio from './portfolio';
import Techs from './index/techs';
import handleViewport from 'react-in-viewport';
import { forwardRef } from 'react';

export async function getServerSideProps() {
    const port = process.env.PORT || 4200;
    const techs = await fetch(`http://localhost:${port}/api/techs`).then(res => res.json());
    const icons = await fetch(`http://localhost:${port}/api/icons`).then(res => res.json());
    const projects = await fetch(`http://localhost:${port}/api/projects`).then((res) => res.json());
    
    // const techs = await fetch(`https://${process.env.VERCEL_URL}/api/techs`).then(res => res.json());
    // const icons = await fetch(`https://${process.env.VERCEL_URL}/api/icons`).then(res => res.json());
    // const projects = await fetch(`https://${process.env.VERCEL_URL}/api/projects`).then((res) => res.json());

    return {
        props: {
            techs: techs.data,
            icons: icons.data,
            projects: projects.data
        }
    }

}

export default function Index({techs, icons, projects}) {
    const Block = (props: { inViewport: boolean, forwardedRef: any }) => {
        const { inViewport, forwardedRef } = props;
        const color = inViewport ? '#217ac0' : '#ff9800';
        const text = inViewport ? 'In viewport' : 'Not in viewport';
        return (
            <div ref={forwardedRef} style={{backgroundColor: color, marginTop:"-150px", height:"fit-content"}}>
                {inViewport ? <Portfolio projects={projects} icons={icons} /> : null}
            </div>
        );
    };
  

    const ViewportBlock = handleViewport(Block);
    return (
    <>
        <Intro />
        {techs && <Techs techs={techs} icons={icons}/>}
        <ViewportBlock onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />
        {/* <Portfolio projects={projects} icons={icons}/> */}
    </>
    );
}



