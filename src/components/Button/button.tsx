import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export type ButtonSize = 'lg' | 'sm' | '';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

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

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'primary' && disabled,
  });

  if (btnType === 'link' && href) {
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
  className: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'sm', '']),
  disabled: PropTypes.bool,
  btnType: PropTypes.oneOf(['primary', 'default', 'danger', 'link']),
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: '',
  className: '',
  href: '',
};

export default Button;
