import React, { useState, useEffect } from 'react';
import {
  Sprout, Scale, IndianRupee, MapPin, Truck, Warehouse, FileText,
  CheckCircle2, ArrowLeft, Loader2, Users, ShieldCheck, Layers,
  Landmark, Banknote
} from 'lucide-react';
import { listingsStore } from './listingsstore';

const CROP_OPTIONS = ['Soybean', 'Cotton', 'Tur (Arhar)', 'Chana (Gram)', 'Wheat', 'Jowar', 'Bajra', 'Onion', 'Sugarcane', 'Turmeric', 'Other'];
const FPO_OPTIONS = ['Latur Farmers Producer Company', 'Yavatmal Agri FPO', 'Vidarbha Cotton Growers FPO', 'Other'];
const STORAGE_OPTIONS = ['Own farm storage', 'FPO warehouse', 'Government warehouse (WDRA)', 'Private cold storage', 'Other'];
const GRADE_OPTIONS = ['Grade A', 'Grade B', 'Grade C', 'Ungraded'];
const UNIT_OPTIONS = ['kg', 'quintal', 'tonnes'];

const emptyForm = {
  farmerName: '',
  phoneNumber: '',
  cropName: '',
  customCropName: '',
  variety: '',
  quantityUnit: 'quintal',
  totalQuantity: '',
  minQuantity: '',
  availableFrom: '',
  availableUntil: '',
  photoFile: null,
  certificateFile: null,
  certificateNumber: '',
  selfDeclaredGrade: '',
  isPoolingEnabled: false,
  poolFPO: '',
  poolingPrice: '',
  state: '',
  district: '',
  villageTaluk: '',
  pickupLocation: '',
  storageType: '',
  eNWRFile: null,
  eNWRNumber: '',
  eNWRQuantity: '',
  applyPledgeLoan: false,
  pledgeLoanAmount: '',
  minAskingPrice: '',
  targetPrice: '',
  deliveryMode: 'buyer_pickup',
  maxDeliveryDistance: '',
  packagingDetails: '',
  paymentMethod: 'bank',
  paymentId: '',
  ownershipConfirmed: false
};

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-emerald-600" /> {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all";

function FileDropzone({ id, file, onChange, prompt, hint }) {
  return (
    <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-5 transition-all text-center bg-slate-50/50">
      <FileText className="h-6 w-6 text-slate-400 mx-auto mb-2" />
      <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={onChange} id={id} className="hidden" />
      <label htmlFor={id} className="cursor-pointer block">
        <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block">
          {file ? file.name : prompt}
        </span>
        <span className="text-[11px] text-slate-400 block mt-1">{hint}</span>
      </label>
    </div>
  );
}

export default function CropRegistration({ onBack, onPublished = () => {}, language = 'en' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const unit = formData.quantityUnit;
  const estimatedValue = (parseFloat(formData.minAskingPrice) || 0) * (parseFloat(formData.totalQuantity) || 0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ownershipConfirmed) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const publishedCrop = { ...formData };

    // Writes into the shared, localStorage-backed store — this is what
    // makes the listing show up on BuyerDash and persist across reloads.
    listingsStore.addListing(publishedCrop);

    setIsLoading(false);
    setShowSuccess(true);
    onPublished(publishedCrop);
    setFormData(emptyForm);

    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">

      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors border border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Agricultural Crop Registration</h1>
            <p className="text-slate-500 text-xs">Publish your harvest to the live auction marketplace with full quality and logistics tracking.</p>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
          Market Linkage Form
        </span>
      </div>

      {showSuccess && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3.5 rounded-xl shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">Listing submitted for auction!</p>
            <p className="text-xs text-emerald-600">Your crop details, documents, and pricing have been synced securely.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="md:col-span-2 space-y-6">

          <SectionCard icon={Users} title="1. Farmer / FPO Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name / FPO Name">
                <input type="text" name="farmerName" value={formData.farmerName} onChange={handleInputChange} required placeholder="e.g., Ramesh Patil / Latur FPC" className={inputClass} />
              </Field>
              <Field label="Phone Number">
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required placeholder="e.g., 9876543210" className={inputClass} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={Sprout} title="2. Produce Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Crop / Commodity">
                <select name="cropName" value={formData.cropName} onChange={handleInputChange} required className={inputClass}>
                  <option value="" disabled>Select a crop</option>
                  {CROP_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              {formData.cropName === 'Other' ? (
                <Field label="Specify crop">
                  <input type="text" name="customCropName" value={formData.customCropName} onChange={handleInputChange} required className={inputClass} />
                </Field>
              ) : (
                <Field label="Variety (optional)">
                  <input type="text" name="variety" value={formData.variety} onChange={handleInputChange} placeholder="e.g., JS-335" className={inputClass} />
                </Field>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Total quantity available">
                <div className="relative">
                  <Scale className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="number" name="totalQuantity" value={formData.totalQuantity} onChange={handleInputChange} required min="0" className={`${inputClass} pl-9`} />
                </div>
              </Field>
              <Field label="Unit">
                <select name="quantityUnit" value={formData.quantityUnit} onChange={handleInputChange} className={inputClass}>
                  {UNIT_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </Field>
              <Field label="Minimum quantity to sell">
                <input type="number" name="minQuantity" value={formData.minQuantity} onChange={handleInputChange} min="0" className={inputClass} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Available from">
                <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleInputChange} required className={inputClass} />
              </Field>
              <Field label="Available until / delivery deadline">
                <input type="date" name="availableUntil" value={formData.availableUntil} onChange={handleInputChange} className={inputClass} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="3. Quality Verification">
            <Field label="Produce photo (for AI grading)">
              <FileDropzone
                id="photo-upload"
                file={formData.photoFile}
                onChange={handleFileChange('photoFile')}
                prompt="Click to upload a photo of your produce"
                hint="JPG or PNG, up to 10MB"
              />
            </Field>

            <Field label="Quality testing certificate (optional)">
              <FileDropzone
                id="certificate-upload"
                file={formData.certificateFile}
                onChange={handleFileChange('certificateFile')}
                prompt="Click to upload test certificate"
                hint="PDF, DOCX, or image, up to 10MB"
              />
            </Field>

            {formData.certificateFile ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Certificate / test report number">
                  <input type="text" name="certificateNumber" value={formData.certificateNumber} onChange={handleInputChange} className={inputClass} />
                </Field>
                <Field label="Verification status">
                  <div className="flex items-center h-[38px] px-3 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
                    Pending committee verification
                  </div>
                </Field>
              </div>
            ) : (
              <Field label="Self-declared grade (fallback — no certificate on file)">
                <select name="selfDeclaredGrade" value={formData.selfDeclaredGrade} onChange={handleInputChange} className={inputClass}>
                  <option value="" disabled>Select a grade</option>
                  {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </Field>
            )}
          </SectionCard>

          <SectionCard icon={Layers} title="4. FPO Pooling">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="isPoolingEnabled" className="text-sm font-bold text-slate-800 block cursor-pointer">Add produce to FPO pool</label>
                  <span className="text-xs text-slate-400 block">Combine your lot with other farmers' produce under one FPO listing.</span>
                </div>
                <input type="checkbox" id="isPoolingEnabled" name="isPoolingEnabled" checked={formData.isPoolingEnabled} onChange={handleInputChange} className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500" />
              </div>

              {formData.isPoolingEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 animate-fadeIn">
                  <Field label="Select FPO / pool">
                    <select name="poolFPO" value={formData.poolFPO} onChange={handleInputChange} required={formData.isPoolingEnabled} className={inputClass}>
                      <option value="" disabled>Select a pool</option>
                      {FPO_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label={`Pooling price (₹ per ${unit})`}>
                    <input type="number" name="poolingPrice" value={formData.poolingPrice} onChange={handleInputChange} min="0" required={formData.isPoolingEnabled} className={inputClass} />
                  </Field>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard icon={MapPin} title="5. Location">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="State">
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} required placeholder="e.g., Maharashtra" className={inputClass} />
              </Field>
              <Field label="District">
                <input type="text" name="district" value={formData.district} onChange={handleInputChange} required placeholder="e.g., Latur" className={inputClass} />
              </Field>
              <Field label="Village / Taluk">
                <input type="text" name="villageTaluk" value={formData.villageTaluk} onChange={handleInputChange} required placeholder="e.g., Ausa" className={inputClass} />
              </Field>
            </div>
            <Field label="Pickup / storage location">
              <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} required placeholder="Full address for pickup or storage" className={inputClass} />
            </Field>
          </SectionCard>

          <SectionCard icon={Warehouse} title="6. Storage & Documentation">
            <Field label="Storage location / type">
              <select name="storageType" value={formData.storageType} onChange={handleInputChange} className={inputClass}>
                <option value="" disabled>Select storage type</option>
                {STORAGE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label="Upload eNWR">
              <FileDropzone
                id="enwr-upload"
                file={formData.eNWRFile}
                onChange={handleFileChange('eNWRFile')}
                prompt="Click to upload eNWR document"
                hint="PDF or image, up to 10MB"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="eNWR number">
                <input type="text" name="eNWRNumber" value={formData.eNWRNumber} onChange={handleInputChange} className={inputClass} />
              </Field>
              <Field label={`Quantity covered by eNWR (${unit})`}>
                <input type="number" name="eNWRQuantity" value={formData.eNWRQuantity} onChange={handleInputChange} min="0" className={inputClass} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={Landmark} title="7. MSAMB Pledge Loan">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="applyPledgeLoan" className={`text-sm font-bold block ${formData.eNWRNumber ? 'text-slate-800 cursor-pointer' : 'text-slate-400'}`}>
                    Apply for MSAMB Pledge Loan (against eNWR)
                  </label>
                  <span className="text-xs text-slate-400 block">
                    {formData.eNWRNumber ? 'Borrow against your pledged warehouse receipt.' : 'Enter your eNWR number above to apply for a pledge loan.'}
                  </span>
                </div>
                <input
                  type="checkbox" id="applyPledgeLoan" name="applyPledgeLoan"
                  checked={formData.applyPledgeLoan} onChange={handleInputChange}
                  disabled={!formData.eNWRNumber}
                  className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              {formData.applyPledgeLoan && formData.eNWRNumber && (
                <div className="pt-1 animate-fadeIn">
                  <Field label="Loan amount requested (₹)">
                    <input type="number" name="pledgeLoanAmount" value={formData.pledgeLoanAmount} onChange={handleInputChange} min="0" className={inputClass} />
                  </Field>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard icon={IndianRupee} title="8. Auction / Pricing">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={`Minimum asking price (₹ per ${unit})`}>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="number" name="minAskingPrice" value={formData.minAskingPrice} onChange={handleInputChange} required min="0" className={`${inputClass} pl-9`} />
                </div>
              </Field>
              <Field label={`Preferred / target price (₹ per ${unit}, optional)`}>
                <input type="number" name="targetPrice" value={formData.targetPrice} onChange={handleInputChange} min="0" className={inputClass} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={Truck} title="9. Delivery / Logistics">
            <Field label="Delivery mode">
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'buyer_pickup', label: 'Buyer pickup' },
                  { value: 'farmer_delivery', label: 'Farmer delivery' },
                  { value: 'warehouse_transfer', label: 'Warehouse transfer' }
                ].map(opt => (
                  <label key={opt.value} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${formData.deliveryMode === opt.value ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    <input type="radio" name="deliveryMode" value={opt.value} checked={formData.deliveryMode === opt.value} onChange={handleInputChange} className="hidden" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>

            {formData.deliveryMode === 'farmer_delivery' && (
              <Field label="Maximum delivery distance (km)">
                <input type="number" name="maxDeliveryDistance" value={formData.maxDeliveryDistance} onChange={handleInputChange} min="0" className={inputClass} />
              </Field>
            )}

            <Field label="Loading / packaging details">
              <textarea name="packagingDetails" value={formData.packagingDetails} onChange={handleInputChange} rows={3} placeholder="e.g., 50kg jute bags, tractor-loadable" className={inputClass} />
            </Field>
          </SectionCard>

          <SectionCard icon={Banknote} title="10. Payment Settlement">
            <Field label="Settlement method">
              <div className="flex gap-3">
                {[
                  { value: 'bank', label: 'Bank account' },
                  { value: 'upi', label: 'UPI ID' }
                ].map(opt => (
                  <label key={opt.value} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold cursor-pointer transition-all ${formData.paymentMethod === opt.value ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    <input type="radio" name="paymentMethod" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={handleInputChange} className="hidden" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>
            <Field label={formData.paymentMethod === 'upi' ? 'UPI ID' : 'Bank account number'}>
              <input type="text" name="paymentId" value={formData.paymentId} onChange={handleInputChange} required placeholder={formData.paymentMethod === 'upi' ? 'e.g., ramesh@upi' : 'e.g., 000123456789'} className={inputClass} />
            </Field>
          </SectionCard>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-xl shadow-md p-6 sticky top-24 space-y-6 border border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                Listing Summary
              </h3>

              <div className="space-y-3 text-sm border-b border-slate-800 pb-4">
                <div className="flex justify-between text-slate-400">
                  <span>Crop:</span>
                  <span className="font-mono text-slate-200 text-right">{formData.cropName === 'Other' ? (formData.customCropName || '—') : (formData.cropName || '—')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Quantity:</span>
                  <span className="font-mono text-slate-200">{formData.totalQuantity || 0} {unit}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Min. asking price:</span>
                  <span className="font-mono text-slate-200">₹{(parseFloat(formData.minAskingPrice) || 0).toLocaleString('en-IN')}/{unit}</span>
                </div>
                {formData.isPoolingEnabled && (
                  <div className="flex justify-between text-slate-400">
                    <span>Pooling price:</span>
                    <span className="font-mono text-slate-200">₹{(parseFloat(formData.poolingPrice) || 0).toLocaleString('en-IN')}/{unit}</span>
                  </div>
                )}
                {formData.applyPledgeLoan && formData.eNWRNumber && (
                  <div className="flex justify-between text-slate-400">
                    <span>Pledge loan requested:</span>
                    <span className="font-mono text-slate-200">₹{(parseFloat(formData.pledgeLoanAmount) || 0).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. total value:</span>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-emerald-400 block">
                    ₹{estimatedValue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block italic mt-0.5">Quantity × min. asking price</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <label htmlFor="ownershipConfirmed" className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox" id="ownershipConfirmed" name="ownershipConfirmed"
                  checked={formData.ownershipConfirmed} onChange={handleInputChange}
                  className="h-4 w-4 mt-0.5 text-emerald-600 border-slate-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-300">I confirm I own or am authorized to sell this produce.</span>
              </label>
            </div>

            <button
              type="submit" disabled={isLoading || !formData.ownershipConfirmed}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Sprout className="h-4 w-4" />
                  <span>Submit for Auction</span>
                </>
              )}
            </button>

            <button
              type="button" onClick={onBack}
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