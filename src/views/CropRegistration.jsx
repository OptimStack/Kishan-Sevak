import React, { useState, useEffect } from 'react';
import { Sprout, Scale, IndianRupee, MapPin, Truck, Warehouse, FileText, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

const translations = {
  en: {
    heading: "Agricultural Crop Registration",
    subheading: "Publish dynamic harvest allocations to the live marketplace with logistical tracking.",
    badge: "Market Linkage Form",
    successTitle: "Harvest Registered Successfully!",
    successBody: "The crop metrics and silo e-tender blueprints have been synced with MongoDB Atlas.",
    section1: "1. Crop Yield Specifications",
    cropName: "Crop Name",
    cropNamePlaceholder: "e.g., Latur High-Grade Soybean, Bt-Cotton",
    quantity: "Quantity (Quintals)",
    basePrice: "Expected Base Price (Per Quintal)",
    district: "Harvesting District",
    districtPlaceholder: "e.g., Latur, Yavatmal, Nashik",
    section2: "2. Transport & Freight Pooling",
    deliveryCharges: "Mandi Delivery Charges (₹)",
    transportCharges: "Transportation Overhead (₹)",
    poolingLabel: "Enable Freight Pooling",
    poolingHint: "Consolidate vehicle logistics with neighboring farm lots.",
    poolingMandi: "Target Consolidation Hub / APMC Mandi",
    poolingMandiPlaceholder: "e.g., Latur Main APMC Yard",
    section3: "3. Government Silo E-Tendering",
    section3Body: "Directly upload documentation packages to qualify your lot for storage booking slots across state warehousing infrastructure.",
    uploadPrompt: "Click to upload E-Tender Manifest",
    uploadHint: "Supports PDF, DOCX, or Image formats up to 10MB",
    ledgerTitle: "Live Pricing Ledger",
    harvestValue: "Harvest Net Value:",
    deliveryBase: "Mandi Delivery Base:",
    transport: "Logistics Transport:",
    finalPrice: "Final Asking Price:",
    finalPriceNote: "Includes Logistics Math",
    submitting: "Syncing Cluster...",
    submit: "Publish Offer",
    cancel: "Cancel & Return to Dashboard"
  },
  mr: {
    heading: "कृषी पीक नोंदणी",
    subheading: "दळणवळण ट्रॅकिंगसह थेट बाजारपेठेत तुमची कापणी प्रकाशित करा.",
    badge: "बाजार जोडणी फॉर्म",
    successTitle: "कापणी यशस्वीरित्या नोंदवली!",
    successBody: "पीक तपशील आणि गोदाम ई-निविदा कागदपत्रे MongoDB Atlas सह सिंक केली गेली आहेत.",
    section1: "१. पीक उत्पन्न तपशील",
    cropName: "पिकाचे नाव",
    cropNamePlaceholder: "उदा., लातूर उच्च-दर्जाचे सोयाबीन, बीटी-कापूस",
    quantity: "प्रमाण (क्विंटल)",
    basePrice: "अपेक्षित मूळ किंमत (प्रति क्विंटल)",
    district: "कापणीचा जिल्हा",
    districtPlaceholder: "उदा., लातूर, यवतमाळ, नाशिक",
    section2: "२. वाहतूक आणि मालवाहतूक एकत्रीकरण",
    deliveryCharges: "मंडी वितरण शुल्क (₹)",
    transportCharges: "वाहतूक खर्च (₹)",
    poolingLabel: "मालवाहतूक एकत्रीकरण सक्षम करा",
    poolingHint: "शेजारील शेत लॉटसह वाहन दळणवळण एकत्र करा.",
    poolingMandi: "लक्ष्य एकत्रीकरण केंद्र / एपीएमसी मंडई",
    poolingMandiPlaceholder: "उदा., लातूर मुख्य एपीएमसी यार्ड",
    section3: "३. सरकारी गोदाम ई-निविदा",
    section3Body: "राज्य गोदाम पायाभूत सुविधांमध्ये स्टोरेज बुकिंग स्लॉटसाठी कागदपत्रे अपलोड करा.",
    uploadPrompt: "ई-निविदा दस्तऐवज अपलोड करण्यासाठी क्लिक करा",
    uploadHint: "PDF, DOCX किंवा प्रतिमा स्वरूप, 10MB पर्यंत",
    ledgerTitle: "थेट किंमत तक्ता",
    harvestValue: "एकूण कापणी मूल्य:",
    deliveryBase: "मंडी वितरण आधार:",
    transport: "वाहतूक खर्च:",
    finalPrice: "अंतिम विक्री किंमत:",
    finalPriceNote: "दळणवळण गणना समाविष्ट",
    submitting: "सिंक होत आहे...",
    submit: "ऑफर प्रकाशित करा",
    cancel: "रद्द करा आणि डॅशबोर्डवर परत जा"
  },
  hi: {
    heading: "कृषि फसल पंजीकरण",
    subheading: "लॉजिस्टिक ट्रैकिंग के साथ अपनी फसल लाइव मार्केटप्लेस में प्रकाशित करें.",
    badge: "बाजार लिंकेज फॉर्म",
    successTitle: "फसल सफलतापूर्वक पंजीकृत हुई!",
    successBody: "फसल मेट्रिक्स और साइलो ई-टेंडर दस्तावेज़ MongoDB Atlas के साथ सिंक कर दिए गए हैं.",
    section1: "1. फसल उपज विवरण",
    cropName: "फसल का नाम",
    cropNamePlaceholder: "जैसे, लातूर उच्च-श्रेणी सोयाबीन, बीटी-कपास",
    quantity: "मात्रा (क्विंटल)",
    basePrice: "अपेक्षित आधार मूल्य (प्रति क्विंटल)",
    district: "कटाई का जिला",
    districtPlaceholder: "जैसे, लातूर, यवतमाल, नासिक",
    section2: "2. परिवहन और माल ढुलाई पूलिंग",
    deliveryCharges: "मंडी डिलीवरी शुल्क (₹)",
    transportCharges: "परिवहन शुल्क (₹)",
    poolingLabel: "माल ढुलाई पूलिंग सक्षम करें",
    poolingHint: "पड़ोसी खेत लॉट के साथ वाहन लॉजिस्टिक्स को समेकित करें.",
    poolingMandi: "लक्ष्य समेकन केंद्र / एपीएमसी मंडी",
    poolingMandiPlaceholder: "जैसे, लातूर मुख्य एपीएमसी यार्ड",
    section3: "3. सरकारी साइलो ई-टेंडरिंग",
    section3Body: "राज्य गोदाम अवसंरचना में स्टोरेज बुकिंग स्लॉट के लिए दस्तावेज़ अपलोड करें.",
    uploadPrompt: "ई-टेंडर दस्तावेज़ अपलोड करने के लिए क्लिक करें",
    uploadHint: "PDF, DOCX या छवि प्रारूप, 10MB तक समर्थित",
    ledgerTitle: "लाइव मूल्य निर्धारण खाता",
    harvestValue: "कुल फसल मूल्य:",
    deliveryBase: "मंडी डिलीवरी आधार:",
    transport: "परिवहन शुल्क:",
    finalPrice: "अंतिम मांग मूल्य:",
    finalPriceNote: "लॉजिस्टिक्स गणना शामिल",
    submitting: "सिंक हो रहा है...",
    submit: "ऑफर प्रकाशित करें",
    cancel: "रद्द करें और डैशबोर्ड पर वापस जाएं"
  }
};

export default function CropRegistration({ onBack, onPublished = () => {}, language = 'en' }) {
  const t = translations[language] || translations.en;

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  useEffect(() => {
    const qtl = parseFloat(formData.quantity) || 0;
    const base = parseFloat(formData.basePrice) || 0;
    const delivery = parseFloat(formData.deliveryCharges) || 0;
    const transport = parseFloat(formData.transportationCharges) || 0;

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
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, siloTenderFile: file }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const publishedCrop = { ...formData };

    setIsLoading(false);
    setShowSuccess(true);
    onPublished(publishedCrop);

    setFormData({
      cropName: '', quantity: '', basePrice: '', district: '',
      isPoolingEnabled: false, poolingMandi: '', deliveryCharges: '',
      transportationCharges: '', finalAskingPrice: 0, siloTenderFile: null
    });

    // Show the confirmation briefly, then hand control back to the dashboard.
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">

      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors border border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t.heading}</h1>
            <p className="text-slate-500 text-xs">{t.subheading}</p>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
          {t.badge}
        </span>
      </div>

      {showSuccess && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3.5 rounded-xl shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">{t.successTitle}</p>
            <p className="text-xs text-emerald-600">{t.successBody}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="md:col-span-2 space-y-6">

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Sprout className="h-4 w-4 text-emerald-600" /> {t.section1}
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.cropName}</label>
              <input
                type="text" name="cropName" value={formData.cropName} onChange={handleInputChange} required
                placeholder={t.cropNamePlaceholder}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.quantity}</label>
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.basePrice}</label>
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
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.district}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text" name="district" value={formData.district} onChange={handleInputChange} required
                  placeholder={t.districtPlaceholder}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-600" /> {t.section2}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.deliveryCharges}</label>
                <input
                  type="number" name="deliveryCharges" value={formData.deliveryCharges} onChange={handleInputChange} min="0"
                  placeholder="e.g., 1200"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.transportCharges}</label>
                <input
                  type="number" name="transportationCharges" value={formData.transportationCharges} onChange={handleInputChange} min="0"
                  placeholder="e.g., 3500"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="isPoolingEnabled" className="text-sm font-bold text-slate-800 block cursor-pointer">{t.poolingLabel}</label>
                  <span className="text-xs text-slate-400 block">{t.poolingHint}</span>
                </div>
                <input
                  type="checkbox" id="isPoolingEnabled" name="isPoolingEnabled" checked={formData.isPoolingEnabled} onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                />
              </div>

              {formData.isPoolingEnabled && (
                <div className="animate-fadeIn pt-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.poolingMandi}</label>
                  <input
                    type="text" name="poolingMandi" value={formData.poolingMandi} onChange={handleInputChange} required={formData.isPoolingEnabled}
                    placeholder={t.poolingMandiPlaceholder}
                    className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-emerald-600" /> {t.section3}
            </h3>
            <p className="text-xs text-slate-500 leading-normal">{t.section3Body}</p>

            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 transition-all text-center bg-slate-50/50">
              <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <input
                type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange}
                id="silo-tender-upload" className="hidden"
              />
              <label htmlFor="silo-tender-upload" className="cursor-pointer block">
                <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block">
                  {formData.siloTenderFile ? formData.siloTenderFile.name : t.uploadPrompt}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">{t.uploadHint}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-xl shadow-md p-6 sticky top-24 space-y-6 border border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                {t.ledgerTitle}
              </h3>

              <div className="space-y-3 text-sm border-b border-slate-800 pb-4">
                <div className="flex justify-between text-slate-400">
                  <span>{t.harvestValue}</span>
                  <span className="font-mono text-slate-200">
                    ₹{((parseFloat(formData.basePrice) || 0) * (parseFloat(formData.quantity) || 0)).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t.deliveryBase}</span>
                  <span className="font-mono text-slate-200">₹{(parseFloat(formData.deliveryCharges) || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t.transport}</span>
                  <span className="font-mono text-slate-200">₹{(parseFloat(formData.transportationCharges) || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.finalPrice}</span>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-emerald-400 block">
                    ₹{formData.finalAskingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block italic mt-0.5">{t.finalPriceNote}</span>
                </div>
              </div>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <Sprout className="h-4 w-4" />
                  <span>{t.submit}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2 bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-medium border border-slate-800 transition-all block text-center"
            >
              {t.cancel}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}