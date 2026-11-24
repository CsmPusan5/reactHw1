import type { BadgeTone } from '../ui/Badge';

export type Category = 'Все' | 'Фрукты' | 'Выпечка' | 'Напитки' | 'Молочное';

export interface Product {
  id: string;
  title: string;
  category: Exclude<Category, 'Все'>;
  price: number;
  weight: string;
  emoji: string;
  badge?: {
    label: string;
    tone: BadgeTone;
  };
}

export const CATEGORIES: Category[] = ['Все', 'Фрукты', 'Выпечка', 'Напитки', 'Молочное'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Авокадо Хасс спелое',
    category: 'Фрукты',
    price: 249,
    weight: '2 шт · 320 г',
    emoji: '🥑',
    badge: { label: 'Хит', tone: 'primary' },
  },
  {
    id: '2',
    title: 'Круассан на сливочном масле',
    category: 'Выпечка',
    price: 135,
    weight: '95 г',
    emoji: '🥐',
    badge: { label: 'Свежее', tone: 'success' },
  },
  {
    id: '3',
    title: 'Матча Латте на овсяном',
    category: 'Напитки',
    price: 290,
    weight: '330 мл',
    emoji: '🍵',
  },
  {
    id: '4',
    title: 'Сыр Страчателла фермерский',
    category: 'Молочное',
    price: 420,
    weight: '250 г',
    emoji: '🧀',
    badge: { label: 'Осталось мало', tone: 'warning' },
  },
  {
    id: '5',
    title: 'Манго Египет отборное',
    category: 'Фрукты',
    price: 380,
    weight: '1 шт · 450 г',
    emoji: '🥭',
    badge: { label: '-15%', tone: 'danger' },
  },
  {
    id: '6',
    title: 'Ремесленный хлеб на закваске',
    category: 'Выпечка',
    price: 195,
    weight: '420 г',
    emoji: '🍞',
  },
  {
    id: '7',
    title: 'Фреш апельсиновый 100%',
    category: 'Напитки',
    price: 260,
    weight: '500 мл',
    emoji: '🍊',
    badge: { label: 'Без сахара', tone: 'success' },
  },
  {
    id: '8',
    title: 'Греческий йогурт 4%',
    category: 'Молочное',
    price: 115,
    weight: '180 г',
    emoji: '🥛',
  },
];