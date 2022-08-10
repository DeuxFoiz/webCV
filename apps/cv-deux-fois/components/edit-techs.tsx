import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
const submitTech = (tech, setTech) => {
    // put to /api/techs
    fetch("/api/techs", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tech),
    })
        .then((res) => res.json())
        .then((res) => {
            setTech(null);
        });
};

export default function EditTech(props : {
    tech: {
        _id: string;
        value: string;
        text: string;
    },
    setTech: any,
}) {
    const [tech, setTech] = useState(props.tech);
    if (tech === null) return null;
    return (
    <div className="glass-overlay">
        <div className="edit-container flex-column flex-center center-y">
        <button className="close" onClick={() => setTech(null)}>×</button>
            <h2 className="title-overview"> {props.tech.value} </h2>
              <p className="text-desc"> {props.tech.text} </p>
            <form className="flex-column flex-center" onSubmit={(e) => {e.preventDefault(); submitTech(tech, props.setTech); }}>
                <input type="text" value={tech.value} onChange={(e) => {
                    e.preventDefault();
                    props.tech.value = e.target.value;
                    setTech({...props.tech, value: e.target.value});
                }}/>
                <TextareaAutosize value={tech.text}  className="input textaera"  style={{width:'80vw', maxWidth:'500px'}} onChange={(e) => {
                    e.preventDefault();
                    props.tech.text = tech.text;
                    submitTech(tech, props.setTech);
                }}/>
                <button className="save" onClick={() => props.setTech(tech)}>Save</button>
            </form>
        </div>
    </div>

    )
}