import React, { useContext, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvent =
    // eslint-disable-next-line operator-linebreak
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen,
    });
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
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li className={classes} key={index} {...hoverEvent}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
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
