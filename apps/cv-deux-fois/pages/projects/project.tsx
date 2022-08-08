import Image from 'next/image';
import { useState } from "react";
import Devicon from "../utils/devicon";

export default function Project(props : {
        name: string;
        description: string;
        image: string;
        link: string;
        devicons : Array <{
            name: string;
            border_color: string;
            img_link: string;
        }>;
    }) {   
    return (
        <div className="antiflex flex-center project-item shadow-container"> 
            <div className="flex-row flex-center  "> 
                <div className="flex-column flex-center">
                    <h3 className="subtitle" style={ { marginTop:'1rem', marginLeft:'0'}}>{props.name}</h3>
                    <div className="flex-row flex-center" >
                        {            
                        props.devicons ? props.devicons.map((devicon, index) => {
                            return (devicon === null || devicon === undefined ? null : 
                            <div key={index} className="flex-column">
                                <Devicon
                                    img_link={devicon.img_link}
                                    border_color={devicon.border_color}
                                    name={devicon.name}
                                />
                            </div>)
                        }) : null
                        }
                    </div>
                </div>
            </div>
            <div className="antiflex flex-center " style={ { marginTop:'20px'}}>  
                <div className="text"  style={{maxWidth:'100%', margin:"1rem"}}
                dangerouslySetInnerHTML={{ __html: props.description }}>
                </div>
            </div>
        </div>

    );

}