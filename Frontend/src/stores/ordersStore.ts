import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seedOrders } from './seedData';

export type OrderStatus = 'draft' | 'processing' | 'fulfilled' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  priceCents: number;
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  currency: string;
  items: OrderItem[];
  createdAt: string;
}

export type OrderInput = {
  customerId: string;
  status: OrderStatus;
  currency: string;
  items: Omit<OrderItem, 'id'>[];
};

interface OrdersState {
  orders: Order[];
  addOrder: (input: OrderInput) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  removeOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
  getOrdersForCustomer: (customerId: string) => Order[];
}

export function orderTotalCents(order: Order) {
  return order.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

export const orderStatusLabel: Record<OrderStatus, string> = {
  draft: 'Draft',
  processing: 'Processing',
  fulfilled: 'Fulfilled',
  cancelled: 'Cancelled'
};

export const orderStatusTone: Record<OrderStatus, 'neutral' | 'primary' | 'success' | 'danger'> = {
  draft: 'neutral',
  processing: 'primary',
  fulfilled: 'success',
  cancelled: 'danger'
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: seedOrders,
      addOrder: (input) => {
        const order: Order = {
          id: crypto.randomUUID(),
          customerId: input.customerId,
          status: input.status,
          currency: input.currency,
          items: input.items.map((item) => ({ ...item, id: crypto.randomUUID() })),
          createdAt: new Date().toISOString()
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      updateOrderStatus: (id, status) => {
        set((state) => ({ orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)) }));
      },
      removeOrder: (id) => {
        set((state) => ({ orders: state.orders.filter((order) => order.id !== id) }));
      },
      getOrder: (id) => get().orders.find((order) => order.id === id),
      getOrdersForCustomer: (customerId) => get().orders.filter((order) => order.customerId === customerId)
    }),
    { name: 'eoms-orders-v2' }
  )
);
