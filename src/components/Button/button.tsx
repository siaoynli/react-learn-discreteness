import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NavigationButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// 将属性变成可选
export type ButtonProps = Partial<NavigationButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = props => {
  const { className, disabled, size, btnType, children, href, ...restProps } =
    props;

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  size: PropTypes.oneOf([ButtonSize.Large, ButtonSize.Small]).isRequired,
  disabled: PropTypes.bool,
  btnType: PropTypes.oneOf([
    ButtonType.Primary,
    ButtonType.Default,
    ButtonType.Danger,
    ButtonType.Link,
  ]),
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};

export default Button;
