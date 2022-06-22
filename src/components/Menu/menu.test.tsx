import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generalMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
        display: none;
    }
    .viking-submenu.menu-opened {
      display: block;
     }
    `;
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('测试Menu', () => {
  //钩子函数，在每个测试开始前调用
  beforeEach(() => {
    wrapper = render(generalMenu(testProps));
    wrapper.container.append(createStyleFile());
    //data-testid="test-menu"
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('测试menu基本属性', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('test');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    //选取子节点
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('测试点击菜单项', () => {
    const thirdItem = wrapper.getByText('xyz');
    //点击第三个菜单项
    fireEvent.click(thirdItem);
    //菜单添加is-active类名
    expect(thirdItem).toHaveClass('is-active');
    //原先激活的菜单项移除is-active类名
    expect(activeElement).not.toHaveClass('is-active');
    //触发onSelect回调函数，传入参数是2
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    //点击第二个菜单项，不会触发onSelect
    expect(disabledElement).not.toHaveClass('is-active');
    //点击第二个菜单项，参数1不会触发onSelect
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('测试vertical样式', () => {
    //清除原有的wrapper
    cleanup();
    const wrapper = render(generalMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });

  it('测试展开子菜单', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    //不会等待组件加载完成，handleMouse异步，会显示失败
    // expect(wrapper.queryByText('drop1')).toBeVisible();
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});
