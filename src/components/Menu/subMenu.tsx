import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = props => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  });

  const renderChildren = () => {
    // eslint-disable-next-line consistent-return
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return childElement;
      }
      console.warn(
        'Warning: Menu has a child which is not a MenuItem Component'
      );
    });
    return <ul className="viking-submenu">{childrenComponent}</ul>;
  };

  return (
    <li className={classes} key={index}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
SubMenu.defaultProps = {
  index: 0,
  className: '',
  children: null,
};
export default SubMenu;
