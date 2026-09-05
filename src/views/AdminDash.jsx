import React, { useSyncExternalStore } from 'react';
import { ShieldCheck, Users, Package, CheckCircle2, Clock } from 'lucide-react';
import { listingsStore } from './ListingsStore';

const translations = {
  en: {
    title: "Admin Dashboard",
    subtitle: "Review farmer submissions and verify crop quality grades.",
    totalListings: "Total Listings",
    totalFarmers: "Active Farmers",
    pendingVerification: "Pending Verification",
    tableHeading: "Quality Verification Queue",
    crop: "Crop",
    farmer: "Farmer",
    quantity: "Quantity",
    grade: "Grade",
    status: "Status",
    verified: "Verified",
    pending: "Pending",
    verifyAs: "Verify as",
    noListings: "No listings yet."
  },
  mr: {
    title: "प्रशासक डॅशबोर्ड",
    subtitle: "शेतकऱ्यांच्या नोंदी तपासा आणि पिकांच्या दर्जाची पडताळणी करा.",
    totalListings: "एकूण यादी",
    totalFarmers: "सक्रिय शेतकरी",
    pendingVerification: "प्रलंबित पडताळणी",
    tableHeading: "दर्जा पडताळणी रांग",
    crop: "पीक",
    farmer: "शेतकरी",
    quantity: "प्रमाण",
    grade: "दर्जा",
    status: "स्थिती",
    verified: "पडताळले",
    pending: "प्रलंबित",
    verifyAs: "म्हणून पडताळा",
    noListings: "अद्याप कोणतीही यादी नाही."
  },
  hi: {
    title: "एडमिन डैशबोर्ड",
    subtitle: "किसानों की प्रविष्टियों की समीक्षा करें और फसल गुणवत्ता ग्रेड सत्यापित करें.",
    totalListings: "कुल सूचियाँ",
    totalFarmers: "सक्रिय किसान",
    pendingVerification: "लंबित सत्यापन",
    tableHeading: "गुणवत्ता सत्यापन कतार",
    crop: "फसल",
    farmer: "किसान",
    quantity: "मात्रा",
    grade: "ग्रेड",
    status: "स्थिति",
    verified: "सत्यापित",
    pending: "लंबित",
    verifyAs: "इस रूप में सत्यापित करें",
    noListings: "अभी तक कोई सूची नहीं है."
  }
};

const GRADE_OPTIONS = ['A', 'B', 'C'];

export default function AdminDash({ language = 'en' }) {
  const t = translations[language] || translations.en;

  const listings = useSyncExternalStore(listingsStore.subscribe, listingsStore.getListings);

  const totalListings = listings.length;
  const totalFarmers = new Set(listings.map((l) => l.farmerName)).size;
  const pendingCount = listings.filter((l) => !l.verified).length;

  const stats = [
    { label: t.totalListings, value: totalListings, icon: Package, color: 'emerald' },
    { label: t.totalFarmers, value: totalFarmers, icon: Users, color: 'indigo' },
    { label: t.pendingVerification, value: pendingCount, icon: Clock, color: 'amber' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{t.title}</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-${s.color}-50 text-${s.color}-600`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{s.value}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wide">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h2 className="font-semibold text-base text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          {t.tableHeading}
        </h2>

        {listings.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic">{t.noListings}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">{t.crop}</th>
                  <th className="py-3 px-4">{t.farmer}</th>
                  <th className="py-3 px-4">{t.quantity}</th>
                  <th className="py-3 px-4">{t.grade}</th>
                  <th className="py-3 px-4">{t.status}</th>
                  <th className="py-3 px-4 text-right">{t.verifyAs}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">{item.cropName}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{item.farmerName}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{item.quantity} {item.unit}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{item.grade}</td>
                    <td className="py-3.5 px-4">
                      {item.verified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 px-2 py-0.5 rounded-full text-xs font-bold">
                          <CheckCircle2 className="h-3 w-3" /> {t.verified}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 px-2 py-0.5 rounded-full text-xs font-bold">
                          <Clock className="h-3 w-3" /> {t.pending}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {!item.verified && (
                        <div className="flex justify-end gap-1.5">
                          {GRADE_OPTIONS.map((g) => (
                            <button
                              key={g}
                              onClick={() => listingsStore.verifyListing(item.id, `Grade ${g}`)}
                              className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md text-xs font-bold text-slate-600 dark:text-slate-300 transition-all"
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}