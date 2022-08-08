import { useState } from 'react';
import SwitchDarkMode from './header/btn-darkMode';
import Welcome  from './header/welcome';
import MenuNav  from './header/menu-nav';

export default function Navbar(){
  const [isExpanded, setIsExpanded] = useState(false)

    return (
      <div className={ 
        isExpanded ? "navigation-menu expanded" : "navigation-menu"
      }>
        <div className="hamburger"
          onClick={() => {
          setIsExpanded(!isExpanded);}}
        >
          <div className={isExpanded ? "arrow-icon open" : "arrow-icon"}>
            <span className="left-bar"></span>
            <span className="right-bar"></span>
          </div>
        </div>
        
        <Welcome isExpanded={isExpanded} />
        <hr className="separator little-screen-hidden"></hr>
        <MenuNav/>
        <hr className="separator little-screen-hidden"></hr>

        <div className={isExpanded ? "flex expanded" : "flex hidden"}>
          < SwitchDarkMode/>
        </div>
      </div>
    );
}