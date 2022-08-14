import {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./auth/login";
import Devicon from "../components/devicon";
import EditIcon from "../components/edit-icon";
import Techs from "./index/techs";
import Portfolio from "./portfolio";

export default function Dashboard (props: {techs, icons, projects}) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [editIcon, setEditIcon] = useState(null);
  const [icons, setIcons] = useState(props.icons);
  

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
    <>
    <div className="chapter flex-column flex-center">
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
     
          <h2 className="title"> All Icons</h2>
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
    </div>
            {props.techs && <Techs techs={props.techs} icons={icons}/>}
            <Portfolio projects={props.projects} icons={icons}/>
    </>
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