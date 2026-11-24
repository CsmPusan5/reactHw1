import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useThemeMode } from "./context/ThemeContext";
import { CATEGORIES, PRODUCTS } from './data/products.ts';
import type { Category } from "./data/products.ts";
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Card, CardBody, CardFooter, CardMedia } from './ui/Card.tsx';
import { Grid } from './ui/Grid.tsx';
import { Input } from './ui/Input.tsx';
import { CartDrawer, type CartEntry } from "./components/CartDrwaer.tsx";

const PageContainer = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

const BrandTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ControlsBar = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  max-width: 360px;
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BadgeCorner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const ProductTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ProductMeta = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Price = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgSurface};
  border: 1px dashed ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radii.lg};
  gap: ${({ theme }) => theme.spacing.sm};
`;


const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 380px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const App: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Все');
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === 'Все' || item.category === activeCategory;
      const matchesQuery = !query || item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [search, activeCategory]);

  const totalCartItems = useMemo(() => Object.values(cart).reduce((sum, count) => sum + count, 0), [cart]);

  const handleAddToCard = (id: string) => {
    if (loadingIds[id]) return;

    setLoadingIds((prev) => ({ ...prev, [id]: true}));
    setTimeout(() => {
      setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }, 550);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartEntries = useMemo<CartEntry[]>(() => {
    return PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0).map((product) => ({
      product,
      quantity: cart[product.id],
    }));
  }, [cart]);

  const handleIncrement = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const handleDecrement = (id: string) => {
    setCart((prev) => {
      const nextQty = (prev[id] ?? 0) - 1;
      if (nextQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const handleRemove = (id: string) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  return (
    <PageContainer>
      <Header>
        <BrandTitle> Мини-маркет</BrandTitle>
        <HeaderActions>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {mode === 'light' ? 'Темная тема' : 'Светлая тема'}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setIsCartOpen(true)}>
            Корзина : {totalCartItems}
          </Button>
        </HeaderActions>
      </Header>

      <ControlsBar>
        <CategoryTabs role="tablist" aria-label="Категории товаров">
          {CATEGORIES.map((category) => (
            <Button 
              key={category}
              size="sm"
              variant={activeCategory === category ? 'primary' : 'outline'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </CategoryTabs>

        <SearchBox>
          <Input
            placeholder="Поиск продуктов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </SearchBox>
      </ControlsBar>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <ProductTitle>Ничего не найдено</ProductTitle>
          <EmptyText>
            По запросу "{search}" в категории "{activeCategory}" товаров нет.
          </EmptyText>
        </EmptyState>
      ) : (
        <Grid $gap="md">
          {filteredProducts.map((product) => {
            const isLoading = Boolean(loadingIds[product.id]);
            const inCartCount = cart[product.id] ?? 0;

            return (
              <Card key={product.id}>
                <CardMedia>
                  {product.badge && (
                    <BadgeCorner>
                      <Badge tone={product.badge.tone}>{product.badge.label}</Badge>
                    </BadgeCorner>
                  )}
                </CardMedia>

                <CardBody>
                  <div>
                    <Badge tone="neutral">{product.category}</Badge>
                  </div>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductMeta>{product.weight}</ProductMeta>
                </CardBody>

                <CardFooter>
                  <Price>{product.price} Руб.</Price>
                  <Button
                    size="sm"
                    variant={inCartCount > 0 ? 'secondary' : 'primary'}
                    loading={isLoading}
                    onClick={() => handleAddToCard(product.id)}
                    >
                      {isLoading ? 'Добавляем...' : inCartCount > 0 ? `В корзине (${inCartCount})` : 'В корзину'}
                    </Button>
                </CardFooter>
              </Card>
            );
          })}
        </Grid>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        items={cartEntries}
        onClose={() => setIsCartOpen(false)}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onClear={handleClearCart}
      />
    </PageContainer>
  );
};
