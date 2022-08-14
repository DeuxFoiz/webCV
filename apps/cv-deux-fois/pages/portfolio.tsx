import { useState } from 'react';
import Project from '../components/project-card';
import { useAuth0 } from "@auth0/auth0-react";
import EditProject from '../components/edit-project';
import { Fade } from "react-awesome-reveal";

export default function Portfolio(props : {
	  projects: any[];
	  icons: any[];
}) {	
	if (!props.projects || !props.icons)
		return <div className="chapter flex-column flex-center"> Loading... </div>;
	  
	const projectsByDate = props.projects.reduce((acc, project) => {
		const date = project.date;
		if (!acc[date]) acc[date] = [];
		acc[date].push(project);
		return acc;
	}, {});
	const dates = Object.keys(projectsByDate).reverse();
	
	return (
	<div className="chapter portfolio">
		<h1 className="title bullet-bar">Portfolio</h1>
		{dates.map((date, idate) => {
		return (
			<div key={idate}>
			<h2 className="subtitle antiflex flex-center" style={ { paddingTop:'0'}}> {date} </h2>
			<div className="flex-row flex-center container">
				<Fade triggerOnce cascade duration={250}>
				{projectsByDate[date].reverse().map((project, iproject) => {
				return (
					<div key={project.name} >
						<Project
							key={project._id}
							project={project}
							icons={props.icons}
						/>
					</div>
				);
			})}
			</Fade>			
			</div>
			</div>
		);
	})}
	
	</div>
	);
}