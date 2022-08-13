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
    setIcon: (icon: { _id: string; name: string; border_color: string; img_link: string; category: string; }) => void;
}) {
    const [icon, setIcon] = useState(props.icon);

    return (
    <div className="glass-overlay">
        <div className="edit-container flex-column flex-center center-y">
            <button className="close" onClick={() => props.setIcon(null)}>×</button>
            <Devicon
                img_link={icon.img_link}
                border_color={icon.border_color}
                name={icon.name}
            />
            <form className="flex-column flex-center" onSubmit={(e) => {e.preventDefault(); submitIcon(icon, setIcon); }}>
                <input className="input" type="text" value={icon.img_link} onChange={(e) => {
                    e.preventDefault();
                    icon.img_link = e.target.value;
                    setIcon({...icon, img_link: e.target.value});
                }}/>
                <input className="input" type="text" value={icon.name} onChange={(e) => {
                    e.preventDefault();
                    icon.name = e.target.value;
                    setIcon({...icon, name: e.target.value});
                }}/>
                <input className="input" type="text" value={icon.border_color} onChange={(e) => {
                    e.preventDefault();
                    icon.border_color = e.target.value;
                    setIcon({...icon, border_color: e.target.value});
                }}/>
                <input className="input" type="text" value={icon.category} onChange={(e) => {
                    e.preventDefault();
                    icon.category = e.target.value;
                    setIcon({...icon, category: e.target.value});
                }}/>
                <button className="submit" type="submit" value="Submit">Submit</button>  
            </form>
        </div>
    </div>
    )
}
