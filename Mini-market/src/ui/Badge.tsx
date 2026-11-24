import React from 'react';
import styled, { css } from 'styled-components';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

const toneStyles = {
  neutral: css`
    background-color: ${({ theme }) => theme.colors.bgMuted};
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors.primarySubtle};
    color: ${({ theme }) => theme.colors.primary};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.successSubtle};
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warningSubtle};
    color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.dangerSubtle};
    color: ${({ theme }) => theme.colors.danger};
  `,
};

const StyledBadge = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.full};
  line-height: 1.4;
  letter-spacing: 0.01em;
  ${({ $tone }) => toneStyles[$tone]}
`;

export interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ tone = 'neutral', children }) => {
  return <StyledBadge $tone={tone}>{children}</StyledBadge>;
};
