import React from "react";
import '../style/Header.css'
import Navigation from "../navigation/Navigation.js";
export const Header = () => {
  return (
    <>
    <div className="header">
           <p>WhoIAm/SouravSinghRawat/personal-portfolio</p> 
           <div> <Navigation  /></div>
        </div>
        </>
  )
}

export default Header;
