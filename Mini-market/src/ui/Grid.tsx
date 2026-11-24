import styled from 'styled-components';

export const Grid = styled.div<{ $gap?: 'sm' | 'md' | 'lg' }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme, $gap = 'md' }) => theme.spacing[$gap]};

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1140px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
