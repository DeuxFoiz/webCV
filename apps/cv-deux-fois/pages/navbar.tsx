import { useState, useLayoutEffect, useRef } from 'react';
import SwitchDarkMode from './header/btn-darkMode';
import Welcome  from './header/welcome';
import MenuNav  from './header/menu-nav';

export default function Navbar(){
  const [isExpanded, setIsExpanded] = useState(false)
  const [firstUpdate, setFirstUpdate] = useState(true)

    return (
      <>
          <div className={isExpanded ? 'opened' : 'closed'}>
            <SwitchDarkMode/>
          </div>
        <div className={ isExpanded ? "welcome-menu expanding" : firstUpdate ? "welcome-menu closed" : "welcome-menu closing"}>
          <Welcome isExpanded={isExpanded} />
          
          <hr className="separator little-screen-hidden"></hr>

        </div>
        <div className='navigation-menu'>
          <div className="hamburger"
          onClick={() => {setIsExpanded(!isExpanded); firstUpdate && setFirstUpdate(false)}}>
            <div className={isExpanded ? "arrow-icon open" : "arrow-icon"}>
              <span className="left-bar" />
              <span className="right-bar" />
            </div>
          </div>
          <MenuNav />
          <hr className="separator little-screen-hidden"></hr>

          <div className={isExpanded ? "flex expanded" : "flex hidden"}>
            
          </div>
        </div>
      </>
    );
}