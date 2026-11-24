import React from 'react';
import styled from 'styled-components';
import { type Product } from '../data/products';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface CartEntry {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartEntry[];
  onClose: () => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 40;
  background-color: ${({ theme }) => theme.colors.bgMuted};
  opacity: ${({ $isOpen }) => ($isOpen ? 0.65 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.transitions.normal};
`;

const DrawerPanel = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgSurface};
  border-left: 1px solid ${({ theme }) => theme.colors.borderDefault};
  box-shadow: ${({ theme }) => theme.colors.shadowCard};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform ${({ theme }) => theme.transitions.normal},
              background-color ${({ theme }) => theme.transitions.normal};
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

const DrawerTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgCanvas};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const RowInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

const RowEmoji = styled.span`
  font-size: 1.75rem;
  flex-shrink: 0;
`;

const RowText = styled.div`
  min-width: 0;
`;

const RowTitle = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowPrice = styled.div`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`;

const QtyValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const DrawerFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderDefault};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FooterActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;
const EmptyCart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}) => {
  const totalSum = items.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  const totalCount = items.reduce((acc, { quantity }) => acc + quantity, 0);

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} aria-hidden="true" />
      <DrawerPanel $isOpen={isOpen} role="dialog" aria-label="Корзина покупок">
        <DrawerHeader>
          <DrawerTitle>
            Корзина <Badge tone="primary">{totalCount}</Badge>
          </DrawerTitle>
          <Button variant="outline" size="sm" onClick={onClose} aria-label="Закрыть корзину">
            ✕
          </Button>
        </DrawerHeader>

        {items.length === 0 ? (
          <EmptyCart>
            <div>Корзина пока пуста</div>
          </EmptyCart>
        ) : (
          <ItemsList>
            {items.map(({ product, quantity }) => (
              <CartRow key={product.id}>
                <RowInfo>
                  <RowEmoji>{product.emoji}</RowEmoji>
                  <RowText>
                    <RowTitle>{product.title}</RowTitle>
                    <RowPrice>{product.price * quantity} ₽</RowPrice>
                  </RowText>
                </RowInfo>

                <Stepper>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDecrement(product.id)}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </Button>
                  <QtyValue>{quantity}</QtyValue>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onIncrement(product.id)}
                    aria-label="Увеличить количество"
                  >
                    +
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onRemove(product.id)}
                    aria-label="Удалить товар"
                  >
                    ✕
                  </Button>
                </Stepper>
              </CartRow>
            ))}
          </ItemsList>
        )}

        <DrawerFooter>
          <SummaryRow>
            <span>Итого</span>
            <span>{totalSum} ₽</span>
          </SummaryRow>
          <FooterActions>
            <Button
              variant="outline"
              size="md"
              disabled={items.length === 0}
              onClick={onClear}
            >
              Очистить
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              disabled={items.length === 0}
              onClick={onClose}
            >
              Оформить заказ
            </Button>
          </FooterActions>
        </DrawerFooter>
      </DrawerPanel>
    </>
  );
};