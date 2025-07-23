// Keep mock data as fallback, but we'll primarily use API data
export const mockProductLines = [
  {
    id: 1,
    productLine: "Classic Cars",
    textDescription: "Premium detailed vintage cars",
    icon: "🚗"
  },
  {
    id: 2,
    productLine: "Planes", 
    textDescription: "Wings that soar",
    icon: "✈️"
  },
  {
    id: 3,
    productLine: "Ships",
    textDescription: "Ocean glory and details", 
    icon: "🚢"
  },
  {
    id: 4,
    productLine: "Trains",
    textDescription: "Locomotive precision",
    icon: "🚂"
  },
  {
    id: 5,
    productLine: "Trucks and Buses",
    textDescription: "Heavy-duty models",
    icon: "🚛"
  }
];

// Icon mapping function for product lines
export const getProductLineIcon = (productLineName) => {
  const name = productLineName?.toLowerCase() || '';
  if (name.includes('car') || name.includes('classic')) return '🚗';
  if (name.includes('plane') || name.includes('aircraft')) return '✈️';
  if (name.includes('ship') || name.includes('boat')) return '🚢';
  if (name.includes('train') || name.includes('locomotive')) return '🚂';
  if (name.includes('truck') || name.includes('bus')) return '🚛';
  if (name.includes('motorcycle') || name.includes('bike')) return '🏍️';
  return '📦'; // Default icon
};

export const menuItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'products', label: 'Products', icon: '📦' },
  { id: 'customers', label: 'Customers', icon: '👥' },
  { id: 'orders', label: 'Orders', icon: '🛒' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'employees', label: 'Employees', icon: '👨‍💼' },
  { id: 'offices', label: 'Offices', icon: '🏢' }
];
