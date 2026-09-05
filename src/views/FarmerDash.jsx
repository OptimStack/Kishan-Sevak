import React, { useSyncExternalStore } from 'react';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { listingsStore } from "#views";

const translations = {
  en: {
    title: "Farmer Dashboard",
    subtitle: "List crops, manage live offerings, and monitor ML price predictions.",
    publishBtn: "Publish New Crop",
    liveInventory: "Your Live Crop Listings",
    aiInsights: "AI Price Forecasting Engine (Model.py)",
    aiNote: "Our Random Forest Regressor evaluates market arrivals and rainfall indices to forecast future prices.",
    noBids: "Waiting for buyer bids...",
    activeBid: "Highest Bid: "
  },
  mr: {
    title: "शेतकरी डॅशबोर्ड",
    subtitle: "पिकांची यादी करा, थेट ऑफर व्यवस्थापित करा आणि AI किंमत अंदाजांचे निरीक्षण करा.",
    publishBtn: "नवीन पीक प्रकाशित करा",
    liveInventory: "तुमची थेट पीक यादी",
    aiInsights: "AI किंमत अंदाज इंजिन (Model.py)",
    aiNote: "आमचे मॉडेल प्रादेशिक किमतींचा अंदाज लावण्यासाठी बाजारातील आवक आणि पावसाच्या निर्देशांकाचे विश्लेषण करते.",
    noBids: "खरेदीदार बोलीची वाट पाहत आहे...",
    activeBid: "सर्वोच्च बोली: "
  },
  hi: {
    title: "किसान डैशबोर्ड",
    subtitle: "फसलों की सूची बनाएं, लाइव ऑफ़र प्रबंधित करें और एआई मूल्य पूर्वानुमानों की निगरानी करें।",
    publishBtn: "नई फसल प्रकाशित करें",
    liveInventory: "आपकी लाइव फसल सूची",
    aiInsights: "एआई मूल्य पूर्वानुमान इंजन (Model.py)",
    aiNote: "हमारा मॉडल क्षेत्रीय कीमतों का अनुमान लगाने के लिए बाजार आवक और वर्षा सूचकांकों का विश्लेषण करता है।",
    noBids: "खरीदार की बोली का इंतजार है...",
    activeBid: "उच्चतम बोली: "
  }
};

// FarmerDash is dashboard-only. Registration lives in the separate
// CropRegistration view — App owns which one is on screen (`currentView`),
// so this component just asks App to switch views via `navigateToRegister`.
//
// Listings now come from the shared listingsStore (localStorage-backed),
// not local state — so anything published here shows up on BuyerDash too,
// and persists across reloads/tabs of this browser.
export default function FarmerDash({ language = 'en', navigateToRegister }) {
  const t = translations[language] || translations.en;

  const myListings = useSyncExternalStore(listingsStore.subscribe, listingsStore.getListings);

  const aiPredictions = [
    { crop: 'Soybean', currentMandi: 4650, predictedNextMonth: 5100, trend: 'up', confidence: '94%', recommendation: 'Hold harvest. Prices expected to rise by 9.6% due to lower market arrival projections.' },
    { crop: 'Cotton', currentMandi: 7100, predictedNextMonth: 6750, trend: 'down', confidence: '89%', recommendation: 'Sell immediately. High international supply loops are expected to depress regional rates.' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">{t.title}</h1>
        <p className="text-xs text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Left sidebar column */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <button
              onClick={navigateToRegister}
              className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="h-4 w-4" />
              {t.publishBtn}
            </button>
          </div>
        </div>

        {/* Center column */}
        <div className="space-y-8 max-w-3xl w-full mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-base text-slate-800 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.liveInventory}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Crop Type</th>
                    <th className="py-3 px-4">Volume</th>
                    <th className="py-3 px-4">Base Target</th>
                    <th className="py-3 px-4 text-right">Price Discovery Matrix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myListings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{item.cropName}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{item.quantity} {item.unit}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">₹{item.minAskingPrice}</td>
                      <td className="py-3.5 px-4 text-right">
                        {item.highestBid ? (
                          <div className="inline-block text-right">
                            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-xs">
                              {t.activeBid}₹{item.highestBid}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">via {item.currentBuyer}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">{t.noBids}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-slate-50/50 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold text-base text-indigo-950">{t.aiInsights}</h2>
              </div>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                R-Forest Pipeline Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed max-w-2xl">{t.aiNote}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiPredictions.map((pred, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-slate-800 text-sm">{pred.crop} Index</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pred.trend === 'up' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {pred.trend === 'up' ? '↑ Uptrend Expected' : '↓ Liquidation Alert'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-3 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100/50">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-tight">Mandi Spot Avg</span>
                        <span className="text-xs font-bold text-slate-700">₹{pred.currentMandi} / Qtl</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-tight">AI Projection</span>
                        <span className="text-xs font-black text-indigo-600">₹{pred.predictedNextMonth} / Qtl</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border-l-2 border-indigo-500 leading-normal mt-2">
                    <span className="font-bold text-indigo-900 block mb-0.5">Model Recommendation (Acc: {pred.confidence}):</span>
                    {pred.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}