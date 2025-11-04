import { JSX } from 'react';

import { TagVariant } from '@/components/ui/Tag';

export type Invoice = {
  id: string;
  title: string;
  body: { label: string; value: string }[];
  status: string;
  statusVariant: TagVariant;
};

export type Tariffs = {
  title: string;
  description: string;
  body: { label: string; value: string }[];
};

export type Address = {
  id?: string;
  title: string;
  address: string;
  body: { label: string; value: string }[];
};
type Person = {
  name: string;
  address: string;
};
export type Order = {
  id: string;
  title: string;
  status: string;
  statusVariant: TagVariant;
  sender: Person;
  receiver: Person;
  body: { label: string; value: string }[];
};
export type Info = {
  icon?: JSX.Element;
  title?: string | JSX.Element;
  body: { label: string; value: string | JSX.Element }[] | JSX.Element;
};

export type Support = {
  id: string;
  title: string;
  date: { label: string; value: string }[];
  body: { label: string; value: string | JSX.Element }[] | JSX.Element;
  status: string;
  statusVariant: TagVariant;
};

export type AddressesProps = {
  variant: 'addresses';
  data: Address;
  onEditPress: () => void;
  onDeletePress: () => void;
  noBorder?: boolean;
};

export type OrderProps = {
  variant: 'orders';
  data: Order;
  noBorder?: boolean;
};
export type InvoicesProps = {
  variant: 'invoices';
  data: Invoice;
  noBorder?: boolean;
};
export type TariffsProps = {
  variant: 'tariffs';
  data: Tariffs;
  noBorder?: boolean;
};
export type InfoProps = {
  variant: 'info';
  data: Info;
  noBorder?: boolean;
};

export type SupportProps = {
  variant: 'support';
  data: Support;
  noBorder?: boolean;
};

export default {};
