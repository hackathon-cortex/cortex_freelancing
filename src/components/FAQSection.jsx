import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/cortexData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section section-page" aria-labelledby="faq-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>10 — QUESTIONS & ANSWERS</span>
          </div>
          <h2 id="faq-heading" className="section-title" style={{ marginInline: 'auto' }}>
            Frequently Asked Questions
          </h2>
          <p className="section-intro" style={{ marginInline: 'auto' }}>
            Everything you need to know about our services, delivery timelines, pricing approach, and development process.
          </p>
        </div>

        {/* Smooth Animated Accordion List */}
        <div className="faq-accordion-list" role="region" aria-label="FAQ Accordion">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-answer-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={item.question}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    className="faq-trigger"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={18} className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>

                {/* Animated CSS Grid Zero-to-One Container */}
                <div
                  id={contentId}
                  className={`faq-accordion-grid-anim ${isOpen ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={headerId}
                >
                  <div className="faq-accordion-inner">
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
