import React from 'react';
import { capabilityStripItems } from '../data/cortexData';

export default function CapabilityStrip() {
  // Duplicate items twice to ensure a true seamless infinite loop with -50% translateX
  const items = [...capabilityStripItems, ...capabilityStripItems];

  return (
    <aside className="capability-strip" aria-label="Core Competencies">
      <div className="marquee-container" data-cursor="drag">
        <div className="marquee-track">
          {items.map((item, index) => (
            <div key={`${item}-${index}`} className="strip-item highlight">
              <span className="strip-dot" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
