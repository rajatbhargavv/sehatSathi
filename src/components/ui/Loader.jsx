import React from 'react';

const Loader = ({ children, ...props }) => {
  return <div className="ui-loader" {...props}>{children}</div>;
};

export default Loader;
