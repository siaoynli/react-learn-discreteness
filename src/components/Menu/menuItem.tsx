import React from 'react';
import classNames from 'classnames';

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props;
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
  });
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  index: 0,
  disabled: false,
  className: '',
  style: {},
};

export default MenuItem;
