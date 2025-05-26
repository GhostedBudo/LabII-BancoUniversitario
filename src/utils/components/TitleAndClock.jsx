import React from 'react';
import Clock from './Clock'; // Assuming Clock component is in the same directory or correctly imported

const TitleAndClock = ({ title }) => {
  // Define styles as a JavaScript object
  const titleBarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5em',
    fontSize: '1em',
    width: '100%',
  };

  const titleTextStyles = {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1.2em',
  };

  const clockStyles = {
    color: 'black',
    opacity: '0.6',
    fontWeight: 'bold',
  };

  return (
    // Apply the style objects directly to the elements
    <div style={titleBarStyles}>
        <span style={titleTextStyles}>{title}</span>
        {/* The Clock component's root div needs the clockStyles */}
        <div style={clockStyles}>
            <Clock />
        </div>
    </div>
  );
};

export default TitleAndClock;