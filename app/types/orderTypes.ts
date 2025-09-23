export type Status = 'paid' | 'pending' | 'overdue' | 'partiallyPaid';
export type Tab = 'Ongoing' | 'Failed' | 'Completed';

export type Tabs = {
  label: string;
  value: Tab;
}[];

export type StatusOptions = {
  label: string;
  value: Status | 'status';
}[];
