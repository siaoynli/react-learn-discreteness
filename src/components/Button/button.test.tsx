import React from 'react';
import { render } from '@testing-library/react';
import Button from './button';

describe('Button with different props', () => {
  it('should render the correct button with different props', () => {
    const wrapper = render(<Button btnType="primary">Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary');
    expect(element.tagName).toEqual('BUTTON');
  });
  it('should render the correct component based on the different props', () => {
    const wrapper = render(
      <Button btnType="link" disabled>
        Disabled
      </Button>
    );
    const element = wrapper.getByText('Disabled');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('disabled');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.google.com">
        Google
      </Button>
    );
    const element = wrapper.getByText('Google');
    expect(element.tagName).toEqual('A');
  });
});
