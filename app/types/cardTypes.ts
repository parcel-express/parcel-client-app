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

export type AddressesProps = {
  variant: 'addresses';
  data: Address;
  onEditPress: () => void;
  onDeletePress: () => void;
};

export type InvoicesProps = {
  variant: 'invoices';
  data: Invoice;
};
export type TariffsProps = {
  variant: 'tariffs';
  data: Tariffs;
};

export default {};
