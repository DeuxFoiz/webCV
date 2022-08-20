import Devicon from '../../components/devicon';


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
      <div className="flex-grid flex-center">
        {data.map(({ tech, iconss }, index) => (
          <div key={tech.value} className="grid-column">
              <h2 className="title-overview"> {tech.value} </h2>
              <p className="text-desc" style={{marginBottom:'20px'}}> {tech.text} </p>
            
            {iconss.map((icon, index) => (
              <div key={icon._id} style={{marginLeft:'30px', marginTop:'10px'}}>
                <Devicon
                  img_link={icon.img_link}
                  border_color={icon.border_color}
                  name={icon.name}
                />
              </div>
            ))}
          </div>
        ))}
        </div>
    </div>
  );
}
