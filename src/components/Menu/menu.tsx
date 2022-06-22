import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuModel = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  children?: React.ReactNode;
  defaultIndex?: string;
  className?: string;
  mode?: MenuModel;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuModel;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = props => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentIndex, setIndex] = useState(defaultIndex);
  const classes = classNames('viking-menu', className, {
    'menu-horizontal': mode === 'horizontal',
    'menu-vertical': mode === 'vertical',
  });

  const handleClick = (index: string) => {
    setIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const passedContext: IMenuContext = {
    index: currentIndex || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  // eslint-disable-next-line arrow-body-style
  const renderChildren = () => {
    // eslint-disable-next-line consistent-return
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() });
      }
      console.warn(
        'Warning: Menu has a child which is not a MenuItem Component'
      );
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  className: '',
  mode: 'horizontal',
  style: {},
  onSelect: () => {},
  children: null,
  defaultOpenSubMenus: [],
};

export default Menu;
