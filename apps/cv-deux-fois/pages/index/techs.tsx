import {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Devicon from '../../components/devicon';
import EditIcon from "../../components/edit-icon";

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
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [selectedIcon, setSelectedIcon] = useState(null);
  console.log(selectedIcon);
  if (!props.techs || !props.icons || isLoading) {
    return <div>Loading...</div>;
  }
  
  const data = props.techs.map((tech) => {
    return {
      value: tech.value,
      text: tech.text,
      icons: props.icons.filter((icon) => icon.category === tech.value),
    };
  });

  return (
    <>
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
      <div className="chapter">
        <h1 className="title bullet-bar">Technologies</h1>
		{/* {user ? <AddIcon icons={props.icons} setIcons={props.setIcons} /> : null} */}
        <div className="flex-grid flex-center" style={{marginBottom:'100px'}}>
          {data.map(({ value, text, icons }, index) => (
            <div className="grid-column flex-column" key={index}>
              <h2 className="title-overview"> {value} </h2>
              <p className="text-desc"> {text} </p>
              {icons.map((icon, index) => (
                <div className="flex-row" key={index}>
                <div className="flex-row" key={index} onClick={() => setSelectedIcon(icon)}>
                  <Devicon
                    img_link={icon.img_link}
                    border_color={icon.border_color}
                    name={icon.name}
                  />
                  {/* {user && <input type="button" value="×" onClick={() => handleClick(icon, totalIcons)} />} */}
                </div>
                  {selectedIcon === icon ? (
                      <EditIcon icon={icon} setIcon={setSelectedIcon}/>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
