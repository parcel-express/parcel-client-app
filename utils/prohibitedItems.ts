export const PROHIBITED_ITEMS = [
  { keyword: 'ბატარეა', en: 'battery', category: 'dangerous' },
  { keyword: 'ალკოჰოლი', en: 'alcohol', category: 'restricted' },
  { keyword: 'აეროზოლი', en: 'aerosol', category: 'dangerous' },
  { keyword: 'ცეცხლსასროლი', en: 'firearm', category: 'prohibited' },
  { keyword: 'ნარკოტიკი', en: 'drugs', category: 'prohibited' },
];

export const checkProhibitedItems = (description: string) => {
  const lower = description.toLowerCase();

  return PROHIBITED_ITEMS.filter(item => lower.includes(item.keyword) || lower.includes(item.en));
};
