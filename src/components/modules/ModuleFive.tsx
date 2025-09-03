import React, { useState } from 'react';
import { Calculator, BookOpen, Database } from 'lucide-react';

const ModuleFive: React.FC = () => {
  const [multiService1, setMultiService1] = useState('40000');
  const [multiService2, setMultiService2] = useState('60000');
  const [partialPayment, setPartialPayment] = useState('75000');
  const [totalInvoice, setTotalInvoice] = useState('100000');
  const [reverseChargeValue, setReverseChargeValue] = useState('120000');
  const [reverseChargeType, setReverseChargeType] = useState('legal');

  const definitions = [
    {
      term: "Multiple Services Supply",
      definition: "Single transaction involving supply of different types of services with varying tax rates."
    },
    {
      term: "Partial Payment",
      definition: "Payment received for part of invoice value, with proportionate tax liability arising."
    },
    {
      term: "Reverse Charge Mechanism",
      definition: "Recipient pays GST instead of supplier for specified categories of supplies."
    },
    {
      term: "ERP Integration",
      definition: "Migration of GST data and processes to Enterprise Resource Planning systems."
    },
    {
      term: "Input Tax Credit Set-off",
      definition: "Systematic adjustment of input credits against output tax liabilities."
    },
    {
      term: "Outward Supply Register",
      definition: "Record of all taxable supplies made by registered person during a tax period."
    }
  ];

  const calculateMultipleServices = () => {
    const service1 = parseFloat(multiService1) || 0;
    const service2 = parseFloat(multiService2) || 0;
    
    // Service 1: 18% rate, Service 2: 12% rate
    const tax1 = (service1 * 18) / 100;
    const tax2 = (service2 * 12) / 100;
    const totalValue = service1 + service2;
    const totalTax = tax1 + tax2;
    const grandTotal = totalValue + totalTax;
    
    return { service1, service2, tax1, tax2, totalValue, totalTax, grandTotal };
  };

  const calculatePartialPayment = () => {
    const payment = parseFloat(partialPayment) || 0;
    const invoice = parseFloat(totalInvoice) || 0;
    const paymentRatio = payment / invoice;
    const taxableValue = payment / 1.18; // Assuming 18% GST
    const gstDue = payment - taxableValue;
    
    return { payment, invoice, paymentRatio: paymentRatio * 100, taxableValue, gstDue };
  };

  const calculateReverseCharge = () => {
    const value = parseFloat(reverseChargeValue) || 0;
    const rate = getReverseChargeRate(reverseChargeType);
    const gstAmount = (value * rate) / 100;
    const itcAvailable = gstAmount; // Same amount available as ITC
    const netLiability = gstAmount - itcAvailable;
    
    return { value, rate, gstAmount, itcAvailable, netLiability };
  };

  const getReverseChargeRate = (type: string) => {
    const rates: { [key: string]: number } = {
      'legal': 18,
      'goods_transport': 5,
      'rent': 18,
      'director_services': 18
    };
    return rates[type] || 18;
  };

  const multiServiceCalc = calculateMultipleServices();
  const partialPaymentCalc = calculatePartialPayment();
  const reverseChargeCalc = calculateReverseCharge();

  return (
    <div className="w-full space-y-8">
      {/* Definitions Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center mb-6">
          <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Key Definitions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {definitions.map((item, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">{item.term}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Simulators */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center mb-6">
          <Calculator className="w-6 h-6 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Advanced GST Operations</h2>
        </div>

        <div className="space-y-8">
          {/* Multiple Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Multiple Services Calculator</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consulting Service Value (₹) - 18%
                  </label>
                  <input
                    type="number"
                    value={multiService1}
                    onChange={(e) => setMultiService1(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter consulting value"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hotel Service Value (₹) - 12%
                  </label>
                  <input
                    type="number"
                    value={multiService2}
                    onChange={(e) => setMultiService2(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter hotel value"
                  />
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Multiple Services Calculation:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Consulting (18%):</strong> ₹{multiServiceCalc.service1.toLocaleString('en-IN')} + Tax ₹{multiServiceCalc.tax1.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p><strong>Hotel (12%):</strong> ₹{multiServiceCalc.service2.toLocaleString('en-IN')} + Tax ₹{multiServiceCalc.tax2.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p><strong>Total Value:</strong> ₹{multiServiceCalc.totalValue.toLocaleString('en-IN')}</p>
                  <p><strong>Total Tax:</strong> ₹{multiServiceCalc.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p className="font-semibold text-purple-800 border-t border-purple-300 pt-2">
                    <strong>Grand Total:</strong> ₹{multiServiceCalc.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Partial Payment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Partial Payment Calculator</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Received (₹)
                  </label>
                  <input
                    type="number"
                    value={partialPayment}
                    onChange={(e) => setPartialPayment(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter payment amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Invoice Value (₹)
                  </label>
                  <input
                    type="number"
                    value={totalInvoice}
                    onChange={(e) => setTotalInvoice(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter total invoice"
                  />
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-3">Partial Payment Analysis:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Payment Ratio:</strong> {partialPaymentCalc.paymentRatio.toFixed(1)}%</p>
                  <p><strong>Taxable Value:</strong> ₹{partialPaymentCalc.taxableValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p><strong>GST Component:</strong> ₹{partialPaymentCalc.gstDue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p className="font-semibold text-indigo-800">
                    <strong>Time of Supply:</strong> On receipt of payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reverse Charge */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reverse Charge Mechanism</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Value (₹)
                </label>
                <input
                  type="number"
                  value={reverseChargeValue}
                  onChange={(e) => setReverseChargeValue(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter service value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Category
                </label>
                <select
                  value={reverseChargeType}
                  onChange={(e) => setReverseChargeType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="legal">Legal Services (18%)</option>
                  <option value="goods_transport">Goods Transport (5%)</option>
                  <option value="rent">Rent Services (18%)</option>
                  <option value="director_services">Director Services (18%)</option>
                </select>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">Reverse Charge Calculation:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Service Value:</strong> ₹{reverseChargeCalc.value.toLocaleString('en-IN')}</p>
                <p><strong>GST Rate:</strong> {reverseChargeCalc.rate}%</p>
                <p><strong>GST Payable by Recipient:</strong> ₹{reverseChargeCalc.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p><strong>ITC Available:</strong> ₹{reverseChargeCalc.itcAvailable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p className="font-semibold text-orange-800 border-t border-orange-300 pt-2">
                  <strong>Net Cash Outflow:</strong> ₹{reverseChargeCalc.netLiability.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* ERP Migration Guide */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">ERP Migration Checklist:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">Data Migration:</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• Customer master data</li>
                    <li>• Vendor master data</li>
                    <li>• Product/service catalog</li>
                    <li>• Tax configuration</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Process Setup:</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• Invoice templates</li>
                    <li>• Return filing workflows</li>
                    <li>• ITC reconciliation</li>
                    <li>• Compliance reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleFive;