import React from 'react';

export default function FireworkBurst() {
  return (
    <svg viewBox="0 0 200 200" className="firework-svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="trailGradient1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#FFD166" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E8452B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="trailGradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="trailGradient3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#00E676" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#004D40" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="trailGradient4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#FF4081" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C51162" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Golden/Red Burst */}
      <g className="burst-1">
        {Array.from({length: 36}).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          return (
            <path 
              key={`b1-${i}`}
              d={`M 100 100 Q ${100 + Math.cos(angle+0.1)*45} ${100 + Math.sin(angle+0.1)*45} ${100 + Math.cos(angle)*95} ${100 + Math.sin(angle)*95}`}
              stroke="url(#trailGradient1)"
              strokeWidth={i % 3 === 0 ? 2 : 1}
              fill="none" strokeLinecap="round" className="trail-line"
            />
          )
        })}
      </g>
      
      {/* Cyan/Purple Burst */}
      <g className="burst-2">
          {Array.from({length: 24}).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          return (
            <path 
              key={`b2-${i}`}
              d={`M 100 100 Q ${100 + Math.cos(angle-0.1)*35} ${100 + Math.sin(angle-0.1)*35} ${100 + Math.cos(angle)*80} ${100 + Math.sin(angle)*80}`}
              stroke="url(#trailGradient2)"
              strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
              fill="none" strokeLinecap="round" className="trail-line"
            />
          )
        })}
      </g>

      {/* Green Burst */}
      <g className="burst-3">
          {Array.from({length: 18}).map((_, i) => {
          const angle = ((i * 20) + 5) * Math.PI / 180;
          return (
            <path 
              key={`b3-${i}`}
              d={`M 100 100 Q ${100 + Math.cos(angle)*50} ${100 + Math.sin(angle)*50} ${100 + Math.cos(angle+0.15)*90} ${100 + Math.sin(angle+0.15)*90}`}
              stroke="url(#trailGradient3)"
              strokeWidth={2}
              fill="none" strokeLinecap="round" className="trail-line"
            />
          )
        })}
      </g>

      {/* Pink Burst */}
      <g className="burst-4">
          {Array.from({length: 20}).map((_, i) => {
          const angle = ((i * 18) + 12) * Math.PI / 180;
          return (
            <path 
              key={`b4-${i}`}
              d={`M 100 100 Q ${100 + Math.cos(angle)*25} ${100 + Math.sin(angle)*25} ${100 + Math.cos(angle-0.1)*70} ${100 + Math.sin(angle-0.1)*70}`}
              stroke="url(#trailGradient4)"
              strokeWidth={1.5}
              fill="none" strokeLinecap="round" className="trail-line"
            />
          )
        })}
      </g>
    </svg>
  );
}
