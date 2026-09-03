import React, { useState } from 'react';
import { Search, MapPin, Scale, IndianRupee, Gavel, Filter, Building, CheckCircle2, AlertTriangle } from 'lucide-react';

const translations = {
  en: {
    title: "Buyer Marketplace",
    subtitle: "Browse agricultural produce listings, filter by district, and place direct bids.",
    searchPlaceholder: "Search crops (e.g., Soybean, Cotton, Onion)...",
    filterDistrict: "All Districts",
    cropType: "Crop Type",
    volume: "Available Volume",
    basePrice: "Farmer's Base Price",
    location: "Location",
    placeBid: "Place Your Bid",
    bidPlaceholder: "Enter amount (₹)",
    submitBid: "Submit Bid",
    highestBid: "Current High Bid: ",
    noBids: "No active bids yet",
    successBid: "Your bid has been transmitted to the farmer's dashboard!",
    lowBidWarning: "Bid must be higher than the farmer's base price and current highest bid."
  },
  mr: {
    title: "खरेदीदार बाजारपेठ",
    subtitle: "कृषी उत्पादनांची सूची ब्राउझ करा, जिल्ह्यानुसार फिल्टर करा आणि थेट बोली लावा.",
    searchPlaceholder: "पिके शोधा (उदा. सोयाबीन, कापूस, कांदा)...",
    filterDistrict: "सर्व जिल्हे",
    cropType: "पिकाचा प्रकार",
    volume: "उपलब्ध प्रमाण",
    basePrice: "शेतकऱ्याची मूळ किंमत",
    location: "ठिकाण",
    placeBid: "तुमची बोली लावा",
    bidPlaceholder: "रक्कम टाका (₹)",
    submitBid: "बोली सबमिट करा",
    highestBid: "सध्याची उच्च बोली: ",
    noBids: "अद्याप कोणतीही सक्रिय बोली नाही",
    successBid: "तुमची बोली शेतकऱ्याच्या डॅशबोर्डवर पाठवली गेली आहे!",
    lowBidWarning: "बोली शेतकऱ्याच्या मूळ किमतीपेक्षा आणि सध्याच्या सर्वोच्च बोलीपेक्षा जास्त असणे आवश्यक आहे."
  },
  hi: {
    title: "खरीदार मार्केटप्लेस",
    subtitle: "कृषि उपज लिस्टिंग ब्राउज़ करें, जिले के अनुसार फ़िल्टर करें, और सीधी बोली लगाएं।",
    searchPlaceholder: "फसलें खोजें (जैसे, सोयाबीन, कपास, प्याज)...",
    filterDistrict: "सभी जिले",
    cropType: "फसल का प्रकार",
    volume: "उपलब्ध मात्रा",
    basePrice: "किसान की आधार कीमत",
    location: "स्थान",
    placeBid: "अपनी बोली लगाएं",
    bidPlaceholder: "रकम दर्ज करें (₹)",
    submitBid: "बोली जमा करें",
    highestBid: "वर्तमान उच्च बोली: ",
    noBids: "अभी तक कोई सक्रिय बोली नहीं",
    successBid: "आपकी बोली किसान के डैशबोर्ड पर भेज दी गई है!",
    lowBidWarning: "बोली किसान की आधार कीमत और वर्तमान उच्चतम बोली से अधिक होनी चाहिए।"
  }
};

export default function BuyerDash({ language = 'en' }) {
  const t = translations[language] || translations.en;

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  
  // Action Feedback States
  const [bidAmount, setBidAmount] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  // Mocked state simulating data pulled dynamically out of MongoDB Atlas
  const [marketCrops, setMarketCrops] = useState([
    { id: '1', farmerName: 'Ramesh Patil', cropName: 'Soybean (सोयाबीन)', quantity: 45, basePrice: 4600, location: 'Latur', highestBid: 4850, currentBuyer: 'Marico Industries' },
    { id: '2', farmerName: 'Sanjay Deshmukh', cropName: 'Cotton (कापूस)', quantity: 20, basePrice: 6800, location: 'Yavatmal', highestBid: null, currentBuyer: null },
    { id: '3', farmerName: 'Anil Shinde', cropName: 'Onion (कांदा)', quantity: 120, basePrice: 1500, location: 'Nashik', highestBid: 1620, currentBuyer: 'BigBasket Wholesale' },
    { id: '4', farmerName: 'Vikas Joshi', cropName: 'Turmeric (हळद)', quantity: 15, basePrice: 7200, location: 'Sangli', highestBid: null, currentBuyer: null }
  ]);

  // Extract unique districts for the filtering configuration drop-down menu
  const districts = ['All', ...new Set(marketCrops.map(item => item.location))];

  const handleBidChange = (id, value) => {
    setBidAmount({ ...bidAmount, [id]: value });
  };

  const handlePlaceBid = (e, cropId) => {
    e.preventDefault();
    const bidValue = parseFloat(bidAmount[cropId]);
    const cropItem = marketCrops.find(c => c.id === cropId);

    if (!bidValue) return;

    // Business rules validation matrix matching agritech parameters
    const minimumAllowed = cropItem.highestBid ? cropItem.highestBid : cropItem.basePrice;

    if (bidValue <= minimumAllowed) {
      setStatusMessage({ type: 'error', text: t.lowBidWarning, cropId });
      return;
    }

    // Mutate local state mapping updates directly into collection schema variables
    const updatedCrops = marketCrops.map(crop => {
      if (crop.id === cropId) {
        return {
          ...crop,
          highestBid: bidValue,
          currentBuyer: 'Your Firm (Demo Wholesaler)'
        };
      }
      return crop;
    });

    setMarketCrops(updatedCrops);
    setBidAmount({ ...bidAmount, [cropId]: '' });
    setStatusMessage({ type: 'success', text: t.successBid, cropId });
  };

   // Execution query logic evaluating both Search parameters and Location components
  const filteredCrops = marketCrops.filter(crop => {
    const matchesSearch = crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || crop.location === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Greetings Block */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
        <p className="text-slate-500 mt-1 text-sm">{t.subtitle}</p>
      </div>

      {/* Filter and Search Bar Cluster */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter className="h-4 w-4 text-slate-400" />
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 font-medium text-slate-700"
          >
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district === 'All' ? t.filterDistrict : district}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid View Loop displaying active crop lots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between">
            <div>
              {/* Header: Farmer Info and District Location */}
              <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{crop.cropName}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building className="h-3 w-3" /> listed by {crop.farmerName}
                  </p>
                </div>
                <span className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <MapPin className="h-3 w-3 text-slate-500" />
                  {crop.location}
                </span>
              </div>

              {/* Data Specifications Section */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-slate-500">
                    <Scale className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-tight">{t.volume}</span>
                    <span className="text-sm font-bold text-slate-800">{crop.quantity} Quintals</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-slate-500">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-tight">{t.basePrice}</span>
                    <span className="text-sm font-bold text-slate-800">₹{crop.basePrice} / Qtl</span>
                  </div>
                </div>
              </div>

              {/* Active Realtime Bid Summary Status Tracker */}
              <div className="mb-4 px-1">
                {crop.highestBid ? (
                  <div className="text-sm text-emerald-800 bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-lg flex justify-between items-center">
                    <span className="font-medium text-xs">{t.highestBid}<strong>₹{crop.highestBid} / Qtl</strong></span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-100">
                      {crop.currentBuyer}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic block py-1 bg-slate-50 text-center rounded-lg border border-dashed border-slate-200">
                    {t.noBids}
                  </span>
                )}
              </div>
            </div>

            {/* Price Discovery Form Inputs Block */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <form onSubmit={(e) => handlePlaceBid(e, crop.id)} className="flex items-center gap-3">
                <div className="relative flex-grow">
                  <Gavel className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="number" 
                    placeholder={t.bidPlaceholder}
                    value={bidAmount[crop.id] || ''}
                    onChange={(e) => handleBidChange(crop.id, e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm shadow-sm transition-all flex items-center justify-center">
                  {t.submitBid}
                </button>
              </form>

              {/* Status feedback conditional routing nodes */}
              {statusMessage && statusMessage.cropId === crop.id && (
                <div className={`flex items-start gap-2 mt-3 p-2.5 rounded-lg text-xs font-medium border ${
                  statusMessage.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
                }`}>
                  {statusMessage.type === 'success' ? (
                    <span className="text-emerald-600 font-bold flex-shrink-0 mt-0.5">✓</span>
                  ) : (
                    <span className="text-rose-600 font-bold flex-shrink-0 mt-0.5">⚠</span>
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
