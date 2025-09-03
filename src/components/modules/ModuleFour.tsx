import React, { useState } from 'react';
import { Calculator, BookOpen, MapPin } from 'lucide-react';

const ModuleFour: React.FC = () => {
  const [serviceValue, setServiceValue] = useState('75000');
  const [supplierState, setSupplierState] = useState('Karnataka');
  const [recipientState, setRecipientState] = useState('Maharashtra');
  const [serviceType, setServiceType] = useState('consulting');
  const [cancellationValue, setCancellationValue] = useState('30000');
  const [cancellationReason, setCancellationReason] = useState('customer');

  const definitions = [
    {
      term: "Place of Supply - Services",
      definition: "Location where service is deemed to be provided, determining intrastate or interstate nature."
    },
    {
      term: "Service Cancellation",
      definition: "Reversal of service supply due to non-performance, requiring tax adjustment."
    },
    {
      term: "Intrastate Service Supply",
      definition: "Service provided within same state, attracting CGST + SGST."
    },
    {
      term: "Interstate Service Supply",
      definition: "Service provided across state boundaries, attracting IGST."
    },
    {
      term: "Continuous Supply of Services",
      definition: "Services provided continuously over time with periodic billing cycles."
    },
    {
      term: "Time of Supply - Services",
      definition: "Point in time when service supply occurs for GST purposes, typically on invoice date."
    }
  ];

  const determineServiceTax = () => {
    const value = parseFloat(serviceValue) || 0;
    const isIntrastate = supplierState === recipientState;
    const rate = getServiceRate(serviceType);
    
    if (isIntrastate) {
      const cgst = (value * rate) / 200;
      const sgst = (value * rate) / 200;
      const total = value + cgst + sgst;
      return { cgst, sgst, igst: 0, total, type: 'Intrastate', rate };
    } else {
      const igst = (value * rate) / 100;
      const total = value + igst;
      return { cgst: 0, sgst: 0, igst, total, type: 'Interstate', rate };
    }
  };

  const getServiceRate = (service: string) => {
    const rates: { [key: string]: number } = {
      'consulting': 18,
      'transport': 5,
      'restaurant': 5,
      'hotel': 12,
      'advertising': 18,
      'legal': 18
    };
    return rates[service] || 18;
  };

  const calculateCancellation = () => {
    const value = parseFloat(cancellationValue) || 0;
    const rate = 18;
    const taxReversed = (value * rate) / 100;
    const itcReversed = (value * rate) / 100; // Assuming full ITC was claimed
    return { value, taxReversed, itcReversed };
  };

  const serviceTax = determineServiceTax();
  const cancellationCalc = calculateCancellation();

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
          <h2 className="text-2xl font-bold text-gray-900">Service GST Simulator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Supply Calculator */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Service Supply & Place Determination</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Value (₹)
                </label>
                <input
                  type="number"
                  value={serviceValue}
                  onChange={(e) => setServiceValue(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter service value"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier State
                  </label>
                  <select
                    value={supplierState}
                    onChange={(e) => setSupplierState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient State
                  </label>
                  <select
                    value={recipientState}
                    onChange={(e) => setRecipientState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="consulting">Consulting Services (18%)</option>
                  <option value="transport">Transport Services (5%)</option>
                  <option value="restaurant">Restaurant Services (5%)</option>
                  <option value="hotel">Hotel Services (12%)</option>
                  <option value="advertising">Advertising (18%)</option>
                  <option value="legal">Legal Services (18%)</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Service Tax Calculation ({serviceTax.type}):</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Service Value:</strong> ₹{parseFloat(serviceValue).toLocaleString('en-IN')}</p>
                <p><strong>GST Rate:</strong> {serviceTax.rate}%</p>
                <p><strong>Place of Supply:</strong> {serviceTax.type === 'Intrastate' ? recipientState : 'Interstate'}</p>
                {serviceTax.type === 'Intrastate' ? (
                  <>
                    <p><strong>CGST ({serviceTax.rate/2}%):</strong> ₹{serviceTax.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                    <p><strong>SGST ({serviceTax.rate/2}%):</strong> ₹{serviceTax.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                  </>
                ) : (
                  <p><strong>IGST ({serviceTax.rate}%):</strong> ₹{serviceTax.igst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                )}
                <p className="font-semibold text-green-800 border-t border-green-300 pt-2">
                  <strong>Total Invoice:</strong> ₹{serviceTax.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Service Cancellation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Service Cancellation Handler</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Value to Cancel (₹)
                </label>
                <input
                  type="number"
                  value={cancellationValue}
                  onChange={(e) => setCancellationValue(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter cancellation value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cancellation Reason
                </label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="customer">Customer Request</option>
                  <option value="non-performance">Non-Performance</option>
                  <option value="quality">Quality Issues</option>
                  <option value="payment">Payment Default</option>
                </select>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3">Cancellation Impact:</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Service Value:</strong> ₹{cancellationCalc.value.toLocaleString('en-IN')}</p>
                <p><strong>Tax to Reverse:</strong> ₹{cancellationCalc.taxReversed.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p><strong>ITC to Reverse:</strong> ₹{cancellationCalc.itcReversed.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                <p><strong>Document Required:</strong> Credit Note</p>
                <p><strong>Reason:</strong> {cancellationReason.charAt(0).toUpperCase() + cancellationReason.slice(1).replace('-', ' ')}</p>
              </div>
            </div>

            {/* Tax Rate Setup Guide */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Service Tax Rates Reference:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p><strong>5% Services:</strong></p>
                  <p className="text-gray-600">• Transport, Restaurant</p>
                </div>
                <div className="space-y-1">
                  <p><strong>12% Services:</strong></p>
                  <p className="text-gray-600">• Hotel Accommodation</p>
                </div>
                <div className="space-y-1">
                  <p><strong>18% Services:</strong></p>
                  <p className="text-gray-600">• Consulting, Legal, IT</p>
                </div>
                <div className="space-y-1">
                  <p><strong>28% Services:</strong></p>
                  <p className="text-gray-600">• Luxury services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleFour;