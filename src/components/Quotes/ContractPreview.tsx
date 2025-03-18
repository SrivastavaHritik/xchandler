import React from 'react';
import { Cloud, Search, Maximize2 } from 'lucide-react';

interface LineItem {
  description: string;
  details: string;
  unitCost: number;
  quantity: number | string;
  amount: number;
}

export interface ContractPreviewProps {
  invoiceNo: string;
  date: string;
  dueDate: string;
  billedTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: LineItem[];
}

const ContractPreview: React.FC<ContractPreviewProps> = ({
  invoiceNo = "#002121",
  date = "20/12/20",
  dueDate = "30/12/20",
  billedTo = {
    name: "John Doe",
    address: "Address",
    email: "mail@email.com",
    phone: "Phone number"
  },
  items = [
    {
      description: "Product Id/Name",
      details: "Item with the features",
      unitCost: 200,
      quantity: "5k",
      amount: 400
    },
    {
      description: "Product Id/Name",
      details: "Item with the features",
      unitCost: 200,
      quantity: 2,
      amount: 400
    },
    {
      description: "Product Id/Name",
      details: "Item with the features",
      unitCost: 200,
      quantity: 2,
      amount: 400
    }
  ]
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = 200;
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#034e91] p-4 text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">Contract Preview</h1>
          <div className="flex gap-4">
            <Cloud className="w-5 h-5" />
            <Search className="w-5 h-5" />
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-gray-500 mb-1">Billed to</h2>
              <h3 className="font-semibold text-lg">{billedTo.name}</h3>
              <p className="text-gray-600">{billedTo.address}</p>
              <p className="text-gray-600">{billedTo.email}</p>
              <p className="text-gray-600">{billedTo.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Invoice No.</p>
              <p className="font-semibold">{invoiceNo}</p>
              <p className="text-gray-500 mt-2">Date</p>
              <p>{date}</p>
              <p className="text-gray-500 mt-2">Invoice Due Date</p>
              <p>{dueDate}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Thank you for your interest in our design and opportunity to quote, we are Pleased to quote as follow
          </p>

          <div className="mb-6">
            <div className="grid grid-cols-4 font-semibold text-gray-600 mb-4">
              <div>Description</div>
              <div className="text-right">Unit Cost</div>
              <div className="text-right">Qty</div>
              <div className="text-right">Amount</div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 mb-4">
                <div>
                  <p className="font-semibold">{item.description}</p>
                  <p className="text-gray-500 text-sm">{item.details}</p>
                </div>
                <div className="text-right">${item.unitCost}</div>
                <div className="text-right">{item.quantity}</div>
                <div className="text-right">${item.amount}</div>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="w-48">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">SubTotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button 
          className="bg-[#378bd7] text-white px-8 py-2 rounded-md transition-colors"
        >
          Approval
        </button>
      </div>
    </div>
  );
};

export default ContractPreview;