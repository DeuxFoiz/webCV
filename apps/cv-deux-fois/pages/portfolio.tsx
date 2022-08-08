import { useState } from 'react';
import Project from '../components/project';

export default function Portfolio(props : {
	  projects: any[];
	  icons: any[];
}) {
	if (!props.projects || !props.icons) {
		return <div>Loading...</div>;
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
					<div key={project.name}>
						<Project
						key={project._id}
						link={project.link}
						name={project.name}
						description={project.description}
						image={project.image}
						devicons={project.icons}
						/>
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