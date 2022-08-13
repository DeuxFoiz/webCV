import { useState } from "react";
import Devicon from "./devicon";
import Project from "./project-card";
import TextareaAutosize from 'react-textarea-autosize';
type Project = {
    _id: string;
    name: string;
    description: string;
    image: string;
    link: string;
    icons: string[];
}
type Icon = {
    _id: string;
    name: string;
    border_color: string;
    img_link: string;
    category: string;
};



export default function EditProject(props : {
    icons: Icon[];
    project: Project,
    setProject: (project: Project) => void;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}) {
    const [project, setProject] = useState(props.project);

    return (
        <div className="glass-overlay">
            <div className="edit-container">
                <button className="close" onClick={() => props.setProject(null)}>×</button>
                <div className="top-spaced antiflex" style={{"margin": "4em"}}>
                    <Project project={project} icons={props.icons}/>
                    <form className="flex-column flex-center" onSubmit={(e) => {
                        e.preventDefault(); 
                        submitProject(project, props);
                    }}>
                        <input className="input" type="text" value={project.image} onChange={(e) => {
                            e.preventDefault();
                            project.image = e.target.value;
                            setProject({...project, image: e.target.value});
                        }
                        }/>
                        <input className="input" type="text" value={project.name} onChange={(e) => {
                            e.preventDefault();
                            project.name = e.target.value;
                            setProject({...project, name: e.target.value});
                        }
                        }/>
                        {project.icons.map((icon, i) => (
                            <input key={i} className="input" type="text" value={icon} onChange={(e) => {
                                e.preventDefault();
                                project.icons[i] = e.target.value;
                                setProject({...project, icons: project.icons});
                            }}/>
                        ))}
                        <button value="Submit" onClick={(e) => {
                            e.preventDefault();  
                            project.icons.push("");
                            setProject({...project, icons: project.icons});
                        }}>add icon</button>

                        <TextareaAutosize className="input textaera" value={project.description}  style={{width:'80vw', maxWidth:'500px'}}
                        onChange={(e) => {
                            e.preventDefault();
                            project.description = e.target.value;
                            setProject({...project, description: e.target.value});
                        }
                        }/>
                    <button className="submit" type="submit">Submit</button> 
                </form>
                </div>
            </div>
        </div>
    );
}



const submitProject = (project, props) => {
    fetch("/api/projects", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    })
        .then((res) => res.json())
        .then(() => {
            props.setProjects(props.projects.map((p) => p._id === project._id ? project : p));
        }
        );
};
