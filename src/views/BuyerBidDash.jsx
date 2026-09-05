import React, { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardList, Filter, IndianRupee, Plus, Search, Sprout, Trash2 } from 'lucide-react';
import { hasMatchingBuyerBid, hasMatchingFarmerAsk } from '../utils/matching.js';
import { getCommodityLabel, getQualityLabel, getQualityOptions } from '../utils/localization.js';

const MSAMB_COMMODITIES_URL = '/api/msamb/commodities';

const translations = {
  en: {
    title: 'Buyer Dashboard',
    subtitle: 'Tell farmers what you need and the maximum price you are ready to pay.',
    postBid: 'Post a buying bid',
    crop: 'Which crop do you want?',
    cropPlaceholder: 'Select a crop',
    quality: 'Required quality',
    qualityPlaceholder: 'Select quality',
    maxPrice: 'Maximum price per quintal',
    maxPricePlaceholder: 'Enter maximum price',
    submit: 'Post buyer bid',
    posted: 'Buyer bids and farmer asks',
    search: 'Search by commodity or quality',
    allCrops: 'All commodities',
    allQualities: 'All qualities',
    farmerAsk: 'Farmer ask',
    buyerBid: 'Your buyer bid',
    farmerAsks: "Farmer's listings",
    yourBids: 'Buyer Bids',
    quantity: 'Quantity',
    location: 'Location',
    matched: 'Matched',
    waitingMatch: 'Waiting for match',
    noBids: 'No buyer bids posted yet.',
    price: 'Maximum price',
    remove: 'Remove bid',
    success: 'Buyer bid posted successfully.',
    required: 'Please select a crop, choose a quality, and enter a maximum price.',
    loadingCrops: 'Loading live commodities from MSAMB...',
    liveCrops: 'Live commodity list from MSAMB',
    cropLoadError: 'Live list unavailable. Showing the last known crop list.',
    crops: ['Soybean', 'Cotton', 'Onion', 'Turmeric', 'Wheat', 'Maize'],
    qualities: ['Premium', 'Grade A', 'Grade B', 'Standard']
  },
  mr: {
    title: 'खरेदीदार डॅशबोर्ड',
    subtitle: 'तुम्हाला काय हवे आहे आणि तुम्ही देऊ शकणारी कमाल किंमत शेतकऱ्यांना सांगा.',
    postBid: 'खरेदीची बोली पोस्ट करा',
    crop: 'तुम्हाला कोणते पीक हवे आहे?',
    cropPlaceholder: 'पीक निवडा',
    quality: 'आवश्यक गुणवत्ता',
    qualityPlaceholder: 'गुणवत्ता निवडा',
    maxPrice: 'प्रति क्विंटल कमाल किंमत',
    maxPricePlaceholder: 'कमाल किंमत टाका',
    submit: 'खरेदीदाराची बोली पोस्ट करा',
    posted: 'खरेदी बोली आणि शेतकऱ्यांच्या मागण्या',
    search: 'पीक किंवा गुणवत्तेनुसार शोधा',
    allCrops: 'सर्व शेतमाल',
    allQualities: 'सर्व गुणवत्ता',
    farmerAsk: 'शेतकऱ्याची मागणी',
    buyerBid: 'तुमची खरेदी बोली',
    farmerAsks: 'शेतकऱ्यांची यादी',
    yourBids: 'खरेदीदाराच्या बोली',
    quantity: 'प्रमाण',
    location: 'ठिकाण',
    matched: 'जुळले',
    waitingMatch: 'जुळणीची प्रतीक्षा',
    noBids: 'अद्याप कोणतीही खरेदी बोली पोस्ट केलेली नाही.',
    price: 'कमाल किंमत',
    remove: 'बोली काढा',
    success: 'खरेदीदाराची बोली यशस्वीरित्या पोस्ट केली.',
    required: 'कृपया पीक, गुणवत्ता आणि कमाल किंमत निवडा.',
    loadingCrops: 'MSAMB वरील ताजी शेतमाल यादी लोड होत आहे...',
    liveCrops: 'MSAMB वरील थेट शेतमाल यादी',
    cropLoadError: 'थेट यादी उपलब्ध नाही. शेवटची उपलब्ध यादी दाखवली आहे.',
    crops: ['सोयाबीन', 'कापूस', 'कांदा', 'हळद', 'गहू', 'मका'],
    qualities: ['प्रीमियम', 'ग्रेड A', 'ग्रेड B', 'सामान्य']
  },
  hi: {
    title: 'खरीदार डैशबोर्ड',
    subtitle: 'किसानों को बताएं कि आपको क्या चाहिए और आप अधिकतम कितनी कीमत दे सकते हैं।',
    postBid: 'खरीद बोली पोस्ट करें',
    crop: 'आपको कौन सी फसल चाहिए?',
    cropPlaceholder: 'फसल चुनें',
    quality: 'आवश्यक गुणवत्ता',
    qualityPlaceholder: 'गुणवत्ता चुनें',
    maxPrice: 'प्रति क्विंटल अधिकतम कीमत',
    maxPricePlaceholder: 'अधिकतम कीमत दर्ज करें',
    submit: 'खरीदार की बोली पोस्ट करें',
    posted: 'खरीद बोलियां और किसानों की मांग',
    search: 'फसल या गुणवत्ता से खोजें',
    allCrops: 'सभी फसलें',
    allQualities: 'सभी गुणवत्ता',
    farmerAsk: 'किसान की मांग',
    buyerBid: 'आपकी खरीद बोली',
    farmerAsks: 'किसानों की सूची',
    yourBids: 'खरीदार की बोलियां',
    quantity: 'मात्रा',
    location: 'स्थान',
    matched: 'मिलान हुआ',
    waitingMatch: 'मिलान की प्रतीक्षा',
    noBids: 'अभी तक कोई खरीद बोली पोस्ट नहीं की गई है।',
    price: 'अधिकतम कीमत',
    remove: 'बोली हटाएं',
    success: 'खरीदार की बोली सफलतापूर्वक पोस्ट की गई।',
    required: 'कृपया फसल, गुणवत्ता और अधिकतम कीमत चुनें।',
    loadingCrops: 'MSAMB से लाइव फसल सूची लोड हो रही है...',
    liveCrops: 'MSAMB से लाइव फसल सूची',
    cropLoadError: 'लाइव सूची उपलब्ध नहीं है। पिछली उपलब्ध सूची दिखाई जा रही है।',
    crops: ['सोयाबीन', 'कपास', 'प्याज', 'हल्दी', 'गेहूं', 'मक्का'],
    qualities: ['प्रीमियम', 'ग्रेड A', 'ग्रेड B', 'मानक']
  }
};

const initialForm = { crop: '', quality: '', quantity: '', maxPrice: '' };

const fallbackCrops = {
  en: ['Soybean', 'Cotton', 'Onion', 'Turmeric', 'Wheat', 'Maize'].map((name) => ({ code: name, nameEn: name, nameMr: name })),
  mr: ['सोयाबीन', 'कापूस', 'कांदा', 'हळद', 'गहू', 'मका'].map((name) => ({ code: name, nameEn: name, nameMr: name })),
  hi: ['सोयाबीन', 'कपास', 'प्याज', 'हल्दी', 'गेहूं', 'मक्का'].map((name) => ({ code: name, nameEn: name, nameMr: name }))
};

export default function BuyerBidDash({ language = 'en', farmerListings = [], buyerBids = [], setBuyerBids }) {
  const t = translations[language] || translations.en;
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [crops, setCrops] = useState(fallbackCrops[language] || fallbackCrops.en);
  const [isLoadingCrops, setIsLoadingCrops] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoadingCrops(true);

    Promise.all(['en', 'mr'].map((requestedLanguage) => fetch(`${MSAMB_COMMODITIES_URL}?language=${requestedLanguage}`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Unable to load MSAMB commodities');
      return response.json();
    })))
      .then(([englishCrops, marathiCrops]) => {
        const marathiByCode = new Map(marathiCrops.map((crop) => [crop.code, crop.nameMr || crop.name]));
        const liveCrops = englishCrops.map((crop) => ({ ...crop, nameEn: crop.nameEn || crop.name, nameMr: marathiByCode.get(crop.code) || crop.nameMr || crop.name }));

        if (liveCrops.length === 0) throw new Error('MSAMB returned no commodities');
        setCrops(liveCrops);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setCrops(fallbackCrops[language] || fallbackCrops.en);
        }
      })
      .finally(() => setIsLoadingCrops(false));

    return () => controller.abort();
  }, [language]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.crop || !formData.quality || !formData.quantity || Number(formData.quantity) <= 0 || !formData.maxPrice || Number(formData.maxPrice) <= 0) {
      setStatus({ type: 'error', text: t.required });
      return;
    }

    const selectedCommodity = crops.find((crop) => crop.code === formData.crop);
    setBuyerBids((current) => [{ ...formData, crop: selectedCommodity?.nameEn || selectedCommodity?.nameMr || formData.crop, cropCode: selectedCommodity?.code, quality: formData.quality, id: Date.now().toString() }, ...current]);
    setFormData(initialForm);
    setStatus({ type: 'success', text: t.success });
  };

  const removeBid = (id) => {
    setBuyerBids((current) => current.filter((bid) => bid.id !== id));
  };

  const qualityOptions = getQualityOptions(language);
  const allCrops = [...new Set([...crops.map((crop) => language === 'en' ? crop.nameEn : crop.nameMr), ...farmerListings.map((item) => getCommodityLabel(item, crops, language)), ...buyerBids.map((item) => getCommodityLabel(item, crops, language))])].filter(Boolean);
  const allQualities = [...new Set([...qualityOptions.map((quality) => quality.label), ...farmerListings.map((item) => getQualityLabel(item.quality, language)), ...buyerBids.map((item) => getQualityLabel(item.quality, language))])].filter(Boolean);
  const matchesFilters = (item) => {
    const crop = getCommodityLabel(item, crops, language);
    const quality = getQualityLabel(item.quality, language);
    const matchesSearch = `${crop} ${quality}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && (!selectedCrop || crop === selectedCrop) && (!selectedQuality || quality === selectedQuality);
  };
  const filteredListings = farmerListings.filter(matchesFilters);
  const filteredBids = buyerBids.filter(matchesFilters);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700"><Plus className="h-5 w-5" /></div>
            <h2 className="font-semibold text-slate-800">{t.postBid}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="crop" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{t.crop}</label>
              <select id="crop" name="crop" value={formData.crop} onChange={handleChange} disabled={isLoadingCrops} className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 focus:bg-white disabled:cursor-wait disabled:opacity-70">
                <option value="">{isLoadingCrops ? t.loadingCrops : t.cropPlaceholder}</option>
                {crops.map((crop) => <option key={crop.code} value={crop.code}>{language === 'en' ? crop.nameEn : crop.nameMr}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="quality" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{t.quality}</label>
              <select id="quality" name="quality" value={formData.quality} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 focus:bg-white">
                <option value="">{t.qualityPlaceholder}</option>
                {qualityOptions.map((quality) => <option key={quality.value} value={quality.value}>{quality.label}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{t.quantity} (Qtl)</label>
              <input id="quantity" name="quantity" type="number" min="1" step="0.01" value={formData.quantity} onChange={handleChange} placeholder="Enter required quantity" className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm focus:bg-white" />
            </div>

            <div>
              <label htmlFor="maxPrice" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{t.maxPrice}</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input id="maxPrice" name="maxPrice" type="number" min="1" step="1" value={formData.maxPrice} onChange={handleChange} placeholder={t.maxPricePlaceholder} className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm focus:bg-white" />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">₹ per quintal</p>
            </div>

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700">
              <Sprout className="h-4 w-4" />
              {t.submit}
            </button>

            {status && <p className={`rounded-lg border px-3 py-2.5 text-xs font-medium ${status.type === 'success' ? 'border-emerald-100 bg-emerald-50 text-emerald-800' : 'border-rose-100 bg-rose-50 text-rose-800'}`}>{status.text}</p>}
          </form>
        </section>

        <div className="space-y-6 lg:col-span-3">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <ClipboardList className="h-5 w-5 text-emerald-600" />
              <h2 className="font-semibold text-slate-800">{t.farmerAsks}</h2>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={t.search} className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm" />
            </div>
            <select value={selectedCrop} onChange={(event) => setSelectedCrop(event.target.value)} className="rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm">
              <option value="">{t.allCrops}</option>
              {allCrops.map((crop) => <option key={crop} value={crop}>{crop}</option>)}
            </select>
            <select value={selectedQuality} onChange={(event) => setSelectedQuality(event.target.value)} className="rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm">
              <option value="">{t.allQualities}</option>
              {allQualities.map((quality) => <option key={quality} value={quality}>{quality}</option>)}
            </select>
          </div>

          {filteredListings.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
              <ClipboardList className="mb-3 h-8 w-8 text-slate-300" />
              <p className="text-sm text-slate-500">No farmer asks posted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredListings.map((item) => (
                <article key={`farmer-${item.id}`} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50/70 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-lg bg-white p-2 text-emerald-600 shadow-sm"><Sprout className="h-4 w-4" /></div>
                    <div className="min-w-0"><h3 className="truncate font-semibold text-slate-800">{getCommodityLabel(item, crops, language)}</h3><p className="text-xs text-slate-500">{getQualityLabel(item.quality, language)} · {t.farmerAsk}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right"><p className="mb-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-emerald-950/50 dark:text-emerald-200"><CheckCircle2 className="h-3 w-3" />{hasMatchingBuyerBid(item, buyerBids) ? t.matched : t.waitingMatch}</p><p className="text-xs text-slate-400">{t.quantity}: {item.quantity} Qtl</p><p className="font-bold text-emerald-700">₹{item.basePrice} <span className="text-xs font-medium text-slate-400">/ Qtl</span></p><p className="text-xs text-slate-400">{item.location}</p></div>
                  </div>
                </article>
              ))}
            </div>
          )}
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-6 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/20">
            <div className="mb-5 flex items-center gap-3 border-b border-emerald-100 pb-4 dark:border-emerald-900">
              <ClipboardList className="h-5 w-5 text-emerald-600" />
              <h2 className="font-semibold text-slate-800">{t.yourBids}</h2>
            </div>
            {filteredBids.length === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-emerald-200 bg-white/60 px-6 text-center dark:border-emerald-900 dark:bg-emerald-950/20">
                <ClipboardList className="mb-3 h-8 w-8 text-emerald-300" />
                <p className="text-sm text-slate-500">{t.noBids}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBids.map((bid) => (
                  <article key={`buyer-${bid.id}`} className="flex items-center justify-between gap-4 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
                    <div className="flex min-w-0 items-center gap-3"><div className="rounded-lg bg-white p-2 text-emerald-600 shadow-sm"><Sprout className="h-4 w-4" /></div><div className="min-w-0"><h3 className="truncate font-semibold text-slate-800">{getCommodityLabel(bid, crops, language)}</h3><p className="text-xs text-slate-500">{getQualityLabel(bid.quality, language)} · {t.buyerBid}</p></div></div>
                    <div className="flex items-center gap-3"><div className="text-right"><p className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200"><CheckCircle2 className="h-3 w-3" />{hasMatchingFarmerAsk(bid, farmerListings) ? t.matched : t.waitingMatch}</p><p className="text-xs text-slate-400">{t.quantity}: {bid.quantity} Qtl</p><p className="font-bold text-emerald-700">₹{bid.maxPrice} <span className="text-xs font-medium text-slate-400">/ Qtl</span></p></div><button type="button" onClick={() => removeBid(bid.id)} aria-label={t.remove} title={t.remove} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button></div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
