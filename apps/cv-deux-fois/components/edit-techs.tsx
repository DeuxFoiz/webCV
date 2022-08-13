import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
type tech = {
    _id: string;
    value: string;
    text: string;
}

export default function EditTech(props : {
    editTech: tech,
    setEditTech: (tech: tech) => void;
    techs: tech[];
    setTechs: (techs: tech[]) => void;
}) {
    const [tech, setTech] = useState(props.editTech);

    return (
    <div className="glass-overlay" >
        <div className="edit-container flex-column flex-center center-y">
        <button className="close" onClick={() => props.setEditTech(null)}>×</button>
            <h2 className="title-overview"> {tech.value} </h2>
              <p className="text-desc"> {tech.text} </p>
            <form className="flex-column flex-center" onSubmit={(e) => {
                e.preventDefault(); 
                submitTech(tech, props);

            }}>
                <input type="text" value={tech.value} onChange={(e) => {
                    e.preventDefault();
                    tech.value = e.target.value;
                    setTech({...tech, value: e.target.value});
                }}/>
                <TextareaAutosize value={tech.text}  className="input textaera"  style={{width:'80vw', maxWidth:'500px'}} onChange={(e) => {
                    e.preventDefault();
                    tech.text = e.target.value;
                    setTech({...tech, text: e.target.value});
                }}/>
                <button className="submit" type="submit">Submit</button>
            </form>
        </div>
    </div>

    )
}


const submitTech = (tech, props) => {
    // put to /api/techs
    fetch("/api/techs", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tech),
    })
        .then((res) => res.json())
        .then(() => {
            props.setTechs(props.techs.map((t) => (t._id === tech._id ? tech : t)));
        });
};