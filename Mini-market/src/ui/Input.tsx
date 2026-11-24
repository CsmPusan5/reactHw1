import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasClear: boolean }>`
  width: 100%;
  height: 42px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-right: ${({ $hasClear, theme }) => ($hasClear ? '36px' : theme.spacing.md)};
  background-color: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast},
              background-color ${({ theme }) => theme.transitions.normal};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.bgMuted};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const Input: React.FC<InputProps> = ({ value, onClear, ...rest }) => {
  const showClear = Boolean(value && String(value).length > 0 && onClear);

  return (
    <Wrapper>
      <StyledInput $hasClear={showClear} value={value} {...rest} />
      {showClear && (
        <ClearButton type="button" onClick={onClear} aria-label="Очистить поиск">
          ✕
        </ClearButton>
      )}
    </Wrapper>
  );
};
