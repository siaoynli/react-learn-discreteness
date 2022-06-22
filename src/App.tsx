import React from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <Menu
        defaultIndex="0"
        onSelect={index => {
          // eslint-disable-next-line no-alert
          alert(index);
        }}
        mode="horizontal"
      >
        <MenuItem>标题1</MenuItem>
        <MenuItem>标题2</MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>下拉1</MenuItem>
          <MenuItem>下拉2</MenuItem>
        </SubMenu>
        <MenuItem disabled>标题3</MenuItem>
      </Menu>
    </header>
  </div>
);

export default App;
