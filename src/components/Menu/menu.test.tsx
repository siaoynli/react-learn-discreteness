import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
};

const generalMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <li>测试</li>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('测试Menu', () => {
  //钩子函数，在每个测试开始前调用
  beforeEach(() => {
    wrapper = render(generalMenu(testProps));
    //data-testid="test-menu"
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('测试menu基本属性', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
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
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    //点击第二个菜单项，不会触发onSelect
    expect(disabledElement).not.toHaveClass('is-active');
    //点击第二个菜单项，参数1不会触发onSelect
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it('测试vertical样式', () => {
    //清除原有的wrapper
    cleanup();
    const wrapper = render(generalMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});
