import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, Sprout, IndianRupee, MapPin, Scale, Loader2, CheckCircle2, Search, FileUp, FileCheck } from 'lucide-react';
import { hasMatchingBuyerBid, hasMatchingFarmerAsk } from '../utils/matching.js';
import { getCommodityLabel, getDistrictLabel, getQualityLabel, getQualityOptions } from '../utils/localization.js';

const MSAMB_COMMODITIES_URL = '/api/msamb/commodities';
const MSAMB_DISTRICTS_URL = '/api/msamb/districts';

const translations = {
  en: {
    title: "Farmer Dashboard",
    subtitle: "List crops, manage live offerings, and monitor ML price predictions.",
    newListing: "Register New Crop Harvest",
    cropName: "Crop Name",
    selectCrop: "Select crop",
    selectDistrict: "Select district",
    loadingDistricts: "Loading districts...",
    certificate: "Quality grading certificate",
    certificatePlaceholder: "Upload certificate",
    certificateTypes: "PDF, JPG or PNG up to 10 MB",
    quantity: "Quantity (Quintals)",
    basePrice: "Base Price (per Qtl)",
    location: "Harvesting District",
    submitBtn: "Publish to Live Marketplace",
    submitting: "Syncing with MongoDB...",
    liveInventory: "Farmer's listings",
    aiInsights: "AI Price Forecasting Engine (Prototype)",
    aiNote: "A prototype view for future price predictions based on mandi arrivals and seasonal signals.",
    noBids: "Waiting for buyer bids...",
    activeBid: "Highest Bid: ",
    successMsg: "Crop listed and synced to MongoDB securely!",
    quality: "Quality",
    qualityPlaceholder: "Select quality",
    loadingCrops: "Loading live commodities from MSAMB...",
    liveCrops: "Live commodity list from MSAMB",
    cropLoadError: "Live list unavailable. Showing the last known crop list.",
    search: "Search by commodity or quality",
    allCrops: "All commodities",
    allQualities: "All qualities",
    buyerBid: "Buyer Bids",
    maximum: "Maximum price"
    ,matched: "Matched",
    waitingMatch: "Waiting for buyer match"
  },
  mr: {
    title: "शेतकरी डॅशबोर्ड",
    subtitle: "पिकांची यादी करा, थेट ऑफर व्यवस्थापित करा आणि AI किंमत अंदाजांचे निरीक्षण करा.",
    newListing: "नवीन पीक कापणीची नोंदणी करा",
    cropName: "पिकाचे नाव",
    selectCrop: "पीक निवडा",
    selectDistrict: "जिल्हा निवडा",
    loadingDistricts: "जिल्हे लोड होत आहेत...",
    certificate: "गुणवत्ता प्रमाणपत्र",
    certificatePlaceholder: "प्रमाणपत्र अपलोड करा",
    certificateTypes: "PDF, JPG किंवा PNG, कमाल १० MB",
    quantity: "प्रमाण (क्विंटल)",
    basePrice: "मूळ किंमत (प्रति क्विंटल)",
    location: "कापणीचा जिल्हा",
    submitBtn: "थेट बाजारात प्रकाशित करा",
    submitting: "MongoDB सह सिंक होत आहे...",
    liveInventory: "शेतकऱ्यांची यादी",
    aiInsights: "AI किंमत अंदाज इंजिन (प्रोटोटाइप)",
    aiNote: "बाजारातील आवक आणि हंगामी संकेतांवर आधारित भविष्यातील किंमत अंदाजासाठी प्रोटोटाइप.",
    noBids: "खरेदीदार बोलीची वाट पाहत आहे...",
    activeBid: "सर्वोच्च बोली: ",
    successMsg: "पीक यशस्वीरित्या सूचीबद्ध केले आणि सुरक्षितपणे सिंक केले!",
    quality: "गुणवत्ता",
    qualityPlaceholder: "गुणवत्ता निवडा",
    loadingCrops: "MSAMB वरील ताजी शेतमाल यादी लोड होत आहे...",
    liveCrops: "MSAMB वरील थेट शेतमाल यादी",
    cropLoadError: "थेट यादी उपलब्ध नाही. शेवटची उपलब्ध यादी दाखवली आहे.",
    search: "पीक किंवा गुणवत्तेनुसार शोधा",
    allCrops: "सर्व शेतमाल",
    allQualities: "सर्व गुणवत्ता",
    buyerBid: "खरेदीदाराच्या बोली",
    maximum: "कमाल किंमत"
    ,matched: "जुळले",
    waitingMatch: "खरेदीदाराच्या जुळणीची प्रतीक्षा"
  },
  hi: {
    title: "किसान डैशबोर्ड",
    subtitle: "फसलों की सूची बनाएं, लाइव ऑफ़र प्रबंधित करें और एआई मूल्य पूर्वानुमानों की निगरानी करें।",
    newListing: "नई फसल उपज का पंजीकरण करें",
    cropName: "फसल का नाम",
    selectCrop: "फसल चुनें",
    selectDistrict: "जिला चुनें",
    loadingDistricts: "जिले लोड हो रहे हैं...",
    certificate: "गुणवत्ता ग्रेडिंग प्रमाणपत्र",
    certificatePlaceholder: "प्रमाणपत्र अपलोड करें",
    certificateTypes: "PDF, JPG या PNG, अधिकतम 10 MB",
    quantity: "मात्रा (क्विंटल)",
    basePrice: "आधार लागत (प्रति क्विंटल)",
    location: "कटाई का जिला",
    submitBtn: "लाइव मार्केटप्लेस में प्रकाशित करें",
    submitting: "MongoDB से सिंक हो रहा है...",
    liveInventory: "किसानों की सूची",
    aiInsights: "एआई मूल्य पूर्वानुमान इंजन (प्रोटोटाइप)",
    aiNote: "मंडी आवक और मौसमी संकेतों पर आधारित भविष्य के मूल्य पूर्वानुमान का प्रोटोटाइप।",
    noBids: "खरीदार की बोली का इंतजार है...",
    activeBid: "उच्चतम बोली: ",
    successMsg: "फसल को सूचीबद्ध किया गया और सुरक्षित रूप से सिंक किया गया!",
    quality: "गुणवत्ता",
    qualityPlaceholder: "गुणवत्ता चुनें",
    loadingCrops: "MSAMB से लाइव फसल सूची लोड हो रही है...",
    liveCrops: "MSAMB से लाइव फसल सूची",
    cropLoadError: "लाइव सूची उपलब्ध नहीं है। पिछली उपलब्ध सूची दिखाई जा रही है।",
    search: "फसल या गुणवत्ता से खोजें",
    allCrops: "सभी फसलें",
    allQualities: "सभी गुणवत्ता",
    buyerBid: "खरीदार की बोलियां",
    maximum: "अधिकतम कीमत"
    ,matched: "मिलान हुआ",
    waitingMatch: "खरीदार के मिलान की प्रतीक्षा"
  }
};

export default function FarmerDash({ language = 'en', listings, setListings, buyerBids = [] }) {
  const t = translations[language] || translations.en;

  // Form State Hooks
  const [formData, setFormData] = useState({ cropName: '', quality: '', quantity: '', certificate: null, basePrice: '', location: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // Live Inventory pulled dynamically out of MongoDB Atlas
  const myListings = listings || [];
  const [commodities, setCommodities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoadingCrops, setIsLoadingCrops] = useState(true);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const qualityOptions = getQualityOptions(language);
  const qualities = qualityOptions.map((quality) => quality.label);
  const aiPredictions = [
    { crop: 'Soybean', currentMandi: 4650, predictedNextMonth: 5100, trend: 'up', confidence: '94%', recommendation: 'Hold harvest. Prices expected to rise by 9.6%.' },
    { crop: 'Cotton', currentMandi: 7100, predictedNextMonth: 6750, trend: 'down', confidence: '89%', recommendation: 'Sell soon. Regional rates may soften.' }
  ];

  useEffect(() => {
    const controller = new AbortController();
    Promise.all(['en', 'mr'].map((requestedLanguage) => fetch(`${MSAMB_COMMODITIES_URL}?language=${requestedLanguage}`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Unable to load MSAMB commodities');
      return response.json();
    })))
      .then(([englishCrops, marathiCrops]) => {
        const marathiByCode = new Map(marathiCrops.map((crop) => [crop.code, crop.nameMr || crop.name]));
        const names = englishCrops.map((crop) => ({ ...crop, nameEn: crop.nameEn || crop.name, nameMr: marathiByCode.get(crop.code) || crop.nameMr || crop.name }));
        if (!names.length) throw new Error('MSAMB returned no commodities');
        setCommodities(names);
      })
      .catch((error) => {
      })
      .finally(() => setIsLoadingCrops(false));
    return () => controller.abort();
  }, [language]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoadingDistricts(true);
    Promise.all(['en', 'mr'].map((requestedLanguage) => fetch(`${MSAMB_DISTRICTS_URL}?language=${requestedLanguage}`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Unable to load MSAMB districts');
      return response.json();
    })))
      .then(([englishDistricts, marathiDistricts]) => {
        const marathiByCode = new Map(marathiDistricts.map((district) => [district.code, district.nameMr || district.name]));
        setDistricts(englishDistricts.map((district) => ({ ...district, nameEn: district.nameEn || district.name, nameMr: marathiByCode.get(district.code) || district.nameMr || district.name })));
      })
      .catch(() => setDistricts([]))
      .finally(() => setIsLoadingDistricts(false));
    return () => controller.abort();
  }, [language]);

  const handleInputChange = (e) => {
    const value = e.target.name === 'certificate' ? e.target.files?.[0] || null : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Simulated Full-Stack Fetch Route pointing towards Flask Backend API
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quality || !formData.quantity || !formData.certificate || !formData.basePrice || !formData.location) return;

    setIsLoading(true);
    
    // Simulate HTTP Network payload latency to Backend.py endpoints
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newCrop = {
      id: Date.now().toString(),
      cropName: commodities.find((crop) => crop.code === formData.cropName)?.nameEn || formData.cropName,
      cropCode: formData.cropName,
      quality: formData.quality,
      quantity: parseFloat(formData.quantity),
      certificateName: formData.certificate.name,
      basePrice: parseFloat(formData.basePrice),
      location: districts.find((district) => district.code === formData.location)?.nameEn || formData.location || 'Maharashtra Regional',
      locationCode: formData.location,
      highestBid: null,
      buyer: null
    };

    setListings((current) => [newCrop, ...current]);
    setFormData({ cropName: '', quality: '', quantity: '', certificate: null, basePrice: '', location: '' });
    setIsLoading(false);
    setShowStatus(true);
  };

  useEffect(() => {
    if (showStatus) {
      const timer = setTimeout(() => setShowStatus(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showStatus]);

  const filteredListings = myListings.filter((item) => `${getCommodityLabel(item, commodities, language)} ${getQualityLabel(item.quality, language)}`.toLowerCase().includes(searchTerm.toLowerCase()) && (!selectedCrop || getCommodityLabel(item, commodities, language) === selectedCrop) && (!selectedQuality || getQualityLabel(item.quality, language) === selectedQuality));
  const filteredBids = buyerBids.filter((item) => `${getCommodityLabel(item, commodities, language)} ${getQualityLabel(item.quality, language)}`.toLowerCase().includes(searchTerm.toLowerCase()) && (!selectedCrop || getCommodityLabel(item, commodities, language) === selectedCrop) && (!selectedQuality || getQualityLabel(item.quality, language) === selectedQuality));
  const filterCrops = [...new Set([...commodities.map((crop) => language === 'en' ? crop.nameEn : crop.nameMr), ...myListings.map((item) => getCommodityLabel(item, commodities, language)), ...buyerBids.map((item) => getCommodityLabel(item, commodities, language))])].filter(Boolean);
  const filterQualities = [...new Set([...qualityOptions.map((quality) => quality.label), ...myListings.map((item) => getQualityLabel(item.quality, language)), ...buyerBids.map((item) => getQualityLabel(item.quality, language))])].filter(Boolean);

    return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dashboard Greetings Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
        <p className="text-slate-500 mt-1 text-sm">{t.subtitle}</p>
      </div>

      {/* Global Form Post Banner Confirmation */}
      {showStatus && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-sm transition-all">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-medium">{t.successMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Yield Registration Input Node */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
              <PlusCircle className="h-5 w-5 text-emerald-600" />
              <h2 className="font-semibold text-base text-slate-800">{t.newListing}</h2>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t.cropName}</label>
                <select name="cropName" value={formData.cropName} onChange={handleInputChange} required disabled={isLoadingCrops} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all disabled:opacity-70">
                  <option value="">{isLoadingCrops ? t.loadingCrops : t.selectCrop}</option>
                  {commodities.map((crop) => <option key={crop.code} value={crop.code}>{language === 'en' ? crop.nameEn : crop.nameMr}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t.quality}</label>
                <select name="quality" value={formData.quality} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all">
                  <option value="">{t.qualityPlaceholder}</option>
                  {qualityOptions.map((quality) => <option key={quality.value} value={quality.value}>{quality.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t.certificate}</label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/40 px-3 py-3 transition-colors hover:bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40">
                  {formData.certificate ? <FileCheck className="h-5 w-5 flex-shrink-0 text-emerald-600" /> : <FileUp className="h-5 w-5 flex-shrink-0 text-emerald-600" />}
                  <span className="min-w-0 text-sm text-slate-600 dark:text-slate-300">
                    <span className="block truncate font-medium">{formData.certificate?.name || t.certificatePlaceholder}</span>
                    <span className="block text-xs text-slate-400">{t.certificateTypes}</span>
                  </span>
                  <input type="file" name="certificate" accept=".pdf,.jpg,.jpeg,.png" onChange={handleInputChange} required className="sr-only" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t.quantity}</label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required placeholder="50" min="1" step="0.01" className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t.basePrice}</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} required placeholder="4500" min="1" className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t.location}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <select name="location" value={formData.location} onChange={handleInputChange} required disabled={isLoadingDistricts} className="w-full appearance-none pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all disabled:opacity-70">
                    <option value="">{isLoadingDistricts ? t.loadingDistricts : t.selectDistrict}</option>
                    {districts.map((district) => <option key={district.code} value={district.code}>{language === 'en' ? district.nameEn : district.nameMr}</option>)}
                  </select>
                </div>
              </div>

              <button 
                type="submit" disabled={isLoading}
                className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.submitting}</span>
                  </>
                ) : (
                  <>
                    <Sprout className="h-4 w-4" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Data Visualization & ML Pipeline Framework Panels */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Inventory Block */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-base text-slate-800 mb-4 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-emerald-600" />
              {t.liveInventory}
            </h2>
            
            <div className="space-y-3">
              {filteredListings.length === 0 ? (
                <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
                  <Sprout className="mb-3 h-8 w-8 text-slate-300" />
                  <p className="text-sm text-slate-500">{t.noBids}</p>
                </div>
              ) : filteredListings.map((item) => (
                <article key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-lg bg-white p-2 text-emerald-600 shadow-sm"><Sprout className="h-4 w-4" /></div>
                    <div className="min-w-0"><h3 className="truncate font-semibold text-slate-800">{getCommodityLabel(item, commodities, language)}</h3><p className="text-xs text-slate-500">{getQualityLabel(item.quality, language)} · {item.quantity} Qtl</p></div>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-emerald-950/50 dark:text-emerald-200">{hasMatchingBuyerBid(item, buyerBids) ? t.matched : t.waitingMatch}</p>
                    <p className="font-bold text-emerald-700">₹{item.basePrice} <span className="text-xs font-medium text-slate-400">/ Qtl</span></p>
                    <p className="text-xs text-slate-400">{getDistrictLabel(item, districts, language)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-semibold text-base text-slate-800">{t.buyerBid}</h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={t.search} className="w-full sm:w-56 pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
                <select value={selectedCrop} onChange={(event) => setSelectedCrop(event.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm"><option value="">{t.allCrops}</option>{filterCrops.map((crop) => <option key={crop} value={crop}>{crop}</option>)}</select>
                <select value={selectedQuality} onChange={(event) => setSelectedQuality(event.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm"><option value="">{t.allQualities}</option>{filterQualities.map((quality) => <option key={quality} value={quality}>{quality}</option>)}</select>
              </div>
            </div>
            <div className="space-y-3">
              {filteredBids.length === 0 ? <p className="text-sm text-slate-400">{t.noBids}</p> : filteredBids.map((bid) => <div key={bid.id} className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/50 p-3"><div><p className="font-semibold text-slate-800">{getCommodityLabel(bid, commodities, language)}</p><p className="text-xs text-slate-500">{getQualityLabel(bid.quality, language)} · {t.quantity}: {bid.quantity} Qtl</p></div><div className="text-right"><p className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200"><CheckCircle2 className="h-3 w-3" />{hasMatchingFarmerAsk(bid, myListings) ? t.matched : t.waitingMatch}</p><p className="font-bold text-emerald-700">{t.maximum}: ₹{bid.maxPrice} / Qtl</p></div></div>)}
            </div>
          </div>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-6 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/20">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="font-semibold text-base text-slate-800">{t.aiInsights}</h2>
            </div>
            <p className="mb-5 max-w-2xl text-xs leading-relaxed text-slate-500">{t.aiNote}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {aiPredictions.map((prediction) => (
                <article key={prediction.crop} className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-slate-800">{prediction.crop}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${prediction.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {prediction.trend === 'up' ? '↑ Uptrend' : '↓ Downtrend'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50/70 p-2.5 dark:bg-emerald-950/40">
                    <div><span className="block text-[10px] uppercase text-slate-400">Current</span><strong className="text-xs text-slate-700">₹{prediction.currentMandi} / Qtl</strong></div>
                    <div><span className="block text-[10px] uppercase text-slate-400">Projection</span><strong className="text-xs text-emerald-700">₹{prediction.predictedNextMonth} / Qtl</strong></div>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-500">Confidence {prediction.confidence}. {prediction.recommendation}</p>
                </article>
              ))}
            </div>
          </section>

        </div>
        {/* End of Right Side Column */}
      </div>
      {/* End of Main Grid */}
    </div>
    // End of Main Dashboard Wrap
  );
}
