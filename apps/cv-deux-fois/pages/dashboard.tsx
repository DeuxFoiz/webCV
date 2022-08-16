import {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./auth/login";
import Devicon from "../components/devicon";
import EditIcon from "../components/edit-icon";
import EditTech from "../components/edit-techs"; 
import Project from '../components/project-card';
import EditProject from '../components/edit-project';
export default function Dashboard (props: {techs, icons, projects}) {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const [icons, setIcons] = useState(props.icons);
  const [editIcon, setEditIcon] = useState(null);
  const [techs, setTechs] = useState(props.techs);
  const [editTech, setEditTech] = useState(null);
  const [projects, setProjects] = useState(props.projects);
	const [editProject, setEditProject] = useState(null);
  const isAuthenticated = true;

	const projectsByDate = props.projects.reduce((acc, project) => {
		const date = project.date;
		if (!acc[date]) acc[date] = [];
		acc[date].push(project);
		return acc;
	}, {});
	const dates = Object.keys(projectsByDate).reverse();

  return (
    isAuthenticated ? (
    <div className="chapter">
            <style>
        {`
			.flex-grid {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: start;
				margin-top: 50px;
			}
			.text-desc {
					max-width: 200px;
					font-size: 0.875rem;
					text-align: justify;
					margin-right: 50px;
			}
			.grid-column {
					margin-bottom: 50px
			}
			@media (max-width: 500px) {
					.text-desc {
							margin-left:30px;
							margin-right:30px;
					}
				}

		`}
      </style>
        <div className="flex-row flex-center">
          {icons.map((icon, index) => (
            <div className="flex-row" key={index}>
            <div className="flex-column" onClick={() => setEditIcon(icon)}>
                <Devicon 
                    img_link={icon.img_link}
                    border_color={icon.border_color}
                    name={icon.name}
                />
            </div>
            {editIcon === icon ? (
                <EditIcon editIcon={icon} setEditIcon={setEditIcon} icons={icons} setIcons={setIcons} />
            ) : null}
            </div>
          ))}
        </div>
      
        <div className="flex-grid flex-center">
          {props.techs.map((tech, index) => (
            <>
              <div key={tech.value} onClick={() => setEditTech(tech)}>
                <h2 className="title-overview"> {tech.value} </h2>
                <p className="text-desc"> {tech.text} </p>
              </div>
              <>
                {editTech === tech ? ( 
                <EditTech
                editTech={editTech}
                setEditTech={setEditTech}
                techs={techs}
                setTechs={setTechs}
              />
                ) : null}
              </>
            </>
          ))}
        </div>
        {dates.map((date, idate) => {
		return (
			<div key={idate}>
			<h2 className="subtitle antiflex flex-center" style={ { paddingTop:'0'}}> {date} </h2>
			<div className="flex-row flex-center container">
				{projectsByDate[date].reverse().map((project, iproject) => {
				return (
					<div  key={project.name}>
					<div onClick={() => setEditProject(project)}>
						<Project
							key={project._id}
							project={project}
							icons={props.icons}
						/>
					</div>
					<>
					{editProject === project &&
						<EditProject
							key={project._id}
							icons={props.icons}
							project={project}
							setProject={setEditProject}
							projects={projects}
							setProjects={setProjects}
						/>}
					</>
					</div>

				);
          })}		
          </div>
          </div>
        );
      })}
    </div>
    ) : (
      <Login />
    )
  );
}




export async function getServerSideProps() {
    // const port = process.env.PORT || 4200;
    // const techs = await fetch(`http://localhost:${port}/api/techs`).then(res => res.json());
    // const icons = await fetch(`http://localhost:${port}/api/icons`).then(res => res.json());
    // const projects = await fetch(`http://localhost:${port}/api/projects`).then((res) => res.json());

    const techs = await fetch(`https://${process.env.VERCEL_URL}/api/techs`).then(res => res.json());
    const icons = await fetch(`https://${process.env.VERCEL_URL}/api/icons`).then(res => res.json());
    const projects = await fetch(`https://${process.env.VERCEL_URL}/api/projects`).then((res) => res.json());

    return {
      props: {
        techs: techs.data,
        icons: icons.data,
        projects: projects.data
    }
    }

}