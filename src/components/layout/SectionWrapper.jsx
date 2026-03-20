import React from 'react';

const SectionWrapper = ({ title, children }) => {
  return (
    <section className="section-wrapper">
      {title && <h2 className="section-wrapper__title">{title}</h2>}
      {children}
    </section>
  );
};

export default SectionWrapper;
