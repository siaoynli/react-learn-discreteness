import React from 'react';
import classNames from 'classnames';

type MenuModel = 'horizontal' | 'vertical';

export interface MenuProps {
  children: React.ReactNode;
  defaultIndex?: number;
  className?: string;
  mode?: MenuModel;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
}

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, children } = props;
  const classes = classNames('viking-menu', className, {
    'menu-horizontal': mode === 'horizontal',
  });
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  className: '',
  mode: 'horizontal',
  style: {},
  onSelect: () => {},
};

export default Menu;
