import React from 'react';

const Button = ({ variant = 'primary', children, ...rest }) => {
  let className = 'btn ';
  if (variant === 'primary') className += 'btn-primary';
  if (variant === 'secondary') className += 'btn-secondary';
  if (variant === 'danger') className += 'btn-danger';
  if (variant === 'ghost') className += 'btn-ghost';

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
