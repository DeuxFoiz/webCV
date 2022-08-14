import {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Devicon from '../../components/devicon';
import EditIcon from "../../components/edit-icon";
import EditTech from "../../components/edit-techs";
import { Fade } from "react-awesome-reveal";
const handleClick = (icon, icons) => {
  const response = fetch('/api/icons', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(icon._id),
  }).then((res) => res.json());
  return { response };
};


export default function Techs(props: {
  techs: any[];
  icons: any[];
}) {
  if (!props.techs || !props.icons)
    return <div className="chapter flex-column flex-center"> Loading... </div>;

  const data = props.techs.map((tech) => {
    return {
      tech: tech,
      iconss: props.icons.filter((icon) => icon.category === tech.value),
    };
  });

  return (
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
      <h1 className="title bullet-bar">Technologies</h1>
      <div className="flex-grid flex-center" style={{marginBottom:'100px'}}>
        {data.map(({ tech, iconss }, index) => (
          <div key={tech.value}>
            <Fade triggerOnce delay={index*100} direction='up'>
              <h2 className="title-overview"> {tech.value} </h2>
              <p className="text-desc"> {tech.text} </p>
            
            {iconss.map((icon, index) => (
              <div key={icon._id}>
                <Devicon
                  img_link={icon.img_link}
                  border_color={icon.border_color}
                  name={icon.name}
                />
              </div>
            ))}
            </Fade>
          </div>
        ))}
        </div>
    </div>
  );
}
