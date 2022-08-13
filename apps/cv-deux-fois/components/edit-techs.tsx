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
    setTech: (tech: { _id: string; value: string; text: string; }) => void;
}) {
    const [tech, setTech] = useState(props.tech);

    return (
    <div className="glass-overlay" >
        <div className="edit-container flex-column flex-center center-y">
        <button className="close" onClick={() => props.setTech(null)}>×</button>
            <h2 className="title-overview"> {tech.value} </h2>
              <p className="text-desc"> {tech.text} </p>
            <form className="flex-column flex-center" onSubmit={(e) => {e.preventDefault(); submitTech(tech, setTech); }}>
                <input type="text" value={tech.value} onChange={(e) => {
                    e.preventDefault();
                    tech.value = e.target.value;
                    setTech({...tech, value: e.target.value});
                }}/>
                <TextareaAutosize value={tech.text}  className="input textaera"  style={{width:'80vw', maxWidth:'500px'}} onChange={(e) => {
                    e.preventDefault();
                    tech.text = e.target.value;
                    submitTech(tech, setTech);
                }}/>
                <button className="submit" type="submit" value="Submit" onClick={() => setTech(tech)}>Submit</button>
            </form>
        </div>
    </div>

    )
}