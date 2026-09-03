import React, { useState, useEffect } from 'react';
import { Sprout, Scale, IndianRupee, MapPin, Truck, Warehouse, FileText, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

export default function CropRegistration({ onBack, language = 'en' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form Fields State Nodes
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    basePrice: '',
    district: '',
    isPoolingEnabled: false,
    poolingMandi: '',
    deliveryCharges: '',
    transportationCharges: '',
    finalAskingPrice: 0,
    siloTenderFile: null
  });

  // Automatically calculate the Final Asking Price whenever dependencies update
  useEffect(() => {
    const qtl = parseFloat(formData.quantity) || 0;
    const base = parseFloat(formData.basePrice) || 0;
    const delivery = parseFloat(formData.deliveryCharges) || 0;
    const transport = parseFloat(formData.transportationCharges) || 0;

    // Financial formulation: (Base Price * Quantity) + Delivery + Transport
    const totalHarvestValue = base * qtl;
    const computedTotal = totalHarvestValue + delivery + transport;

    setFormData(prev => ({ ...prev, finalAskingPrice: computedTotal }));
  }, [formData.quantity, formData.basePrice, formData.deliveryCharges, formData.transportationCharges]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, siloTenderFile: e.target.files[0] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating full-stack Multi-part form-data dispatch directly to Flask/MongoDB
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setShowSuccess(true);
    
    // Clear form fields
    setFormData({
      cropName: '', quantity: '', basePrice: '', district: '',
      isPoolingEnabled: false, poolingMandi: '', deliveryCharges: '',
      transportationCharges: '', finalAskingPrice: 0, siloTenderFile: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Navigation and Header Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors border border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Agricultural Crop Registration</h1>
            <p className="text-slate-500 text-xs">Publish dynamic harvest allocations to the live marketplace with logistical tracking.</p>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
          Market Linkage Form
        </span>
      </div>

      {/* Success Notification Banner */}
      {showSuccess && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3.5 rounded-xl shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">Harvest Registered Successfully!</p>
            <p className="text-xs text-emerald-600">The crop metrics and silo e-tender blueprints have been synced with MongoDB Atlas.</p>
          </div>
        </div>
      )}

      {/* Primary Registry Form Workspace */}
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Fields input grid layout */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card Module 1: Basic Yield Metadata */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Sprout className="h-4 w-4 text-emerald-600" /> 1. Crop Yield Specifications
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Crop Name</label>
              <input 
                type="text" name="cropName" value={formData.cropName} onChange={handleInputChange} required
                placeholder="e.g., Latur High-Grade Soybean, Bt-Cotton"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Quantity (Quintals)</label>
                <div className="relative">
                  <Scale className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required min="1"
                    placeholder="e.g., 50"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Expected Base Price (Per Quintal)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} required min="1"
                    placeholder="e.g., 4800"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Harvesting District</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="text" name="district" value={formData.district} onChange={handleInputChange} required
                  placeholder="e.g., Latur, Yavatmal, Nashik"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

                    {/* Card Module 2: Logistics & Pooling Configurations */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-600" /> 2. Transport & Freight Pooling
            </h3>

            {/* Logistics Input Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Mandi Delivery Charges (₹)</label>
                <input 
                  type="number" name="deliveryCharges" value={formData.deliveryCharges} onChange={handleInputChange} min="0"
                  placeholder="e.g., 1200"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Transportation Overhead (₹)</label>
                <input 
                  type="number" name="transportationCharges" value={formData.transportationCharges} onChange={handleInputChange} min="0"
                  placeholder="e.g., 3500"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Freight Pooling Selection Component */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-slate-800 block">Enable Freight Pooling</label>
                  <span className="text-xs text-slate-400 block">Consolidate vehicle logistics with neighboring farm lots.</span>
                </div>
                <input 
                  type="checkbox" name="isPoolingEnabled" checked={formData.isPoolingEnabled} onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                />
              </div>

              {formData.isPoolingEnabled && (
                <div className="animate-fadeIn pt-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Target Consolidation Hub / APMC Mandi</label>
                  <input 
                    type="text" name="poolingMandi" value={formData.poolingMandi} onChange={handleInputChange} required={formData.isPoolingEnabled}
                    placeholder="e.g., Latur Main APMC Yard"
                    className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Card Module 3: State Silo E-Tendering Framework */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-emerald-600" /> 3. Government Silo E-Tendering
            </h3>
            <p className="text-xs text-slate-500 leading-normal">
              Directly upload documentation packages to qualify your lot for storage booking slots across state warehousing infrastructure.
            </p>

            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 transition-all text-center bg-slate-50/50">
              <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <input 
                type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange}
                id="silo-tender-upload" className="hidden"
              />
              <label htmlFor="silo-tender-upload" className="cursor-pointer block">
                <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block">
                  {formData.siloTenderFile && formData.siloTenderFile[0] ? formData.siloTenderFile[0].name : "Click to upload E-Tender Manifest"}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Supports PDF, DOCX, or Image formats up to 10MB</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Sticky Pricing Ledger & Process Submission */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-xl shadow-md p-6 sticky top-24 space-y-6 border border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                Live Pricing Ledger
              </h3>
              
              {/* Computational Itemization Stack */}
              <div className="space-y-3 text-sm border-b border-slate-800 pb-4">
                <div className="flex justify-between text-slate-400">
                  <span>Harvest Net Value:</span>
                  <span className="font-mono text-slate-200">
                    ₹{((parseFloat(formData.basePrice) || 0) * (parseFloat(formData.quantity) || 0)).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Mandi Delivery Base:</span>
                  <span className="font-mono text-slate-200">₹{(parseFloat(formData.deliveryCharges) || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Logistics Transport:</span>
                  <span className="font-mono text-slate-200">₹{(parseFloat(formData.transportationCharges) || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total Aggregate Value Display */}
              <div className="pt-4 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Final Asking Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-emerald-400 block">
                    ₹{formData.finalAskingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block italic mt-0.5">Includes Logistics Math</span>
                </div>
              </div>
            </div>

            {/* Submission Triggers */}
            <button 
              type="submit" disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Syncing Cluster...</span>
                </>
              ) : (
                <>
                  <Sprout className="h-4 w-4" />
                  <span>Publish Offer</span>
                </>
              )}
            </button>
            
            {/* Navigation link triggers onBack fallback to reverse state layout mapping safely */}
            <button 
              type="button" 
              onClick={onBack}
              className="w-full py-2 bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-medium border border-slate-800 transition-all block text-center"
            >
              Cancel & Return to Dashboard
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

