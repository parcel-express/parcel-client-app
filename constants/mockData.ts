import { Order } from '@/app/types/cardTypes';

// TODO: Replace with API call
export const mockOrders: (Order & { tabStatus: 'Ongoing' | 'Failed' | 'Completed' })[] = [
  {
    id: '1',
    title: 'Order #12345',
    tabStatus: 'Ongoing',
    status: 'In Transit',
    statusVariant: 'warning',
    sender: { name: 'John Doe', address: '123 Main St, City, Country' },
    receiver: { name: 'Jane Smith', address: '456 Elm St, City, Country' },
    body: [
      { label: 'Pickup Date', value: '2023-10-01' },
      { label: 'Delivery Date', value: '2023-10-05' },
    ],
  },
  {
    id: '2',
    title: 'Order #12346',
    tabStatus: 'Completed',
    status: 'Delivered',
    statusVariant: 'success',
    sender: { name: 'Alice Johnson', address: '789 Oak St, City, Country' },
    receiver: { name: 'Bob Brown', address: '321 Pine St, City, Country' },
    body: [
      { label: 'Pickup Date', value: '2023-09-20' },
      { label: 'Delivery Date', value: '2023-09-25' },
    ],
  },
  {
    id: '3',
    title: 'Order #12347',
    tabStatus: 'Failed',
    status: 'Pending',
    statusVariant: 'warning',
    sender: { name: 'Charlie Davis', address: '654 Maple St, City, Country' },
    receiver: { name: 'Diana Evans', address: '987 Cedar St, City, Country' },
    body: [
      { label: 'Pickup Date', value: '2023-10-10' },
      { label: 'Delivery Date', value: '2023-10-15' },
    ],
  },
];

export const MOCK_TRACKING: Record<
  string,
  {
    key: string;
    labelKey: string;
    timestamp?: string;
    status: 'completed' | 'current' | 'upcoming';
  }[]
> = {
  '1': [
    {
      key: 'orderPlaced',
      labelKey: 'tracking.orderPlaced',
      timestamp: '2026-03-16T09:10:00.000Z',
      status: 'completed',
    },
    {
      key: 'confirmed',
      labelKey: 'tracking.confirmed',
      timestamp: '2026-03-16T11:40:00.000Z',
      status: 'completed',
    },
    {
      key: 'inTransit',
      labelKey: 'tracking.inTransit',
      timestamp: '2026-03-17T08:25:00.000Z',
      status: 'current',
    },
    {
      key: 'outForDelivery',
      labelKey: 'tracking.outForDelivery',
      status: 'upcoming',
    },
    {
      key: 'delivered',
      labelKey: 'tracking.delivered',
      status: 'upcoming',
    },
  ],
  '2': [
    {
      key: 'orderPlaced',
      labelKey: 'tracking.orderPlaced',
      timestamp: '2026-03-14T07:20:00.000Z',
      status: 'completed',
    },
    {
      key: 'confirmed',
      labelKey: 'tracking.confirmed',
      timestamp: '2026-03-14T10:05:00.000Z',
      status: 'completed',
    },
    {
      key: 'inTransit',
      labelKey: 'tracking.inTransit',
      timestamp: '2026-03-14T14:15:00.000Z',
      status: 'completed',
    },
    {
      key: 'outForDelivery',
      labelKey: 'tracking.outForDelivery',
      timestamp: '2026-03-15T09:00:00.000Z',
      status: 'completed',
    },
    {
      key: 'delivered',
      labelKey: 'tracking.delivered',
      timestamp: '2026-03-15T12:30:00.000Z',
      status: 'completed',
    },
  ],
  '3': [
    {
      key: 'orderPlaced',
      labelKey: 'tracking.orderPlaced',
      timestamp: '2026-03-15T13:00:00.000Z',
      status: 'completed',
    },
    {
      key: 'confirmed',
      labelKey: 'tracking.confirmed',
      timestamp: '2026-03-15T16:45:00.000Z',
      status: 'current',
    },
    {
      key: 'inTransit',
      labelKey: 'tracking.inTransit',
      status: 'upcoming',
    },
    {
      key: 'outForDelivery',
      labelKey: 'tracking.outForDelivery',
      status: 'upcoming',
    },
    {
      key: 'delivered',
      labelKey: 'tracking.delivered',
      status: 'upcoming',
    },
  ],
};
