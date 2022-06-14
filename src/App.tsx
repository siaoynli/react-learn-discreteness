import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <Menu defaultIndex={0}>
        <MenuItem>标题1</MenuItem>
        <MenuItem>标题2</MenuItem>
        <MenuItem disabled>标题3</MenuItem>
      </Menu>

      <Button autoFocus>Hello</Button>
      <Button disabled>Hello</Button>
      <Button
        className="custom"
        btnType={ButtonType.Primary}
        size={ButtonSize.Large}
        onClick={e => {
          e.preventDefault();
        }}
      >
        Large
      </Button>
      <Button btnType={ButtonType.Danger}>Hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        Small
      </Button>
      <Button btnType={ButtonType.Link} href="https://www.google.com">
        Google Link
      </Button>
      <Button btnType={ButtonType.Link} href="https://www.google.com" disabled>
        Google Link Disabled
      </Button>
    </header>
  </div>
);

export default App;
