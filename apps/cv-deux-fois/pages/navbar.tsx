import { useState, useLayoutEffect, useRef } from 'react';
import SwitchDarkMode from './header/btn-darkMode';
import Welcome  from './header/welcome';
import MenuNav  from './header/menu-nav';

export default function Navbar(){
  const [isExpanded, setIsExpanded] = useState(false)
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, [isExpanded]);

    return (
      <>
        <div className={ isExpanded ? "welcome-menu expanding" : firstUpdate.current ? "welcome-menu closed" : "welcome-menu closing"}>
        < SwitchDarkMode/>
          <Welcome isExpanded={isExpanded} />
          
          <hr className="separator little-screen-hidden"></hr>

        </div>
        <div className='navigation-menu'>
          <div className="hamburger"
          onClick={() => {setIsExpanded(!isExpanded);}}>
            <div className={isExpanded ? "arrow-icon open" : "arrow-icon"}>
              <span className="left-bar" />
              <span className="right-bar" />
            </div>
          </div>
          <MenuNav />
          <div className={isExpanded ? "flex expanded" : "flex hidden"}>
            
          </div>
        </div>
      </>
    );
}