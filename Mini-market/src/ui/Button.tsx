import React from 'react';
import styled, { css } from 'styled-components';
import { spin } from './animations';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $loading?: boolean;
}

const sizeStyles = {
  sm: css`
    height: 32px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: 0.8125rem;
    gap: 6px;
  `,
  md: css`
    height: 40px;
    padding: 0 ${({ theme }) => theme.spacing.md};
    font-size: 0.9375rem;
    gap: 8px;
  `,
  lg: css`
    height: 48px;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    font-size: 1rem;
    gap: 10px;
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderDefault};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.bgSurfaceHover};
      border-color: ${({ theme }) => theme.colors.textSecondary};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dangerHover};
    }
  `,
};

const Spinner = styled.span<{ $size: ButtonSize }>`
  display: inline-block;
  width: ${({ $size }) => ($size === 'sm' ? '14px' : '16px')};
  height: ${({ $size }) => ($size === 'sm' ? '14px' : '16px')};
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 0.65s linear infinite;
  flex-shrink: 0;
`;

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition: background-color ${({ theme }) => theme.transitions.fast},
              border-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      cursor: wait;
    `}
`;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $loading={loading}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner $size={size} aria-hidden="true" />}
      {children}
    </StyledButton>
  );
};
