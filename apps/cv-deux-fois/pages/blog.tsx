import { createRef, useState,useRef } from "react";
export default function Blog() {

    return (
        <iframe  id='blog' src="https://deuxfois.github.io/quartz/"


        // style={{"width": "100vw", "height": "100vh", "position": "absolute", "top": "0", "left": "0", "border": "none"}}
        // style={{"width": "100%", "height": "100vh", "border": "none", marginTop:'-400px',zIndex:'1',overflowY:'hidden'}}
        // style={{"width": "100%", "height": height, "border": "none", marginTop:'-400px',zIndex:'1',overflowY:'hidden'}}
        title="blog"
        frameBorder="0"
        >
        </iframe>

    );
    }