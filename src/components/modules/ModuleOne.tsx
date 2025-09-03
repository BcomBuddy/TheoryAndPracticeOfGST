import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ModuleOne: React.FC = () => {
  const [taxableValue, setTaxableValue] = useState('100000');
  const [gstRate, setGstRate] = useState('18');
  const [registrationTurnover, setRegistrationTurnover] = useState('2500000');
  const [inputCredit, setInputCredit] = useState('15000');
  const [outputTax, setOutputTax] = useState('25000');

  const calculateGST = () => {
    const value = parseFloat(taxableValue) || 0;
    const rate = parseFloat(gstRate) || 0;
    const gstAmount = (value * rate) / 100;
    const totalAmount = value + gstAmount;
    return { gstAmount, totalAmount };
  };

  const checkRegistration = () => {
    const turnover = parseFloat(registrationTurnover) || 0;
    return turnover >= 2000000;
  };

  const calculateNetTax = () => {
    const input = parseFloat(inputCredit) || 0;
    const output = parseFloat(outputTax) || 0;
    const netTax = Math.max(0, output - input);
    return { input, output, netTax };
  };

  const definitions = [
    {
      term: "GST (Goods and Services Tax)",
      definition: "A comprehensive indirect tax on manufacture, sale and consumption of goods and services throughout India."
    },
    {
      term: "Input Tax Credit (ITC)",
      definition: "Credit of GST paid on inputs used for business purposes, which can be set off against output tax liability."
    },
    {
      term: "Taxable Supply",
      definition: "Supply of goods or services which are subject to GST and not exempted under the Act."
    },
    {
      term: "GSTIN",
      definition: "15-digit unique identification number assigned to every GST registered person."
    },
    {
      term: "Place of Supply",
      definition: "The state or union territory where goods or services are considered to be supplied for tax purposes."
    },
    {
      term: "Reverse Charge",
      definition: "Mechanism where recipient of goods/services pays GST instead of the supplier."
    }
  ];

  const gstCalculation = calculateGST();
  const registrationRequired = checkRegistration();
  const netTaxCalculation = calculateNetTax();

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

      {/* Interactive Simulators Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center mb-6">
          <Calculator className="w-6 h-6 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Interactive Practice</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GST Calculation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">GST Tax Calculation</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taxable Value (₹)
                </label>
                <input
                  type="number"
                  value={taxableValue}
                  onChange={(e) => setTaxableValue(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter taxable value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Rate (%)
                </label>
                <select
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Calculation Steps:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Formula:</strong> GST Amount = Taxable Value × GST Rate ÷ 100</p>
                <p><strong>Step 1:</strong> GST Amount = ₹{taxableValue} × {gstRate}% ÷ 100</p>
                <p><strong>Step 2:</strong> GST Amount = ₹{gstCalculation.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p><strong>Step 3:</strong> Total Amount = ₹{taxableValue} + ₹{gstCalculation.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p className="font-semibold text-green-800"><strong>Final Answer:</strong> ₹{gstCalculation.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {/* Registration Check */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">GST Registration Check</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Turnover (₹)
              </label>
              <input
                type="number"
                value={registrationTurnover}
                onChange={(e) => setRegistrationTurnover(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter annual turnover"
              />
            </div>

            <div className={`rounded-lg p-4 border ${registrationRequired ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <h4 className={`font-semibold mb-3 ${registrationRequired ? 'text-red-900' : 'text-green-900'}`}>
                Registration Analysis:
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>Threshold:</strong> ₹20,00,000 per annum</p>
                <p><strong>Your Turnover:</strong> ₹{parseFloat(registrationTurnover).toLocaleString('en-IN')}</p>
                <p className="font-semibold">
                  <strong>Result:</strong> {registrationRequired ? 'Registration MANDATORY' : 'Registration NOT REQUIRED'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Tax Credit Calculator */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Input Tax Credit Calculation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Input Tax Credit Available (₹)
              </label>
              <input
                type="number"
                value={inputCredit}
                onChange={(e) => setInputCredit(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter input credit"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Output Tax Liability (₹)
              </label>
              <input
                type="number"
                value={outputTax}
                onChange={(e) => setOutputTax(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter output tax"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">ITC Set-off Calculation:</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Formula:</strong> Net Tax = Output Tax - Input Tax Credit</p>
              <p><strong>Step 1:</strong> Output Tax = ₹{netTaxCalculation.output.toLocaleString('en-IN')}</p>
              <p><strong>Step 2:</strong> Input Credit = ₹{netTaxCalculation.input.toLocaleString('en-IN')}</p>
              <p><strong>Step 3:</strong> Net Tax = ₹{netTaxCalculation.output.toLocaleString('en-IN')} - ₹{netTaxCalculation.input.toLocaleString('en-IN')}</p>
              <p className="font-semibold text-blue-800">
                <strong>Net Tax Payable:</strong> ₹{netTaxCalculation.netTax.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleOne;