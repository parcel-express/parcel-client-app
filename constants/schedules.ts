export type DeliverySchedule = {
  city: string;
  cityEn: string;
  region: string;
  frequency: 'daily' | '3x_week' | '2x_week' | 'weekly' | 'special';
  days: string[];
  timeWindow: string;
};

export const MOCK_SCHEDULES: DeliverySchedule[] = [
  {
    city: 'თბილისი',
    cityEn: 'Tbilisi',
    region: 'თბილისი',
    frequency: 'daily',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    timeWindow: '09:00 - 20:00',
  },
  {
    city: 'ქუთაისი',
    cityEn: 'Kutaisi',
    region: 'იმერეთი',
    frequency: '3x_week',
    days: ['mon', 'wed', 'fri'],
    timeWindow: '10:00 - 18:00',
  },
  {
    city: 'ბათუმი',
    cityEn: 'Batumi',
    region: 'აჭარა',
    frequency: '3x_week',
    days: ['mon', 'wed', 'fri'],
    timeWindow: '10:00 - 18:00',
  },
  {
    city: 'თელავი',
    cityEn: 'Telavi',
    region: 'კახეთი',
    frequency: '2x_week',
    days: ['tue', 'thu'],
    timeWindow: '11:00 - 17:00',
  },
  {
    city: 'ზუგდიდი',
    cityEn: 'Zugdidi',
    region: 'სამეგრელო',
    frequency: '2x_week',
    days: ['tue', 'fri'],
    timeWindow: '10:00 - 17:00',
  },
];
