
import React, { useState, useEffect } from 'react';
import './app.css'

const words = ['Streaming Data', 'Real-time Insights', 'Live Events'];

const StreamingHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      <h1>Loved by developers.</h1>
      <h1>
        Built for{' '}
        <span className="animated-box">
          {words[index]}
        </span>
      </h1>
    </div>
  );
};

export default StreamingHero;
