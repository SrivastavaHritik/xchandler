import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { Search, Filter } from "lucide-react";
import Card from "./ui/Card"; // Adjust the import path as necessary
import Header from "./Header";
import { useState } from "react";
import SupplierResponsesTable from "./SupplierResponse";
import ShippingQuoteCard, {ShippingQuoteProps} from "./Quotes/Quote";
import ContractPreview, {ContractPreviewProps} from "./Quotes/ContractPreview";
import FinalPage from "./FinalPage";
const contractPreviewData: ContractPreviewProps = {
  invoiceNo: "#002121",
  date: "20/12/20",
  dueDate: "30/12/20",
  billedTo: {
    name: "John Doe",
    address: "Address",
    email: "hri@gmail.com",
    phone: "Phone number",
  },
  items: [
    {
      description: "Product Id/Name",
      details: "Item with the features",
      unitCost: 200,
      quantity: "5k",
      amount: 400,
    },
    {
      description: "Product Id/Name",
      details: "Item with the features",
      unitCost: 200,
      quantity: 2,
      amount: 400,
    },
    {
      description: "Product Id/Name",
      details: "Item with the features",
      unitCost: 200,
      quantity: 2,
      amount: 400,
    },
  ],
}
  

const shippingQuotesSampleData = [
  {
    companyName: "Company 1",
    quoteId: "10012",
    date: "01 Jan 2023",
    price: "12333",
    duration: "41 days",
    origin: "Shenzhen",
    destination: "Winnipeg",
    totalAmount: "12,333",
    sections: [
      { title: "Details", co2: "7213.27 kg CO2", amount: "207" },
      { title: "Summary", co2: "18.52 kg CO2", amount: "3731" },
      { title: "Quotation", co2: "7213.27 kg CO2", amount: "5242" },
      { title: "Pricing Details", co2: "18.52 kg CO2", amount: "680" },
      { title: "Delivery", co2: "12.03 kg CO2", amount: "2473" },
    ],
    summaryItems: [
      { code: "CMA-PCH", description: "Pre carriage haulage", amount: "75.00" },
      { code: "CMA-PCSD", description: "Pre carriage haulage", amount: "600.00" },
      { code: "CMA-SBCTO", description: "Scanning by customs, incl other", amount: "30.00" },
      { code: "DFO", description: "DOC FEE ORIGIN", amount: "70.00", unit: "/per lot" },
      { code: "DTC", description: "Import Serenity Container Guar", amount: "40" },
      { code: "EDS", description: "Export Declaration Surcharge", amount: "25.00", unit: "/per lot" },
      { code: "IPS", description: "Destinat,Terminal-Init Ship&Po", amount: "75" },
      { code: "POR", description: "Port and/or Terminal wharfage", amount: "64" },
      { code: "SSE", description: "Sealing service export", amount: "4" },
      { code: "WAR", description: "Extra risk coverage surcharge", amount: "36" },
      { code: "OTHC", description: "Original Terminal Handling Charge", amount: "400" },
    ],
  },
  {
    companyName: "Company 2",
    quoteId: "10013",
    date: "01 Jan 2023",
    price: "12333",
    duration: "41 days",
    origin: "Shenzhen",
    destination: "Winnipeg",
    totalAmount: "12,333",
    sections: [
      { title: "Details", co2: "7213.27 kg CO2", amount: "207" },
      { title: "Summary", co2: "18.52 kg CO2", amount: "3731" },
      { title: "Quotation", co2: "7213.27 kg CO2", amount: "5242" },
      { title: "Pricing Details", co2: "18.52 kg CO2", amount: "680" },
      { title: "Delivery", co2: "12.03 kg CO2", amount: "2473" },
    ],
    summaryItems: [
      { code: "CMA-PCH", description: "Pre carriage haulage", amount: "75.00" },
      { code: "CMA-PCSD", description: "Pre carriage haulage", amount: "600.00" },
      { code: "CMA-SBCTO", description: "Scanning by customs, incl other", amount: "30.00" },
      { code: "DFO", description: "DOC FEE ORIGIN", amount: "70.00", unit: "/per lot" },
      { code: "DTC", description: "Import Serenity Container Guar", amount: "40" },
      { code: "EDS", description: "Export Declaration Surcharge", amount: "25.00", unit: "/per lot" },
      { code: "IPS", description: "Destinat,Terminal-Init Ship&Po", amount: "75" },
      { code: "POR", description: "Port and/or Terminal wharfage", amount: "64" },
      { code: "SSE", description: "Sealing service export", amount: "4" },
      { code: "WAR", description: "Extra risk coverage surcharge", amount: "36" },
      { code: "OTHC", description: "Original Terminal Handling Charge", amount: "400" },
    ],
  },
  {
    companyName: "Company 3",
    quoteId: "10014",
    date: "01 Jan 2023",
    price: "12333",
    duration: "41 days",
    origin: "Shenzhen",
    destination: "Winnipeg",
    totalAmount: "12,333",
    sections: [
      { title: "Details", co2: "7213.27 kg CO2", amount: "207" },
      { title: "Summary", co2: "18.52 kg CO2", amount: "3731" },
      { title: "Quotation", co2: "7213.27 kg CO2", amount: "5242" },
      { title: "Pricing Details", co2: "18.52 kg CO2", amount: "680" },
      { title: "Delivery", co2: "12.03 kg CO2", amount: "2473" },
    ],
    summaryItems: [
      { code: "CMA-PCH", description: "Pre carriage haulage", amount: "75.00" },
      { code: "CMA-PCSD", description: "Pre carriage haulage", amount: "600.00" },
      { code: "CMA-SBCTO", description: "Scanning by customs, incl other", amount: "30.00" },
      { code: "DFO", description: "DOC FEE ORIGIN", amount: "70.00", unit: "/per lot" },
      { code: "DTC", description: "Import Serenity Container Guar", amount: "40" },
      { code: "EDS", description: "Export Declaration Surcharge", amount: "25.00", unit: "/per lot" },
      { code: "IPS", description: "Destinat,Terminal-Init Ship&Po", amount: "75" },
      { code: "POR", description: "Port and/or Terminal wharfage", amount: "64" },
      { code: "SSE", description: "Sealing service export", amount: "4" },
      { code: "WAR", description: "Extra risk coverage surcharge", amount: "36" },
      { code: "OTHC", description: "Original Terminal Handling Charge", amount: "400" },
    ],
  }
]


const lineChartData = [
  { category: "sonar", value: 50 },
  { category: "lidar", value: 80 },
  { category: "FRU", value: 65 },
  { category: "puppy", value: 90 },
];

const barChartData = [
  { name: "A", value: 80 },
  { name: "B", value: 100 },
  { name: "C", value: 90 },
  { name: "D", value: 110 },
  { name: "E", value: 70 },
];

const supplierData = [
  { id: "0122241", name: "P Ramanaia", delivery: "27 Oct", quote: "₹3,50,700" },
  { id: "0136152", name: "Ramu Rao", delivery: "5 Oct", quote: "₹1,50,820" },
  { id: "0657651", name: "Krishna Raju", delivery: "9 Nov", quote: "₹10,700" },
];

const formatYAxis = (tickItem: number) => {
  return `${tickItem}$`;
};

const Dashboard = () => {
  const [price, setPrice] = useState(682);
  const [lowestQuotePercentage, setLowestQuotePercentage] =
    useState("▲  +5.2%");
  const [lowestDeliveryTime, setLowestDeliveryTime] = useState(321);
  const [totalSupplierResponse, setTotalSupplierResponse] = useState<number>(20);
  const[lowestQuote, setLowestQuote] = useState(682.5);
  const [showQuotes, setShowQuotes]  = useState(false)
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuoteProps[]>(shippingQuotesSampleData);

  const sampleData = {
    companyName: "Company 1",
    quoteId: "10012",
    date: "01 Jan 2023",
    price: "12333",
    duration: "41 days",
    origin: "Shenzhen",
    destination: "Winnipeg",
    totalAmount: "12,333",
    sections: [
      { title: "Details", co2: "7213.27 kg CO2", amount: "207" },
      { title: "Summary", co2: "18.52 kg CO2", amount: "3731" },
      { title: "Quotation", co2: "7213.27 kg CO2", amount: "5242" },
      { title: "Pricing Details", co2: "18.52 kg CO2", amount: "680" },
      { title: "Delivery", co2: "12.03 kg CO2", amount: "2473" }
    ],
    summaryItems: [
      { code: "CMA-PCH", description: "Pre carriage haulage", amount: "75.00" },
      { code: "CMA-PCSD", description: "Pre carriage haulage", amount: "600.00" },
      { code: "CMA-SBCTO", description: "Scanning by customs, incl other", amount: "30.00" },
      { code: "DFO", description: "DOC FEE ORIGIN", amount: "70.00", unit: "/per lot" },
      { code: "DTC", description: "Import Serenity Container Guar", amount: "40" },
      { code: "EDS", description: "Export Declaration Surcharge", amount: "25.00", unit: "/per lot" },
      { code: "IPS", description: "Destinat,Terminal-Init Ship&Po", amount: "75" },
      { code: "POR", description: "Port and/or Terminal wharfage", amount: "64" },
      { code: "SSE", description: "Sealing service export", amount: "4" },
      { code: "WAR", description: "Extra risk coverage surcharge", amount: "36" },
      { code: "OTHC", description: "Original Terminal Handling Charge", amount: "400" }
    ]
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b to-white from-blue-100">
      <Header />
      <h1 className="text-[#201D1D] self-center text-[20px] mt-[50px] font-[600]">Supplier Response </h1>
      {/* Summary Cards */}
      <div className="flex w-full justify-between flex-col-3 p-4 gap-8 mb-6">
        <Card className="p-2 flex flex-row bg-white gap-4 justify-between flex-1">
          <div className="flex flex-col">
            <p className="text-gray-500">Lowest Quotes</p>
            <h2 className="text-xl font-bold">${lowestQuote}</h2>
          </div>
          <svg
            width="70"
            height="46"
            viewBox="0 0 70 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="63.8372"
              y="45.5703"
              width="45.5705"
              height="5.82702"
              rx="2.91351"
              transform="rotate(-90 63.8372 45.5703)"
              fill="#E9EDF7"
            />
            <rect
              x="63.8372"
              y="45.5703"
              width="10.8668"
              height="5.82702"
              rx="2.91351"
              transform="rotate(-90 63.8372 45.5703)"
              fill="#2684D9"
            />
            <rect
              x="47.9731"
              y="45.5703"
              width="45.5705"
              height="5.82697"
              rx="2.91349"
              transform="rotate(-90 47.9731 45.5703)"
              fill="#E9EDF7"
            />
            <rect
              x="47.9731"
              y="45.5703"
              width="41.364"
              height="5.82702"
              rx="2.91351"
              transform="rotate(-90 47.9731 45.5703)"
              fill="#2684D9"
            />
            <rect
              x="32.1097"
              y="45.5703"
              width="45.5705"
              height="5.82704"
              rx="2.91352"
              transform="rotate(-90 32.1097 45.5703)"
              fill="#E9EDF7"
            />
            <rect
              x="32.1097"
              y="45.5703"
              width="31.5488"
              height="5.82704"
              rx="2.91352"
              transform="rotate(-90 32.1097 45.5703)"
              fill="#2684D9"
            />
            <rect
              x="16.2463"
              y="45.5703"
              width="45.5705"
              height="5.82705"
              rx="2.91353"
              transform="rotate(-90 16.2463 45.5703)"
              fill="#E9EDF7"
            />
            <rect
              x="16.2463"
              y="45.5703"
              width="23.4863"
              height="5.82704"
              rx="2.91352"
              transform="rotate(-90 16.2463 45.5703)"
              fill="#2684D9"
            />
            <rect
              x="0.382202"
              y="45.5703"
              width="45.5705"
              height="5.82705"
              rx="2.91353"
              transform="rotate(-90 0.382202 45.5703)"
              fill="#E9EDF7"
            />
            <rect
              x="0.382202"
              y="45.5703"
              width="37.508"
              height="5.82705"
              rx="2.91353"
              transform="rotate(-90 0.382202 45.5703)"
              fill="#2684D9"
            />
          </svg>
        </Card>  
        <Card className="p-2 flex flex-row gap-2 bg-white flex-1">  
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="28" fill="#2684D9" />
            <g clip-path="url(#clip0_46_1364)">
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M33.4483 29.3193C35.0466 30.4043 36.1666 31.8743 36.1666 33.8343V37.3343H39.6666C40.3083 37.3343 40.8333 36.8093 40.8333 36.1677V33.8343C40.8333 31.291 36.6683 29.786 33.4483 29.3193Z"
                fill="white"
              />
              <path
                d="M24.4999 28.0013C27.0772 28.0013 29.1666 25.912 29.1666 23.3346C29.1666 20.7573 27.0772 18.668 24.4999 18.668C21.9226 18.668 19.8333 20.7573 19.8333 23.3346C19.8333 25.912 21.9226 28.0013 24.4999 28.0013Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M31.4999 28.0013C34.0782 28.0013 36.1666 25.913 36.1666 23.3346C36.1666 20.7563 34.0782 18.668 31.4999 18.668C30.9516 18.668 30.4382 18.7846 29.9482 18.948C30.9166 20.1496 31.4999 21.678 31.4999 23.3346C31.4999 24.9913 30.9166 26.5196 29.9482 27.7213C30.4382 27.8846 30.9516 28.0013 31.4999 28.0013Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M24.5 29.167C21.385 29.167 15.1666 30.7303 15.1666 33.8337V36.167C15.1666 36.8087 15.6916 37.3337 16.3333 37.3337H32.6666C33.3083 37.3337 33.8333 36.8087 33.8333 36.167V33.8337C33.8333 30.7303 27.615 29.167 24.5 29.167Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_46_1364">
                <rect
                  width="28"
                  height="28"
                  fill="white"
                  transform="translate(14 14)"
                />
              </clipPath>
            </defs>
          </svg>

          <div>
            <p className="text-gray-500">Lowest Delivery Time</p>
            <h2 className="text-xl font-bold">{lowestDeliveryTime}</h2>
          </div>
        </Card>
        <Card className="p-2 bg-[#2684D9] text-[#FFFFFF] flex flex-row gap-2 flex-1">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="28" fill="white" />
            <g clip-path="url(#clip0_46_1344)">
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M33.4483 29.3193C35.0467 30.4043 36.1667 31.8743 36.1667 33.8343V37.3343H39.6667C40.3083 37.3343 40.8333 36.8093 40.8333 36.1677V33.8343C40.8333 31.291 36.6683 29.786 33.4483 29.3193Z"
                fill="#2684D9"
              />
              <path
                d="M24.5 28.0013C27.0773 28.0013 29.1666 25.912 29.1666 23.3346C29.1666 20.7573 27.0773 18.668 24.5 18.668C21.9227 18.668 19.8333 20.7573 19.8333 23.3346C19.8333 25.912 21.9227 28.0013 24.5 28.0013Z"
                fill="#2684D9"
              />
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M31.5 28.0013C34.0783 28.0013 36.1666 25.913 36.1666 23.3346C36.1666 20.7563 34.0783 18.668 31.5 18.668C30.9516 18.668 30.4383 18.7846 29.9483 18.948C30.9166 20.1496 31.5 21.678 31.5 23.3346C31.5 24.9913 30.9166 26.5196 29.9483 27.7213C30.4383 27.8846 30.9516 28.0013 31.5 28.0013Z"
                fill="#2684D9"
              />
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M24.5 29.167C21.385 29.167 15.1667 30.7303 15.1667 33.8337V36.167C15.1667 36.8087 15.6917 37.3337 16.3333 37.3337H32.6667C33.3083 37.3337 33.8333 36.8087 33.8333 36.167V33.8337C33.8333 30.7303 27.615 29.167 24.5 29.167Z"
                fill="#2684D9"
              />
            </g>
            <defs>
              <clipPath id="clip0_46_1344">
                <rect
                  width="28"
                  height="28"
                  fill="white"
                  transform="translate(14 14)"
                />
              </clipPath>
            </defs>
          </svg>

          <div>
            <p className="text-[#FFFFFF] ">Total Suppliers</p>
            <h2 className="text-xl font-bold">{totalSupplierResponse}</h2>
            
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid bg-white rounded-xl m-4 grid-cols-1 gap-2">
        {/* Line Chart */}
        <Card className="flex flex-col gap-14">
          <div className="flex flex-col">
            <div className="text-4xl">${price}</div>
            <div className="flex flex-row gap-5">
              <div className="text-[#A3AED0]">Lowest quote</div>
              <div className="text-green-400">{lowestQuotePercentage}</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={730}
              height={250}
              data={lineChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="category" />
              <YAxis tickFormatter={formatYAxis} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                strokeWidth={5}
                stroke="#2684D9"
                fillOpacity={1}
                fill="#e9f5ff"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <h1 className="text-center text-2xl font-bold ">Best Quote</h1>
      {showQuotes && <SupplierResponsesTable/>}
      {!showQuotes && 
      <div className="flex px-5 flex-col gap-4">
        <div className="flex justify-between flex-row ">
          <button className="bg-[#2684D9] px-[20px] py-[8px] text-white font-bold w-[373px] rounded-3xl">Featured</button>
          <button className="bg-white border border-gray-300 px-[20px] py-[8px] text-[#2684D9]  w-[373px] rounded-2xl">Cheapest</button>
          <button className="bg-white border border-gray-300 px-[20px] py-[8px] text-[#2684D9]  w-[373px] rounded-2xl">Fastest</button>
        </div>
        {shippingQuotes.map((quote, index) => (
          <ShippingQuoteCard key={index} {...quote} />
        ))}
      </div>
      
      }
      <FinalPage/>
    </div>
  );
};

export default Dashboard;
