import Image from 'next/image';
import { useState } from "react";
import Devicon from "./devicon";

export default function Project(props : {
    project: {
        _id: string;
        name: string;
        description: string;
        image: string;
        link: string;
        icons: string[];
    },
    icons: Array<{
        name: string;
        border_color: string;
        img_link: string;
    }>;
}) {  
    
    const devicons = props.icons.filter((icon) => { return props.project.icons.includes(icon.name) });
    return (
        <div className="flex-column project-item shadow-container" style={{ alignItems: 'center', justifyContent: 'start' }}>
            <div style={{width:'375px', height:'250px'}}>
                <Image src={props.project.image} width={375} height={250} alt={props.project.name} style={{borderRadius:'1%'}}/>
            </div>
            <h3 className="subtitle" style={ { marginTop:'1rem', marginLeft:'0'}}>{props.project.name}</h3>
            <div className="flex-row flex-center" >
                {            
                devicons.map((devicon, index) => {
                    return (devicon === null || devicon === undefined ? null : 
                    <div key={index} className="flex-column">
                        <Devicon
                            img_link={devicon.img_link}
                            border_color={devicon.border_color}
                            name={devicon.name}
                        />
                    </div>)
                })}
            </div>
                <div className="text"  style={{maxWidth:'100%', margin:"1rem"}}
                dangerouslySetInnerHTML={{ __html: props.project.description }}>
                </div>
        </div>

    );

}
