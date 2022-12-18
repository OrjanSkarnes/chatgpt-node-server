import React, { useState, FC } from 'react';
import './SideBar.css';

interface SideBarProps {
  // Define the props for the SideBar component here
    clearThread: () => void;
}

const SideBar: FC<SideBarProps> = ({ clearThread }) => {
  // use the props here
  return (
    <div className='side-bar'>
      <nav>
        {/* Side bar content goes here */}
        <button onClick={clearThread} className="side-bar-button reset-button button">Reset thread</button>
      </nav>
    </div>
  );
};

export default SideBar;
