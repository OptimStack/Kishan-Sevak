import React, { useState, useSyncExternalStore } from 'react';
import {
  Search, MapPin, Scale, IndianRupee, Gavel, Filter, Building,
  CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Sparkles, X
} from 'lucide-react';
import { listingsStore } from './ListingsStore';

const translations = {
  en: {
    title: "Buyer Dashboard",
    subtitle: "Discover verified produce, place bids, and track fulfilment across Maharashtra.",
    regionLabel: "Market Region",
    regionValue: "Maharashtra, India",
    searchPlaceholder: "Search crops (e.g., Soybean, Cotton, Onion)...",
    filterDistrict: "All Districts",
    live: "LIVE",

    biddingTitle: "Buyer Bidding",
    biddingSubtitle: "Place competitive bids for verified agricultural produce",
    listedBy: "listed by",
    grade: "Grade",
    buyerRequirement: "Buyer Requirement",
    currentBestBid: "Current Best Bid",
    noBids: "No bids yet — starting price applies",
    startingBid: "Starting bid",
    perQtl: "/ Quintal",
    placeBid: "Place Bid",

    progressTitle: "Price Progress",
    progressSubtitle: "Track how much of the required quantity has been supplied",
    fulfilled: "fulfilled",
    orderFulfillment: "Order fulfillment",
    supplied: "Supplied",
    remaining: "Remaining",
    currentBid: "Current Bid",

    mlTitle: "ML-Driven Price Forecast",
    aiBadge: "AI",
    mlSubtitle: "Predicted mandi prices based on historical market data",
    marketsBadge: "Maharashtra Markets",
    verifiedGrade: "Verified Grade",
    rising: "Rising",
    falling: "Falling",
    currentMandiPrice: "Current Mandi Price",
    predictedNextMonth: "Predicted Next Month",
    perQtlShort: "per Quintal",
    predictionConfidence: "Prediction Confidence",
    market: "Market",

    myBidsTitle: "My Bids",
    myBidsSubtitle: "Track the bids you have placed",
    quantity: "Quantity",
    leading: "Leading",

    modalTitle: "Place Your Bid",
    modalRequirement: "Buyer Requirement",
    yourBid: "Your Bid / Quintal",
    minimumPrefix: "Minimum ₹",
    submitBid: "Submit Bid",
    cancel: "Cancel",

    enterBidWarning: "Please enter your bid.",
    lowBidWarningPrefix: "Your bid must be higher than ₹",
    successBid: "Your bid has been transmitted to the farmer's dashboard!"
  },
  mr: {
    title: "खरेदीदार डॅशबोर्ड",
    subtitle: "पडताळणी केलेली उत्पादने शोधा, बोली लावा आणि महाराष्ट्रभर पूर्ततेचा मागोवा घ्या.",
    regionLabel: "बाजार प्रदेश",
    regionValue: "महाराष्ट्र, भारत",
    searchPlaceholder: "पिके शोधा (उदा. सोयाबीन, कापूस, कांदा)...",
    filterDistrict: "सर्व जिल्हे",
    live: "थेट",

    biddingTitle: "खरेदीदार बोली",
    biddingSubtitle: "पडताळणी केलेल्या कृषी उत्पादनांसाठी स्पर्धात्मक बोली लावा",
    listedBy: "यांनी सूचीबद्ध केले",
    grade: "दर्जा",
    buyerRequirement: "खरेदीदाराची आवश्यकता",
    currentBestBid: "सध्याची सर्वोत्तम बोली",
    noBids: "अद्याप कोणतीही बोली नाही — प्रारंभिक किंमत लागू",
    startingBid: "प्रारंभिक बोली",
    perQtl: "/ क्विंटल",
    placeBid: "बोली लावा",

    progressTitle: "किंमत प्रगती",
    progressSubtitle: "आवश्यक प्रमाणापैकी किती पुरवठा झाला याचा मागोवा घ्या",
    fulfilled: "पूर्ण",
    orderFulfillment: "ऑर्डर पूर्तता",
    supplied: "पुरवठा केलेले",
    remaining: "उर्वरित",
    currentBid: "सध्याची बोली",

    mlTitle: "एआय-आधारित किंमत अंदाज",
    aiBadge: "एआय",
    mlSubtitle: "ऐतिहासिक बाजार डेटावर आधारित अंदाजित मंडी किंमती",
    marketsBadge: "महाराष्ट्र बाजार",
    verifiedGrade: "पडताळणी केलेला दर्जा",
    rising: "वाढते",
    falling: "घटते",
    currentMandiPrice: "सध्याची मंडी किंमत",
    predictedNextMonth: "पुढील महिन्याचा अंदाज",
    perQtlShort: "प्रति क्विंटल",
    predictionConfidence: "अंदाज विश्वासार्हता",
    market: "बाजार",

    myBidsTitle: "माझ्या बोली",
    myBidsSubtitle: "तुम्ही लावलेल्या बोलींचा मागोवा घ्या",
    quantity: "प्रमाण",
    leading: "आघाडीवर",

    modalTitle: "तुमची बोली लावा",
    modalRequirement: "खरेदीदाराची आवश्यकता",
    yourBid: "तुमची बोली / क्विंटल",
    minimumPrefix: "किमान ₹",
    submitBid: "बोली सबमिट करा",
    cancel: "रद्द करा",

    enterBidWarning: "कृपया तुमची बोली टाका.",
    lowBidWarningPrefix: "तुमची बोली यापेक्षा जास्त असणे आवश्यक आहे: ₹",
    successBid: "तुमची बोली शेतकऱ्याच्या डॅशबोर्डवर पाठवली गेली आहे!"
  },
  hi: {
    title: "खरीदार डैशबोर्ड",
    subtitle: "सत्यापित उपज खोजें, बोली लगाएं, और महाराष्ट्र भर में आपूर्ति की प्रगति देखें.",
    regionLabel: "बाजार क्षेत्र",
    regionValue: "महाराष्ट्र, भारत",
    searchPlaceholder: "फसलें खोजें (जैसे, सोयाबीन, कपास, प्याज)...",
    filterDistrict: "सभी जिले",
    live: "लाइव",

    biddingTitle: "खरीदार बोली",
    biddingSubtitle: "सत्यापित कृषि उपज के लिए प्रतिस्पर्धी बोली लगाएं",
    listedBy: "द्वारा सूचीबद्ध",
    grade: "ग्रेड",
    buyerRequirement: "खरीदार की आवश्यकता",
    currentBestBid: "वर्तमान सर्वश्रेष्ठ बोली",
    noBids: "अभी तक कोई बोली नहीं — प्रारंभिक कीमत लागू",
    startingBid: "प्रारंभिक बोली",
    perQtl: "/ क्विंटल",
    placeBid: "बोली लगाएं",

    progressTitle: "मूल्य प्रगति",
    progressSubtitle: "देखें कि आवश्यक मात्रा में से कितनी आपूर्ति हुई है",
    fulfilled: "पूर्ण",
    orderFulfillment: "ऑर्डर पूर्ति",
    supplied: "आपूर्ति की गई",
    remaining: "शेष",
    currentBid: "वर्तमान बोली",

    mlTitle: "एआई-संचालित मूल्य पूर्वानुमान",
    aiBadge: "एआई",
    mlSubtitle: "ऐतिहासिक बाजार डेटा पर आधारित अनुमानित मंडी कीमतें",
    marketsBadge: "महाराष्ट्र बाजार",
    verifiedGrade: "सत्यापित ग्रेड",
    rising: "बढ़ रहा",
    falling: "गिर रहा",
    currentMandiPrice: "वर्तमान मंडी कीमत",
    predictedNextMonth: "अगले महीने का अनुमान",
    perQtlShort: "प्रति क्विंटल",
    predictionConfidence: "पूर्वानुमान विश्वसनीयता",
    market: "बाजार",

    myBidsTitle: "मेरी बोलियां",
    myBidsSubtitle: "आपके द्वारा लगाई गई बोलियों को ट्रैक करें",
    quantity: "मात्रा",
    leading: "अग्रणी",

    modalTitle: "अपनी बोली लगाएं",
    modalRequirement: "खरीदार की आवश्यकता",
    yourBid: "आपकी बोली / क्विंटल",
    minimumPrefix: "न्यूनतम ₹",
    submitBid: "बोली जमा करें",
    cancel: "रद्द करें",

    enterBidWarning: "कृपया अपनी बोली दर्ज करें.",
    lowBidWarningPrefix: "आपकी बोली इससे अधिक होनी चाहिए: ₹",
    successBid: "आपकी बोली किसान के डैशबोर्ड पर भेज दी गई है!"
  }
};

export default function BuyerDash({ language = 'en' }) {
  const t = translations[language] || translations.en;

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Bid modal state
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [myBids, setMyBids] = useState([]);

  // Listings now come from the shared, localStorage-backed store — the
  // same data farmers publish via CropRegistration shows up here live,
  // and persists across reloads/tabs of this browser.
  //
  // NOTE ON MODELING: a farmer's listing only records the quantity they
  // have available for sale (`quantity`), not a buyer-side demand figure.
  // Until there's a real order/matching system, we treat the full listed
  // quantity as the "requirement" and show 0 as supplied so far, so the
  // Price Progress section has something meaningful to render.
  const rawListings = useSyncExternalStore(listingsStore.subscribe, listingsStore.getListings);
  const auctions = rawListings.map((listing) => ({
    id: listing.id,
    farmerName: listing.farmerName,
    cropName: listing.cropName,
    grade: listing.grade,
    location: listing.location,
    unit: listing.unit,
    requiredQuantity: listing.quantity,
    suppliedQuantity: 0,
    basePrice: listing.minAskingPrice,
    highestBid: listing.highestBid,
    currentBuyer: listing.currentBuyer
  }));

  // ML price forecast mock, tied to the same crops/districts above
  const mlPredictions = [
    { id: 1, crop: 'Soybean', grade: 'A', currentPrice: 4600, predictedPrice: 5050, trend: 'up', confidence: 94, location: 'Latur, Maharashtra' },
    { id: 2, crop: 'Cotton', grade: 'A', currentPrice: 6800, predictedPrice: 6550, trend: 'down', confidence: 91, location: 'Yavatmal, Maharashtra' },
    { id: 3, crop: 'Onion', grade: 'B', currentPrice: 1500, predictedPrice: 1680, trend: 'up', confidence: 88, location: 'Nashik, Maharashtra' }
  ];

  const districts = ['All', ...new Set(auctions.map(item => item.location))];

  const filteredAuctions = auctions.filter(crop => {
    const matchesSearch = crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || crop.location === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const openBidModal = (auction) => {
    setSelectedAuction(auction);
    setBidAmount('');
    setStatusMessage(null);
  };

  const closeBidModal = () => {
    setSelectedAuction(null);
    setBidAmount('');
  };

  const placeBid = () => {
    if (!selectedAuction) return;

    if (!bidAmount) {
      setStatusMessage({ type: 'error', text: t.enterBidWarning, cropId: selectedAuction.id });
      return;
    }

    const amount = Number(bidAmount);
    const minimumAllowed = selectedAuction.highestBid ? selectedAuction.highestBid : selectedAuction.basePrice;

    if (amount <= minimumAllowed) {
      setStatusMessage({ type: 'error', text: `${t.lowBidWarningPrefix}${minimumAllowed.toLocaleString('en-IN')}`, cropId: selectedAuction.id });
      return;
    }

    listingsStore.placeBid(selectedAuction.id, amount, 'Your Firm (Demo Wholesaler)');

    setMyBids(prev => [
      { id: Date.now(), crop: selectedAuction.cropName, grade: selectedAuction.grade, amount, quantity: selectedAuction.requiredQuantity, unit: selectedAuction.unit, status: t.leading },
      ...prev
    ]);

    setStatusMessage({ type: 'success', text: t.successBid, cropId: selectedAuction.id });
    closeBidModal();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fadeIn pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{t.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 px-4 py-2 rounded-xl">
          <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wide">{t.regionLabel}</p>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">{t.regionValue}</p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 font-medium text-slate-700 dark:text-slate-300"
          >
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district === 'All' ? t.filterDistrict : district}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buyer Bidding + Price Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Buyer Bidding */}
        <section>
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.biddingTitle}</h2>
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900 uppercase tracking-wider">
                {t.live}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.biddingSubtitle}</p>
          </div>

          <div className="space-y-4">
            {filteredAuctions.map((auction) => (
              <div key={auction.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all p-5">
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{auction.cropName}</h3>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-2 py-0.5 rounded-md">
                        {t.grade} {auction.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building className="h-3 w-3" /> {t.listedBy} {auction.farmerName}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {auction.location}
                    </p>
                  </div>
                  <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900 uppercase tracking-wider">
                    {t.live}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tight">{t.buyerRequirement}</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-1">{auction.requiredQuantity} {auction.unit}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-3">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tight">{t.currentBestBid}</p>
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mt-1">
                      {auction.highestBid ? `₹${auction.highestBid.toLocaleString('en-IN')}` : '—'}
                    </p>
                  </div>
                </div>

                {!auction.highestBid && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic text-center bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg py-1.5 mt-3">
                    {t.noBids}
                  </p>
                )}

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-slate-400 dark:text-slate-500">{t.startingBid}</span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    ₹{auction.basePrice.toLocaleString('en-IN')} {t.perQtl}
                  </span>
                </div>

                <button
                  onClick={() => openBidModal(auction)}
                  className="w-full mt-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Gavel className="h-4 w-4" /> {t.placeBid}
                </button>

                {statusMessage && statusMessage.cropId === auction.id && (
                  <div className={`flex items-start gap-2 mt-3 p-2.5 rounded-lg text-xs font-medium border ${
                    statusMessage.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-300'
                  }`}>
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Price Progress */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.progressTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.progressSubtitle}</p>
          </div>

          <div className="space-y-4">
            {filteredAuctions.map((auction) => {
              const progress = (auction.suppliedQuantity / auction.requiredQuantity) * 100;
              const remaining = auction.requiredQuantity - auction.suppliedQuantity;

              return (
                <div key={auction.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{auction.cropName}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {t.grade} {auction.grade} • {auction.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{Math.round(progress)}%</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide">{t.fulfilled}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{t.orderFulfillment}</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {auction.suppliedQuantity} / {auction.requiredQuantity} {auction.unit}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-3">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tight">{t.supplied}</p>
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{auction.suppliedQuantity} {auction.unit}</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/40 rounded-lg p-3">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tight">{t.remaining}</p>
                      <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">{Math.max(remaining, 0)} {auction.unit}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.currentBid}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {auction.highestBid ? `₹${auction.highestBid.toLocaleString('en-IN')} ${t.perQtl}` : '—'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ML-Driven Price Forecast */}
      <section>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.mlTitle}</h2>
              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> {t.aiBadge}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.mlSubtitle}</p>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl">
            {t.marketsBadge}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mlPredictions.map((prediction) => (
            <div key={prediction.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{prediction.crop}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.verifiedGrade} {prediction.grade}</p>
                </div>
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  prediction.trend === 'up' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
                }`}>
                  {prediction.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {prediction.trend === 'up' ? t.rising : t.falling}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tight">{t.currentMandiPrice}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">₹{prediction.currentPrice.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{t.perQtlShort}</p>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.predictedNextMonth}</p>
                <p className="text-xl font-bold text-blue-600 mt-0.5">₹{prediction.predictedPrice.toLocaleString('en-IN')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.perQtlShort}</p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t.predictionConfidence}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${prediction.confidence}%` }} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{prediction.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Bids */}
      {myBids.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.myBidsTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.myBidsSubtitle}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {myBids.map((bid) => (
              <div key={bid.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{bid.crop}</p>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                      {t.grade} {bid.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.quantity}: {bid.quantity} {bid.unit}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{bid.amount.toLocaleString('en-IN')}</p>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">● {bid.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bid Modal */}
      {selectedAuction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t.modalTitle}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{selectedAuction.cropName} • {t.grade} {selectedAuction.grade}</p>
              </div>
              <button type="button" onClick={closeBidModal} className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-4">
              <MapPin className="h-3.5 w-3.5" /> {selectedAuction.location}
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-4 mt-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.currentBestBid}</p>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                {selectedAuction.highestBid ? `₹${selectedAuction.highestBid.toLocaleString('en-IN')}` : `₹${selectedAuction.basePrice.toLocaleString('en-IN')}`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.perQtlShort}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 mt-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.modalRequirement}</p>
              <p className="font-bold text-slate-900 dark:text-slate-100 mt-1 text-sm">{selectedAuction.requiredQuantity} {selectedAuction.unit}</p>
            </div>

            <div className="mt-4">
              <label htmlFor="bidAmount" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {t.yourBid}
              </label>
              <div className="relative mt-1.5">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  id="bidAmount"
                  type="number"
                  min={(selectedAuction.highestBid || selectedAuction.basePrice) + 1}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`${t.minimumPrefix}${((selectedAuction.highestBid || selectedAuction.basePrice) + 1).toLocaleString('en-IN')}`}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            {statusMessage && statusMessage.cropId === selectedAuction.id && statusMessage.type === 'error' && (
              <div className="flex items-start gap-2 mt-3 p-2.5 rounded-lg text-xs font-medium border bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-300">
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <span>{statusMessage.text}</span>
              </div>
            )}

            <button
              type="button"
              onClick={placeBid}
              className="w-full mt-5 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold text-sm shadow-sm transition-all"
            >
              {t.submitBid}
            </button>

            <button
              type="button"
              onClick={closeBidModal}
              className="w-full mt-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 py-2 text-sm font-medium"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}