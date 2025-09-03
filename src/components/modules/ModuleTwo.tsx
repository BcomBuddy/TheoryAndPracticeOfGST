import React, { useState } from 'react';
import { Calculator, BookOpen, TrendingUp } from 'lucide-react';

const ModuleTwo: React.FC = () => {
  const [saleValue, setSaleValue] = useState('50000');
  const [saleState, setSaleState] = useState('same');
  const [serviceValue, setServiceValue] = useState('25000');
  const [returnValue, setReturnValue] = useState('5000');
  const [returnType, setReturnType] = useState('sales');

  const definitions = [
    {
      term: "Intrastate Supply",
      definition: "Supply of goods or services within the same state, attracting CGST + SGST."
    },
    {
      term: "Interstate Supply", 
      definition: "Supply of goods or services between different states, attracting IGST."
    },
    {
      term: "CGST (Central GST)",
      definition: "GST component collected by Central Government on intrastate supplies."
    },
    {
      term: "SGST (State GST)",
      definition: "GST component collected by State Government on intrastate supplies."
    },
    {
      term: "IGST (Integrated GST)",
      definition: "Single GST component collected by Central Government on interstate supplies."
    },
    {
      term: "Tax Invoice",
      definition: "Document issued by registered supplier containing details of supply and tax charged."
    }
  ];

  const calculateSupplyTax = () => {
    const value = parseFloat(saleValue) || 0;
    const rate = 18; // Standard rate for demonstration
    
    if (saleState === 'same') {
      const cgst = (value * rate) / 200; // 9% CGST
      const sgst = (value * rate) / 200; // 9% SGST
      const total = value + cgst + sgst;
      return { cgst, sgst, igst: 0, total, type: 'Intrastate' };
    } else {
      const igst = (value * rate) / 100; // 18% IGST
      const total = value + igst;
      return { cgst: 0, sgst: 0, igst, total, type: 'Interstate' };
    }
  };

  const calculateReturn = () => {
    const value = parseFloat(returnValue) || 0;
    const rate = 18;
    const taxAmount = (value * rate) / 100;
    return { value, taxAmount };
  };

  const supplyTax = calculateSupplyTax();
  const returnCalculation = calculateReturn();

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
          <h2 className="text-2xl font-bold text-gray-900">GST Supply Recording Simulator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Supply Recording */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Record Supply Transaction</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Value (₹)
                </label>
                <input
                  type="number"
                  value={saleValue}
                  onChange={(e) => setSaleValue(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter sale value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supply Type
                </label>
                <select
                  value={saleState}
                  onChange={(e) => setSaleState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="same">Within Same State (Intrastate)</option>
                  <option value="different">Different State (Interstate)</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Tax Calculation ({supplyTax.type}):</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Taxable Value:</strong> ₹{parseFloat(saleValue).toLocaleString('en-IN')}</p>
                <p><strong>GST Rate:</strong> 18%</p>
                {saleState === 'same' ? (
                  <>
                    <p><strong>CGST (9%):</strong> ₹{supplyTax.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                    <p><strong>SGST (9%):</strong> ₹{supplyTax.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  </>
                ) : (
                  <p><strong>IGST (18%):</strong> ₹{supplyTax.igst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                )}
                <p className="font-semibold text-green-800 border-t border-green-300 pt-2 mt-2">
                  <strong>Total Invoice Value:</strong> ₹{supplyTax.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Returns Processing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Purchase/Sales Returns</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Value (₹)
                </label>
                <input
                  type="number"
                  value={returnValue}
                  onChange={(e) => setReturnValue(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter return value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Type
                </label>
                <select
                  value={returnType}
                  onChange={(e) => setReturnType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="sales">Sales Return</option>
                  <option value="purchase">Purchase Return</option>
                </select>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">Return Processing:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Return Value:</strong> ₹{returnCalculation.value.toLocaleString('en-IN')}</p>
                <p><strong>Tax Component:</strong> ₹{returnCalculation.taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p><strong>Action Required:</strong> {returnType === 'sales' ? 'Issue Credit Note' : 'Issue Debit Note'}</p>
                <p><strong>ITC Impact:</strong> {returnType === 'sales' ? 'Reverse Output Tax' : 'Reverse Input Credit'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Rate Hierarchy */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">GST Tax Rate Structure</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { rate: '0%', items: 'Essential items (Rice, Wheat)' },
              { rate: '5%', items: 'Basic necessities (Sugar, Tea)' },
              { rate: '12%', items: 'Standard goods (Processed foods)' },
              { rate: '18%', items: 'Most goods & services' },
              { rate: '28%', items: 'Luxury items (Cars, AC)' }
            ].map((tier, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-center">
                <div className="text-lg font-bold text-gray-900">{tier.rate}</div>
                <div className="text-xs text-gray-600 mt-1">{tier.items}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleTwo;