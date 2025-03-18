import React, { useState } from "react";
import { ChevronDown, ChevronUp, Leaf } from "lucide-react";

interface QuoteSection {
  title: string;
  co2: string;
  amount: string;
}

interface SummaryItem {
  code: string;
  description: string;
  amount: string;
  unit?: string;
}

export interface  ShippingQuoteProps {
  companyLogo?: string;
  companyName: string;
  quoteId: string;
  date: string;
  price: string;
  duration: string;
  origin: string;
  destination: string;
  totalAmount: string;
  sections: QuoteSection[];
  summaryItems: SummaryItem[];
}

const ShippingQuoteCard: React.FC<ShippingQuoteProps> = ({
  companyName,
  companyLogo,
  quoteId,
  date,
  price,
  duration,
  origin,
  destination,
  totalAmount,
  sections,
  summaryItems,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex gap-4 ">
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className={`bg-[#F9FAFB] w-full rounded-lg shadow-sm p-4 mb-4`}>
        {/* Main Card Header */}
        <div className="flex-1 relative mx-4">
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              <span className="text-[#2684d9]">Duration:</span> {duration}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center gap-4">
            <img src={companyLogo} alt="Company Logo" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium">{companyName}</p>
            </div>
          </div>
          <div className="w-[2px] h-[135px] bg-[#D1D5DB]"></div>
          <div className="flex flex-col w-[50%] mx-16 self-start my-5">
            <div className="flex items-center w-full justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full  " />
              <div className="border-gray-300   flex-1 self h-[2px] border-dashed border"></div>
              <div className="rounded-full border border-gray-300 h-7 w-7  "></div>
              <div className="border-gray-300  flex-1 self h-[2px] border-dashed border"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full  " />
              {/* <div className="text-center flex flex-col gap-5">
                <div>
                  <p>{origin}</p>
                </div>
                <div>Id: {quoteId}</div>
              </div>
              <div className="text-center flex flex-col gap-5">
                <div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2" />
                  <p>{destination}</p>
                </div>
                <div>Price: ${price}</div>
              </div> */}
            </div>
            <div className="flex justify-between  relative w-[100%]">
              <p>company</p>
              <p>company</p>
            </div>
            <div className="flex justify-between relative w-[100%]">
              <div>
                <span className="text-[#2684d9]">id:</span>
                {quoteId}
              </div>
              <div>
                <span className="text-[#2684d9]">Date:</span>
                {date}
              </div>
              <div>
                <span className="text-[#2684d9]">Price:</span>
                {price}
              </div>
            </div>
          </div>
          <div className="border border-dashed h-[135px] border-[#D1D5DB]"></div>
          <div className="flex items-center flex-col gap-4">
            <div className="text-xl font-semibold">${totalAmount}</div>
            <div className="flex ">
              <button className="text-blue-500 hover:text-blue-600">
                <span>Request Analysis</span>
              </button>
              <button className="ml-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Accept
              </button>
            </div>
          </div>
        </div>
        {/* Timeline */}
        {/* Info Row */}

        {/* Expandable Sections */}
        {expanded && (
          <div className="mt-4 flex flex-col border-t pt-4">
            {sections.map((section, index) => (
              <div key={section.title} className="mb-2 flex flex-row bg-white border border-[#E5E7EB] rounded-lg">

                <button onClick={() => toggleSection(section.title)} className="w-[5%] p-2 text-left">
                  {!expandedSections[section.title] ? <ChevronDown size={20} />: <ChevronUp size={20} />}
                </button>

                <div className="w-full">
                  <div
                    className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleSection(section.title)}
                  >
                    <div className="flex items-center gap-2">
                      <input type="checkbox" disabled={false} checked className="rounded" />
                      <Leaf className="w-4 h-4" />
                      <span>{section.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">CO₂: {section.co2}</span>
                      <span className="text-blue-500">${section.amount}</span>
                    </div>
                  </div>
                  {/* Summary Section */}
                  {section.title === "Summary" &&
                    expandedSections[section.title] && (
                      <div className="pl-8 pr-4 py-2">
                        {summaryItems.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between py-1 text-sm"
                          >
                            <div>
                              <span className="font-medium">{item.code}</span> -{" "}
                              {item.description}
                            </div>
                            <div className="text-blue-500">
                              ${item.amount}
                              {item.unit ? item.unit : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingQuoteCard;
