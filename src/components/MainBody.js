import React from 'react';
import '../style/MainBody.css'
const MainBody = ({children}) => {
  return (
    <div className="container">
      <div className="main-body">{children}</div>
    </div>
    
  )
}

export default MainBody;
