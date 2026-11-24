import React from 'react';
import styled from 'styled-components';
import { fadeIn } from './animations';

const StyledCard = styled.article<{ $interactive?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowCard};
  overflow: hidden;
  animation: ${fadeIn} ${({ theme }) => theme.transitions.normal};
  transition: transform ${({ theme }) => theme.transitions.fast},
              border-color ${({ theme }) => theme.transitions.fast},
              background-color ${({ theme }) => theme.transitions.normal};

  ${({ $interactive, theme }) =>
    $interactive &&
    `
    &:hover {
      transform: translateY(-3px);
      border-color: ${theme.colors.borderFocus};
    }
  `}
`;

export const CardMedia = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.bgSurfaceHover};
  font-size: 3.5rem;
  user-select: none;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
  margin-top: auto;
`;

export interface CardProps {
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ interactive = true, children }) => {
  return <StyledCard $interactive={interactive}>{children}</StyledCard>;
};
