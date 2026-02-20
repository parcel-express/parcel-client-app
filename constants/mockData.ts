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
