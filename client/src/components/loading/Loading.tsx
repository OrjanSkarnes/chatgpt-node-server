import React, { ReactElement, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.css';

function Loading(): ReactElement {
    const [dotCount, setDotCount] = useState(1);

    setTimeout(() => {
      setDotCount((dotCount % 3) + 1);
    }, 500);
  
    return (
      <div className='loading'>
        {'.'.repeat(dotCount)}
      </div>
    );
}

export default Loading;
