import { useState } from 'react';
import Project from '../components/project-card';
import { useAuth0 } from "@auth0/auth0-react";
import EditProject from '../components/edit-project';

export default function Portfolio(props : {
	  projects: any[];
	  icons: any[];
}) {
	const [selectedProject, setSelectedProject] = useState(null); 
    const { user, isAuthenticated, isLoading } = useAuth0();
	if (!props.projects || !props.icons || isLoading) {
		return <div className='chapter flex-column flex-center'>Loading...</div>;
	}
	const projectsByDate = props.projects.reduce((acc, project) => {
		const date = project.date;
		if (!acc[date]) acc[date] = [];
		acc[date].push(project);
		return acc;
	}, {});
	const dates = Object.keys(projectsByDate).reverse();
	
	
	return (
	<div className="chapter portfolio">
		<h1 className="big-title">Portfolio</h1>

		{dates.map((date, idate) => {
		return (
			<div key={idate}>
			<h2 className="title bullet-bar" style={ { paddingTop:'0'}}> {date} </h2>
			<div className="flex-row flex-center container">
				{projectsByDate[date].reverse().map((project, iproject) => {
				return (
					<div key={project.name} onClick={() => setSelectedProject(project)}>
						{/* <Project
						key={project._id}
						link={project.link}
						name={project.name}
						description={project.description}
						image={project.image}
						devicons={project.icons}
						/> */}
						<Project
							key={project._id}
							project={project}
							icons={props.icons}
						/>
						
					{isAuthenticated && selectedProject == project &&
					 <EditProject 
					 	project={project} 
						setProject={setSelectedProject}
						icons={props.icons}
					/>
					}
					</div>
				);
				})}
			</div>
			</div>
		);
		})}
	</div>
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