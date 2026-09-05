import React from 'react';
import { ShieldCheck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import './SafetyGuide.css';

export default function SafetyGuide() {
  const dos = [
    {
      id: 1,
      title: 'Follow instructions',
      desc: 'Display fireworks as per the instructions mentioned on the pack.'
    },
    {
      id: 2,
      title: 'Outdoor use only',
      desc: 'Use fireworks only outdoors, in open spaces away from buildings.'
    },
    {
      id: 3,
      title: 'Use branded fireworks',
      desc: 'Buy fireworks from authorised and reputed manufacturers only.'
    },
    {
      id: 4,
      title: 'Keep safe distance',
      desc: 'Light only one firework at a time, by one person. Others should watch from a safe distance.'
    },
    {
      id: 5,
      title: 'Follow safety tips',
      desc: 'Always follow the safety tips marked on the fireworks packaging.'
    },
    {
      id: 6,
      title: 'Use agarbatti',
      desc: 'Use an agarbatti (incense stick) to ignite the fireworks safely.'
    },
    {
      id: 7,
      title: 'Safe storage',
      desc: 'Store fireworks in a cool and dry place away from heat sources.'
    },
    {
      id: 8,
      title: 'Needs supervision',
      desc: 'Always have adult supervision when children are around fireworks.'
    },
    {
      id: 9,
      title: 'Emergency water',
      desc: 'Keep two buckets of water handy, in the event of fire or any mishap.'
    }
  ];

  const donts = [
    {
      id: 1,
      title: "Don't make tricks",
      desc: 'Never make your own fireworks. It is extremely dangerous.'
    },
    {
      id: 2,
      title: "Don't relight",
      desc: 'Never try to re-light or pick up fireworks that have not ignited fully.'
    },
    {
      id: 3,
      title: "Don't carry it",
      desc: 'Never carry fireworks in your pockets.'
    },
    {
      id: 4,
      title: 'No glass or metal',
      desc: 'Never shoot fireworks in metal or glass containers.'
    },
    {
      id: 5,
      title: "Don't throw",
      desc: 'Never point or throw fireworks at another person.'
    },
    {
      id: 6,
      title: "Don't wear loose clothes",
      desc: 'Do not wear loose clothing while using fireworks.'
    },
    {
      id: 7,
      title: "Don't touch it",
      desc: 'After the display, never pick up leftover fireworks; they may still be active.'
    },
    {
      id: 8,
      title: "Don't place near candles",
      desc: "Don't store firecrackers near burning candles or lamps."
    },
    {
      id: 9,
      title: "Don't drink and burst",
      desc: 'Alcohol causes delayed body responses and crackers might burst early.'
    }
  ];

  return (
    <section className="safety-section" id="safety">
      <div className="safety-container">
        
        <div className="safety-header">
          <div className="safety-badge">
            <ShieldCheck size={14} />
            <span>Celebration Safety</span>
          </div>
          <h2 className="safety-title">Crackers safety tips</h2>
          <p className="safety-desc">
            There are certain dos and don'ts to follow while purchasing, bursting and storing crackers. A little negligence, ignorance or carelessness can cause a fatal injury. Please follow these precautions for a safe and happy celebration.
          </p>
        </div>

        <div className="safety-split-panels">
          {/* Dos Section */}
          <div className="safety-block dos-panel">
            <div className="safety-block-header dos-theme">
              <CheckCircle size={24} className="header-icon" />
              <h3>Do's</h3>
            </div>
            <div className="safety-list">
              {dos.map((item) => (
                <div className="safety-list-item do-border" key={item.id}>
                  <div className="safety-list-check do-check">✓</div>
                  <div className="safety-list-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donts Section */}
          <div className="safety-block donts-panel">
            <div className="safety-block-header donts-theme">
              <XCircle size={24} className="header-icon" />
              <h3>Don'ts</h3>
            </div>
            <div className="safety-list">
              {donts.map((item) => (
                <div className="safety-list-item dont-border" key={item.id}>
                  <div className="safety-list-check dont-check">✕</div>
                  <div className="safety-list-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Callout Box */}
        <div className="safety-emergency-callout">
          <div className="callout-header">
            <AlertTriangle className="callout-icon" size={24} />
            <div>
              <h4 className="callout-title">In case of emergency</h4>
              <p className="callout-subtitle">If any accident occurs, immediately call emergency services or visit the nearest hospital.</p>
            </div>
          </div>
          <div className="emergency-numbers-grid">
            <div className="emergency-number-box">
              <span className="emergency-label">FIRE</span>
              <span className="emergency-value">📞 101</span>
            </div>
            <div className="emergency-number-box">
              <span className="emergency-label">AMBULANCE</span>
              <span className="emergency-value">📞 108</span>
            </div>
            <div className="emergency-number-box">
              <span className="emergency-label">EMERGENCY</span>
              <span className="emergency-value">📞 112</span>
            </div>
          </div>
          <div className="callout-footer-tip">
            For a burn, cool the skin under running water for at least ten minutes and see a doctor. Do not apply ointment or ice.
          </div>
        </div>

      </div>
    </section>
  );
}
