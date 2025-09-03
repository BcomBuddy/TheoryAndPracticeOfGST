import React, { useState } from 'react';
import { Calculator, BookOpen, FileCheck } from 'lucide-react';

const ModuleThree: React.FC = () => {
  const [compositionTurnover, setCompositionTurnover] = useState('150000');
  const [exportValue, setExportValue] = useState('200000');
  const [importValue, setImportValue] = useState('80000');
  const [importDuty, setImportDuty] = useState('12000');
  const [adjustment, setAdjustment] = useState('8000');
  const [adjustmentType, setAdjustmentType] = useState('increase');

  const definitions = [
    {
      term: "Composition Scheme",
      definition: "Simplified GST scheme for small taxpayers with lower tax rates but no input tax credit."
    },
    {
      term: "Zero-Rated Supply",
      definition: "Exports and supplies to SEZ, taxed at 0% with full input tax credit refund."
    },
    {
      term: "Mixed Supply",
      definition: "Supply of multiple items with different tax rates, taxed at highest applicable rate."
    },
    {
      term: "Composite Supply",
      definition: "Supply of multiple items where one is principal, all taxed at principal item's rate."
    },
    {
      term: "GSTR-1",
      definition: "Monthly/quarterly return for outward supplies filed by regular taxpayers."
    },
    {
      term: "GSTR-3B",
      definition: "Monthly summary return showing tax liability and payment details."
    }
  ];

  const calculateComposition = () => {
    const turnover = parseFloat(compositionTurnover) || 0;
    const compositionRate = 1; // 1% for traders
    const tax = (turnover * compositionRate) / 100;
    const regularTax = (turnover * 18) / 100; // Regular GST
    const savings = regularTax - tax;
    return { tax, regularTax, savings };
  };

  const calculateExport = () => {
    const value = parseFloat(exportValue) || 0;
    const gstRate = 0; // Zero-rated
    const gstAmount = (value * gstRate) / 100;
    return { value, gstAmount, status: 'Zero-rated supply' };
  };

  const calculateImport = () => {
    const value = parseFloat(importValue) || 0;
    const duty = parseFloat(importDuty) || 0;
    const assessableValue = value + duty;
    const igst = (assessableValue * 18) / 100;
    const totalCost = assessableValue + igst;
    return { assessableValue, igst, totalCost };
  };

  const calculateAdjustment = () => {
    const amount = parseFloat(adjustment) || 0;
    const multiplier = adjustmentType === 'increase' ? 1 : -1;
    const netAdjustment = amount * multiplier;
    return { amount, netAdjustment };
  };

  const compositionCalc = calculateComposition();
  const exportCalc = calculateExport();
  const importCalc = calculateImport();
  const adjustmentCalc = calculateAdjustment();

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
          <h2 className="text-2xl font-bold text-gray-900">Advanced GST Calculations</h2>
        </div>

        <div className="space-y-8">
          {/* Composition Scheme */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Composition Scheme Calculator</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Turnover (₹)
                </label>
                <input
                  type="number"
                  value={compositionTurnover}
                  onChange={(e) => setCompositionTurnover(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter turnover"
                />
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Composition vs Regular:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Composition Tax (1%):</strong> ₹{compositionCalc.tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p><strong>Regular GST (18%):</strong> ₹{compositionCalc.regularTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  <p className="font-semibold text-purple-800 border-t border-purple-300 pt-2">
                    <strong>Tax Savings:</strong> ₹{compositionCalc.savings.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Export/Import */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Export/Import Calculator</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Export Value (₹)
                  </label>
                  <input
                    type="number"
                    value={exportValue}
                    onChange={(e) => setExportValue(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter export value"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Import Value (₹)
                  </label>
                  <input
                    type="number"
                    value={importValue}
                    onChange={(e) => setImportValue(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter import value"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Duty (₹)
                  </label>
                  <input
                    type="number"
                    value={importDuty}
                    onChange={(e) => setImportDuty(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter custom duty"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <h5 className="font-semibold text-green-900 text-sm mb-2">Export Calculation:</h5>
                  <p className="text-sm text-green-800">
                    Export Value: ₹{exportCalc.value.toLocaleString('en-IN')} | 
                    GST: ₹{exportCalc.gstAmount.toLocaleString('en-IN')} | 
                    Status: {exportCalc.status}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <h5 className="font-semibold text-blue-900 text-sm mb-2">Import Calculation:</h5>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>Assessable Value: ₹{importCalc.assessableValue.toLocaleString('en-IN')}</p>
                    <p>IGST (18%): ₹{importCalc.igst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                    <p className="font-semibold">Total Cost: ₹{importCalc.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GST Adjustment */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">GST Adjustment Entry</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adjustment Amount (₹)
                </label>
                <input
                  type="number"
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter adjustment amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adjustment Type
                </label>
                <select
                  value={adjustmentType}
                  onChange={(e) => setAdjustmentType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="increase">Tax Liability Increase</option>
                  <option value="decrease">Tax Liability Decrease</option>
                </select>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-3">Adjustment Processing:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Adjustment Amount:</strong> ₹{adjustmentCalc.amount.toLocaleString('en-IN')}</p>
                <p><strong>Type:</strong> {adjustmentType === 'increase' ? 'Increase Tax Liability' : 'Decrease Tax Liability'}</p>
                <p><strong>Net Effect:</strong> {adjustmentCalc.netAdjustment >= 0 ? '+' : ''}₹{adjustmentCalc.netAdjustment.toLocaleString('en-IN')}</p>
                <p><strong>Entry Required:</strong> {adjustmentType === 'increase' ? 'Additional tax payment' : 'Refund claim or credit note'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleThree;