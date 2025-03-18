import React, { useState } from 'react';

interface SummaryItem {
  id: number;
  text: string;
}

interface Supplier {
  id: number;
  name: string;
  date: string;
  amount: string;
  avatar: string;
  prefix: string;
}

interface MonthlySpending {
  month: string;
  amount: number;
}

interface CompanyInfo {
  name: string;
  id: string;
  date: string;
}

const FinalPage: React.FC = () => {
  const [selectedCompany] = useState<CompanyInfo>({
    name: 'Company 1',
    id: '123456',
    date: '26 Oct 2024'
  });

  const summaryItems: SummaryItem[] = [
    { id: 1, text: 'Increase in temperature' },
    { id: 2, text: 'Loss of oil volume' },
    { id: 3, text: 'Oil degradation due to a high level of stress' },
  ];

  const summaryDescription = 'An inspector found a oil leak appearing in a gearbox. Essential to increase the level filling with new oil with intact properties. Problems identified Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis nisi nec nisi gravida tincidunt.';

  const monthlySpending: MonthlySpending[] = [
    { month: 'Jan', amount: 200 },
    { month: 'Feb', amount: 150 },
    { month: 'Mar', amount: 180 },
    { month: 'Apr', amount: 160 },
    { month: 'May', amount: 150 },
    { month: 'Jun', amount: 270 },
    { month: 'Jul', amount: 180 },
    { month: 'Aug', amount: 240 },
    { month: 'Sep', amount: 160 },
    { month: 'Oct', amount: 180 },
    { month: 'Nov', amount: 170 },
    { month: 'Dec', amount: 190 },
  ];

  const suppliers: Supplier[] = [
    { 
      id: 1, 
      name: 'Alex Manda', 
      date: '12 Oct 2024', 
      amount: '$50123', 
      avatar: 'AM',
      prefix: 'From' 
    },
    { 
      id: 2, 
      name: 'Laura Santos', 
      date: '15 Oct 2024', 
      amount: '$15712', 
      avatar: 'LS',
      prefix: 'To' 
    },
    { 
      id: 3, 
      name: 'Jadon S.', 
      date: '18 Oct 2024', 
      amount: '$20163', 
      avatar: 'JS',
      prefix: 'From' 
    },
  ];

  const maxAmount = Math.max(...monthlySpending.map(month => month.amount));
  const totalSpent = '$682.5';

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          👤
        </div>
        <div>
          <h2 className="text-base font-medium mb-4">Summary</h2>
          <ol className="list-decimal pl-5 mb-4">
            {summaryItems.sort((a, b) => a.id - b.id).map(item => (
              <li key={item.id} className="mb-2 text-sm">{item.text}</li>
            ))}
          </ol>
          <p className="text-sm text-gray-600 leading-relaxed">{summaryDescription}</p>

          <div className="mt-6">
            <span className="text-sm text-gray-500">Total Spent</span>
            <div className="text-2xl font-bold text-gray-900 my-1">{totalSpent}</div>
          </div>

          <div className="mt-6 mb-4">
            <div className="flex items-end h-24 gap-2">
              {monthlySpending.map(month => (
                <div 
                  key={month.month} 
                  className={`flex-1 relative rounded-t ${month.month === 'Jun' ? 'bg-blue-500' : 'bg-blue-100'}`}
                  style={{ height: `${(month.amount / maxAmount) * 100}%` }}
                >
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                    {month.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        {/* Selected Section */}
        <div className="pb-5 border-b border-gray-100">
          <h2 className="text-xl font-medium mb-4">Selected</h2>
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <p className="font-medium">{selectedCompany.name}</p>
            <p className="text-xs text-gray-500">{selectedCompany.id}</p>
            <p className="text-xs text-gray-500">{selectedCompany.date}</p>
          </div>
          <button className="text-blue-500 text-sm text-right w-full">
            View Details →
          </button>
        </div>

        {/* Suppliers Section */}
        <div className="pt-5">
          <h2 className="text-base font-medium mb-4">Featured Suppliers</h2>
          <div className="space-y-4">
            {suppliers.map(supplier => (
              <div key={supplier.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                  {supplier.avatar}
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    <span className="text-gray-500">{supplier.prefix}</span> {supplier.name}
                  </p>
                  <p className="text-xs text-gray-500">{supplier.date}</p>
                </div>
                <div className="text-sm text-green-500 font-medium">
                  {supplier.amount}
                </div>
              </div>
            ))}
          </div>
          <button className="text-blue-500 text-sm text-right w-full mt-4">
            View all →
          </button>
        </div>
      </div>

      {/* Feedback Card */}
      <div className="bg-white rounded-xl shadow-sm p-5 md:col-span-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          👤
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Any Feedback</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm mb-2">How was the experience?</label>
                <textarea 
                  placeholder="Add your learning here..." 
                  className="w-full h-24 border border-gray-200 rounded p-3 text-sm resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm mb-2">How can we improve</label>
                <textarea 
                  placeholder="Add your learning here..." 
                  className="w-full h-24 border border-gray-200 rounded p-3 text-sm resize-none"
                ></textarea>
              </div>
            </div>
            <div>
              <p className="text-sm mb-2">Your rating of LexX</p>
              <div className="flex">
                <button className="flex-1 py-2 bg-gray-100 rounded-l-md">👎</button>
                <button className="flex-1 py-2 bg-blue-500 rounded-r-md">👍</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="md:col-span-2 flex justify-center gap-3 mt-4">
        <button className="px-8 py-2 bg-blue-500 text-white rounded">Skip</button>
        <button className="px-8 py-2 bg-blue-500 text-white rounded">Done</button>
      </div>
    </div>
  );
};

export default FinalPage;