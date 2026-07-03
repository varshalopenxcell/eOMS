import type { Customer } from './customersStore';
import type { Product } from './productsStore';
import type { Order } from './ordersStore';

export const seedCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Ava Thompson',
    email: 'ava.thompson@northwindretail.com',
    phone: '+1 415 555 0142',
    company: 'Northwind Retail',
    notes: 'VIP account — prefers monthly consolidated invoices.',
    createdAt: '2026-06-02T14:20:00.000Z'
  },
  {
    id: 'c2',
    name: 'Marcus Chen',
    email: 'marcus@chenlogistics.com',
    phone: '+1 212 555 0199',
    company: 'Chen Logistics',
    createdAt: '2026-06-05T09:05:00.000Z'
  },
  {
    id: 'c3',
    name: 'Priya Sharma',
    email: 'priya.sharma@lumenhealth.io',
    phone: '+1 650 555 0173',
    company: 'Lumen Health',
    notes: 'Requires NET-30 payment terms.',
    createdAt: '2026-06-08T17:42:00.000Z'
  },
  {
    id: 'c4',
    name: 'Diego Alvarez',
    email: 'diego@alvarezimports.com',
    phone: '+1 305 555 0110',
    company: 'Alvarez Imports',
    createdAt: '2026-06-11T11:15:00.000Z'
  },
  {
    id: 'c5',
    name: 'Sarah Kim',
    email: 'sarah.kim@brightfoods.com',
    phone: '+1 206 555 0188',
    company: 'Bright Foods Co.',
    createdAt: '2026-06-14T08:30:00.000Z'
  },
  {
    id: 'c6',
    name: "James O'Connor",
    email: 'james.oconnor@atlasgear.com',
    phone: '+1 312 555 0156',
    company: 'Atlas Gear',
    notes: 'Escalation contact for damaged shipments.',
    createdAt: '2026-06-19T15:50:00.000Z'
  },
  {
    id: 'c7',
    name: 'Fatima Al-Sayed',
    email: 'fatima@desertbloomtrading.ae',
    phone: '+44 20 7946 0958',
    company: 'Desert Bloom Trading',
    createdAt: '2026-06-24T10:05:00.000Z'
  },
  {
    id: 'c8',
    name: 'Liam Walsh',
    email: 'liam.walsh@brewhousesupply.ie',
    phone: '+353 1 555 0123',
    company: 'Brewhouse Supply',
    createdAt: '2026-06-29T13:40:00.000Z'
  }
];

export const seedProducts: Product[] = [
  {
    id: 'p1',
    sku: 'SKU-1001',
    name: 'Wireless Mechanical Keyboard',
    priceCents: 8900,
    stockQuantity: 154,
    description: 'Low-profile hot-swappable switches with a 40-hour battery life.',
    createdAt: '2026-05-20T09:00:00.000Z'
  },
  {
    id: 'p2',
    sku: 'SKU-1002',
    name: 'Ergonomic Office Chair',
    priceCents: 32900,
    stockQuantity: 42,
    description: 'Adjustable lumbar support, breathable mesh back, 5-year warranty.',
    createdAt: '2026-05-21T09:00:00.000Z'
  },
  {
    id: 'p3',
    sku: 'SKU-1003',
    name: 'USB-C Docking Station',
    priceCents: 12900,
    stockQuantity: 0,
    description: 'Dual 4K HDMI, 100W passthrough charging, 8-in-1 hub.',
    createdAt: '2026-05-22T09:00:00.000Z'
  },
  {
    id: 'p4',
    sku: 'SKU-1004',
    name: '27" 4K Monitor',
    priceCents: 44900,
    stockQuantity: 18,
    description: 'IPS panel, 99% sRGB, height and tilt adjustable stand.',
    createdAt: '2026-05-23T09:00:00.000Z'
  },
  {
    id: 'p5',
    sku: 'SKU-1005',
    name: 'Noise-Cancelling Headphones',
    priceCents: 19900,
    stockQuantity: 76,
    description: 'Active noise cancellation with 30-hour playback.',
    createdAt: '2026-05-26T09:00:00.000Z'
  },
  {
    id: 'p6',
    sku: 'SKU-1006',
    name: 'Standing Desk Converter',
    priceCents: 24900,
    stockQuantity: 5,
    description: 'Gas-spring height adjustment, fits dual monitors.',
    createdAt: '2026-05-27T09:00:00.000Z'
  },
  {
    id: 'p7',
    sku: 'SKU-1007',
    name: 'Webcam 1080p Pro',
    priceCents: 7900,
    stockQuantity: 210,
    description: 'Autofocus, low-light correction, built-in privacy shutter.',
    createdAt: '2026-05-28T09:00:00.000Z'
  },
  {
    id: 'p8',
    sku: 'SKU-1008',
    name: 'Laptop Stand Aluminum',
    priceCents: 4500,
    stockQuantity: 300,
    description: 'Foldable, ventilated, fits 11"-17" laptops.',
    createdAt: '2026-05-29T09:00:00.000Z'
  },
  {
    id: 'p9',
    sku: 'SKU-1009',
    name: 'Wireless Charging Pad',
    priceCents: 3500,
    stockQuantity: 0,
    description: '15W fast charging, works through most cases.',
    createdAt: '2026-05-30T09:00:00.000Z'
  },
  {
    id: 'p10',
    sku: 'SKU-1010',
    name: 'Bluetooth Mouse',
    priceCents: 2900,
    stockQuantity: 128,
    description: 'Silent clicks, 3-device switching, USB-C rechargeable.',
    createdAt: '2026-05-31T09:00:00.000Z'
  }
];

export const seedOrders: Order[] = [
  {
    id: 'o1',
    customerId: 'c1',
    status: 'fulfilled',
    currency: 'USD',
    items: [
      { id: 'o1-i1', name: 'Wireless Mechanical Keyboard', quantity: 2, priceCents: 8900 },
      { id: 'o1-i2', name: 'Bluetooth Mouse', quantity: 2, priceCents: 2900 }
    ],
    createdAt: '2026-06-03T10:12:00.000Z'
  },
  {
    id: 'o2',
    customerId: 'c2',
    status: 'processing',
    currency: 'USD',
    items: [{ id: 'o2-i1', name: '27" 4K Monitor', quantity: 4, priceCents: 44900 }],
    createdAt: '2026-06-06T16:45:00.000Z'
  },
  {
    id: 'o3',
    customerId: 'c3',
    status: 'fulfilled',
    currency: 'USD',
    items: [
      { id: 'o3-i1', name: 'Ergonomic Office Chair', quantity: 6, priceCents: 32900 },
      { id: 'o3-i2', name: 'Standing Desk Converter', quantity: 6, priceCents: 24900 }
    ],
    createdAt: '2026-06-09T09:30:00.000Z'
  },
  {
    id: 'o4',
    customerId: 'c1',
    status: 'draft',
    currency: 'USD',
    items: [{ id: 'o4-i1', name: 'Noise-Cancelling Headphones', quantity: 1, priceCents: 19900 }],
    createdAt: '2026-06-12T13:05:00.000Z'
  },
  {
    id: 'o5',
    customerId: 'c4',
    status: 'cancelled',
    currency: 'USD',
    items: [{ id: 'o5-i1', name: 'USB-C Docking Station', quantity: 3, priceCents: 12900 }],
    createdAt: '2026-06-13T08:50:00.000Z'
  },
  {
    id: 'o6',
    customerId: 'c5',
    status: 'fulfilled',
    currency: 'USD',
    items: [
      { id: 'o6-i1', name: 'Webcam 1080p Pro', quantity: 10, priceCents: 7900 },
      { id: 'o6-i2', name: 'Laptop Stand Aluminum', quantity: 10, priceCents: 4500 }
    ],
    createdAt: '2026-06-16T11:20:00.000Z'
  },
  {
    id: 'o7',
    customerId: 'c6',
    status: 'processing',
    currency: 'USD',
    items: [{ id: 'o7-i1', name: 'Ergonomic Office Chair', quantity: 2, priceCents: 32900 }],
    createdAt: '2026-06-20T15:10:00.000Z'
  },
  {
    id: 'o8',
    customerId: 'c2',
    status: 'fulfilled',
    currency: 'USD',
    items: [{ id: 'o8-i1', name: 'Wireless Charging Pad', quantity: 20, priceCents: 3500 }],
    createdAt: '2026-06-21T09:00:00.000Z'
  },
  {
    id: 'o9',
    customerId: 'c7',
    status: 'processing',
    currency: 'USD',
    items: [
      { id: 'o9-i1', name: 'Bluetooth Mouse', quantity: 15, priceCents: 2900 },
      { id: 'o9-i2', name: 'Wireless Mechanical Keyboard', quantity: 15, priceCents: 8900 }
    ],
    createdAt: '2026-06-25T14:35:00.000Z'
  },
  {
    id: 'o10',
    customerId: 'c8',
    status: 'draft',
    currency: 'USD',
    items: [{ id: 'o10-i1', name: '27" 4K Monitor', quantity: 1, priceCents: 44900 }],
    createdAt: '2026-06-30T10:00:00.000Z'
  },
  {
    id: 'o11',
    customerId: 'c3',
    status: 'fulfilled',
    currency: 'USD',
    items: [{ id: 'o11-i1', name: 'Noise-Cancelling Headphones', quantity: 8, priceCents: 19900 }],
    createdAt: '2026-07-01T12:15:00.000Z'
  },
  {
    id: 'o12',
    customerId: 'c5',
    status: 'processing',
    currency: 'USD',
    items: [
      { id: 'o12-i1', name: 'Webcam 1080p Pro', quantity: 5, priceCents: 7900 },
      { id: 'o12-i2', name: 'Standing Desk Converter', quantity: 2, priceCents: 24900 }
    ],
    createdAt: '2026-07-02T09:45:00.000Z'
  }
];
