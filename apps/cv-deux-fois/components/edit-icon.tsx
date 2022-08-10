import { useState } from "react";
import Devicon from "./devicon";
const submitIcon = (icon, setIcon) => {
        // post to /api/icons
        fetch("/api/icons", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(icon),
        })
            .then((res) => res.json())
            .then((res) => {
                setIcon(null);
            }
            );
            
};

export default function EditIcon(props : {
    icon: {
        _id: string;
        name: string;
        border_color: string;
        img_link: string;
        category: string;
    },
    setIcon: any,
}) {
    const [icon, setIcon] = useState(props.icon);
    return (
        <div className="edit-container flex-column flex-center">
            <button className="close" onClick={() => props.setIcon(null)}>×</button>
            <Devicon
                img_link={props.icon.img_link}
                border_color={props.icon.border_color}
                name={props.icon.name}
            />
            <form className="flex-column flex-center" onSubmit={(e) => {e.preventDefault(); submitIcon(icon, props.setIcon); }}>
                <input className="input" type="text" value={props.icon.img_link} onChange={(e) => {
                    e.preventDefault();
                    props.icon.img_link = e.target.value;
                    setIcon({...props.icon, img_link: e.target.value});
                }}/>
                <input className="input" type="text" value={props.icon.name} onChange={(e) => {
                    e.preventDefault();
                    props.icon.name = e.target.value;
                   setIcon({...props.icon, name: e.target.value});
                }}/>
                <input className="input" type="text" value={props.icon.border_color} onChange={(e) => {
                    e.preventDefault();
                    props.icon.border_color = e.target.value;
                    setIcon({...props.icon, border_color: e.target.value});
                }}/>
                <input className="input" type="text" value={props.icon.category} onChange={(e) => {
                    e.preventDefault();
                    props.icon.category = e.target.value;
                    setIcon({...props.icon, category: e.target.value});
                }}/>
                <button className="submit" type="submit" value="Submit">Submit</button>  
            </form>
        </div>
    )
}
