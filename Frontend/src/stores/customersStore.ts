import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seedCustomers } from './seedData';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  createdAt: string;
}

export type CustomerInput = Omit<Customer, 'id' | 'createdAt'>;

interface CustomersState {
  customers: Customer[];
  addCustomer: (input: CustomerInput) => Customer;
  updateCustomer: (id: string, input: CustomerInput) => void;
  removeCustomer: (id: string) => void;
  getCustomer: (id: string) => Customer | undefined;
}

export const useCustomersStore = create<CustomersState>()(
  persist(
    (set, get) => ({
      customers: seedCustomers,
      addCustomer: (input) => {
        const customer: Customer = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        };
        set((state) => ({ customers: [customer, ...state.customers] }));
        return customer;
      },
      updateCustomer: (id, input) => {
        set((state) => ({
          customers: state.customers.map((customer) => (customer.id === id ? { ...customer, ...input } : customer))
        }));
      },
      removeCustomer: (id) => {
        set((state) => ({ customers: state.customers.filter((customer) => customer.id !== id) }));
      },
      getCustomer: (id) => get().customers.find((customer) => customer.id === id)
    }),
    { name: 'eoms-customers-v2' }
  )
);
