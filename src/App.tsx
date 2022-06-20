import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <Menu
        defaultIndex={0}
        onSelect={(index: number) => {
          // eslint-disable-next-line no-alert
          alert(index);
        }}
      >
        <MenuItem index={0}>标题1</MenuItem>
        <MenuItem index={1}>标题2</MenuItem>
        <MenuItem index={2} disabled>
          标题3
        </MenuItem>
      </Menu>

      <Button autoFocus>Hello</Button>
    </header>
  </div>
);

export default App;
