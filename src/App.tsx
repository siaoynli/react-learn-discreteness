import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
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
      <p>
        Edit
        <code>src/App.tsx</code>
        and save to reload.
      </p>
      <h1>hello world!</h1>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;
