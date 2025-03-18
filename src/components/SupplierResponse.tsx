import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, FilterIcon } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  pricing: string;
  deliveryTime: string;
  quote: string;
}


interface FilterOptions {
  priceRange: 'all' | 'low' | 'medium' | 'high';
  deliveryTime: 'all' | 'past' | 'upcoming';
}

const SupplierResponsesTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: 'all',
    deliveryTime: 'all',
  });

  const supplierData: Supplier[] = [
    { id: '0122241', name: 'P Ramanaia', pricing: '₹3,50,700.00', deliveryTime: '27 Oct', quote: '₹3,50,700.00' },
    { id: '0136152', name: 'Ramu Rao', pricing: '₹500.00', deliveryTime: '5 Oct', quote: '₹1,50,820.00' },
    { id: '0657651', name: 'Krishna Raju', pricing: '₹3,50,700.00', deliveryTime: '9 Nov', quote: '₹10,700.00' },
    { id: '6843164', name: 'Shyam Singha Roy', pricing: '₹800.00', deliveryTime: '25 Oct', quote: '₹3,00,700.00' },
    { id: '9165320', name: 'Veera Shankar Reddy', pricing: '₹3,050', deliveryTime: '8 Dec', quote: '₹35,700.00' },
    { id: '6151350', name: 'Patel Singh', pricing: '₹700.00', deliveryTime: '30 Oct', quote: '₹3,85,100.00' },
    { id: '3962004', name: 'Salman Khan', pricing: '₹3,50,700.00', deliveryTime: '15 Nov', quote: '₹8,50,700.00' },
    { id: '5151361', name: 'Sharuk Khan', pricing: '₹3,50,700.00', deliveryTime: '31 Jan', quote: '₹36,589.00' },
    {id : '6566565', name:`Rajesh khanna `,    pricing:'₹3,50,700.00', deliveryTime:'27 Oct', quote:'₹3,50,700.00'},
  ];

  const getPriceValue = (price: string): number => {
    return parseFloat(price.replace(/[₹,]/g, ''));
  };

  const filteredData = useMemo(() => {
    return supplierData.filter(supplier => {
      const matchesSearch = 
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.quote.toLowerCase().includes(searchQuery.toLowerCase());

      const priceValue = getPriceValue(supplier.pricing);
      const matchesPriceRange = 
        filters.priceRange === 'all' ||
        (filters.priceRange === 'low' && priceValue < 1000) ||
        (filters.priceRange === 'medium' && priceValue >= 1000 && priceValue < 100000) ||
        (filters.priceRange === 'high' && priceValue >= 100000);

      const currentDate = new Date();
      const deliveryDate = new Date(supplier.deliveryTime + ' 2024');
      const matchesDeliveryTime =
        filters.deliveryTime === 'all' ||
        (filters.deliveryTime === 'past' && deliveryDate < currentDate) ||
        (filters.deliveryTime === 'upcoming' && deliveryDate >= currentDate);

      return matchesSearch && matchesPriceRange && matchesDeliveryTime;
    });
  }, [searchQuery, filters]);

  const FilterPanel: React.FC = () => (
    <div className="bg-white shadow-lg rounded-md p-4 absolute right-0 mt-2 z-10 w-64">
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range</h3>
        <select 
          className="w-full border rounded-md p-2"
          value={filters.priceRange}
          onChange={(e) => setFilters({...filters, priceRange: e.target.value as FilterOptions['priceRange']})}
        >
          <option value="all">All Prices</option>
          <option value="low">Low (&lt;₹1,000)</option>
          <option value="medium">Medium (₹1,000 - ₹1,00,000)</option>
          <option value="high">High (&gt;₹1,00,000)</option>
        </select>
      </div>
      <div>
        <h3 className="font-medium mb-2">Delivery Time</h3>
        <select 
          className="w-full border rounded-md p-2"
          value={filters.deliveryTime}
          onChange={(e) => setFilters({...filters, deliveryTime: e.target.value as FilterOptions['deliveryTime']})}
        >
          <option value="all">All Dates</option>
          <option value="past">Past Deliveries</option>
          <option value="upcoming">Upcoming Deliveries</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="w-auto p-4 bg-white m-4 rounded-2xl">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Supplier Responses</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-2 h-[25px] bg-[#D9D9D9] rounded-md w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-100  rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" color='gray' />
            </button>
            {showFilters && <FilterPanel />}
          </div>
          <div className='relative'>
                <FilterIcon className='w-5 h-5' color='gray' fill='gray'/>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left p-3 text-gray-300 text-[12px]">ID Number</th>
              <th className="text-left p-3 text-gray-300 text-[12px]">Name</th>
              <th className="text-left p-3 text-gray-300 text-[12px]">Pricing</th>
              <th className="text-left p-3 text-gray-300 text-[12px]">Delivery Time</th>
              <th className="text-left p-3 text-gray-300 text-[12px]">Quote</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((supplier, index) => (
              <tr
                key={supplier.id}
                className={``}
              >
                <td className="p-3">{supplier.id}</td>
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.pricing}</td>
                <td className="p-3">{supplier.deliveryTime}</td>
                <td className="p-3 text-blue-500">{supplier.quote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierResponsesTable;