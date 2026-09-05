import React, { useEffect, useState } from 'react';
import { CheckCircle2, FileCheck2, FileUp, LockKeyhole, RefreshCw, ShieldCheck, UserRound } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

const translations = {
  en: {
    title: 'Welcome to KrishiSetu',
    subtitle: 'Complete verification to enter your marketplace workspace.',
    farmer: 'Farmer verification',
    buyer: 'Buyer verification',
    farmerHint: 'List produce and receive buyer bids.',
    buyerHint: 'Post buying requirements and connect with farmers.',
    fullName: 'Full name',
    namePlaceholder: 'Enter your full name',
    aadhaar: 'Aadhaar number',
    aadhaarPlaceholder: '12-digit Aadhaar number',
    farmerDocuments: 'Upload land and identity proof',
    buyerDocuments: 'Upload buyer licence or verification proof',
    farmerHelp: 'Land ownership record, pattadar passbook, land revenue receipt, lease agreement, VAO certificate, or similar proof.',
    buyerHelp: 'Business licence, trade licence, GST certificate, company registration, or similar buyer proof.',
    upload: 'Choose files',
    fileHelp: 'PDF, JPG, PNG or WEBP up to 10 MB each',
    captcha: 'Security check',
    captchaPlaceholder: 'Enter the characters shown',
    refreshCaptcha: 'Refresh CAPTCHA',
    continue: 'Verify and continue',
    verified: 'Verification complete. Opening dashboard...',
    required: 'Complete every field and upload at least one proof document.',
    invalidAadhaar: 'Enter a valid 12-digit Aadhaar number.',
    invalidFiles: 'Use only PDF, JPG, PNG or WEBP files under 10 MB.',
    invalidCaptcha: 'CAPTCHA does not match.',
    prototype: 'Prototype verification: documents are recorded locally for this demo and are not sent to a server.',
    documentCount: 'documents selected'
  },
  mr: {
    title: 'KrishiSetu मध्ये स्वागत आहे',
    subtitle: 'तुमच्या बाजारपेठेच्या कार्यक्षेत्रात जाण्यासाठी पडताळणी पूर्ण करा.',
    farmer: 'शेतकरी पडताळणी',
    buyer: 'खरेदीदार पडताळणी',
    farmerHint: 'उत्पादन सूचीबद्ध करा आणि खरेदीदारांच्या बोली मिळवा.',
    buyerHint: 'खरेदीची गरज पोस्ट करा आणि शेतकऱ्यांशी जोडा.',
    fullName: 'पूर्ण नाव',
    namePlaceholder: 'तुमचे पूर्ण नाव टाका',
    aadhaar: 'आधार क्रमांक',
    aadhaarPlaceholder: '१२ अंकी आधार क्रमांक',
    farmerDocuments: 'जमीन आणि ओळख पुरावा अपलोड करा',
    buyerDocuments: 'खरेदीदार परवाना किंवा पडताळणी पुरावा अपलोड करा',
    farmerHelp: 'जमीन मालकी नोंद, पट्टेदार पासबुक, जमीन महसूल पावती, भाडेपट्टा, VAO प्रमाणपत्र किंवा तत्सम पुरावा.',
    buyerHelp: 'व्यवसाय परवाना, व्यापार परवाना, GST प्रमाणपत्र, कंपनी नोंदणी किंवा तत्सम पुरावा.',
    upload: 'फाइल निवडा',
    fileHelp: 'PDF, JPG, PNG किंवा WEBP, प्रत्येक १० MB पर्यंत',
    captcha: 'सुरक्षा तपासणी',
    captchaPlaceholder: 'दाखवलेली अक्षरे टाका',
    refreshCaptcha: 'CAPTCHA बदला',
    continue: 'पडताळणी करून पुढे जा',
    verified: 'पडताळणी पूर्ण. डॅशबोर्ड उघडत आहे...',
    required: 'सर्व फील्ड भरा आणि किमान एक पुरावा अपलोड करा.',
    invalidAadhaar: 'वैध १२ अंकी आधार क्रमांक टाका.',
    invalidFiles: 'फक्त PDF, JPG, PNG किंवा WEBP फाइल्स वापरा आणि प्रत्येक १० MB पेक्षा कमी असावी.',
    invalidCaptcha: 'CAPTCHA जुळत नाही.',
    prototype: 'प्रोटोटाइप पडताळणी: या डेमोसाठी कागदपत्रे स्थानिकरित्या नोंदवली जातात आणि सर्व्हरवर पाठवली जात नाहीत.',
    documentCount: 'कागदपत्रे निवडली'
  },
  hi: {
    title: 'KrishiSetu में आपका स्वागत है',
    subtitle: 'अपने मार्केटप्लेस कार्यक्षेत्र में जाने के लिए सत्यापन पूरा करें।',
    farmer: 'किसान सत्यापन',
    buyer: 'खरीदार सत्यापन',
    farmerHint: 'उपज सूचीबद्ध करें और खरीदार की बोलियां पाएं।',
    buyerHint: 'खरीद की जरूरत पोस्ट करें और किसानों से जुड़ें।',
    fullName: 'पूरा नाम',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    aadhaar: 'आधार नंबर',
    aadhaarPlaceholder: '12 अंकों का आधार नंबर',
    farmerDocuments: 'भूमि और पहचान प्रमाण अपलोड करें',
    buyerDocuments: 'खरीदार लाइसेंस या सत्यापन प्रमाण अपलोड करें',
    farmerHelp: 'भूमि स्वामित्व रिकॉर्ड, पट्टेदार पासबुक, भूमि राजस्व रसीद, पट्टा समझौता, VAO प्रमाणपत्र या समान प्रमाण।',
    buyerHelp: 'व्यवसाय लाइसेंस, व्यापार लाइसेंस, GST प्रमाणपत्र, कंपनी पंजीकरण या समान खरीदार प्रमाण।',
    upload: 'फाइल चुनें',
    fileHelp: 'PDF, JPG, PNG या WEBP, प्रत्येक 10 MB तक',
    captcha: 'सुरक्षा जांच',
    captchaPlaceholder: 'दिखाए गए अक्षर दर्ज करें',
    refreshCaptcha: 'CAPTCHA बदलें',
    continue: 'सत्यापित करके आगे बढ़ें',
    verified: 'सत्यापन पूरा। डैशबोर्ड खुल रहा है...',
    required: 'सभी फ़ील्ड भरें और कम से कम एक प्रमाण अपलोड करें।',
    invalidAadhaar: 'मान्य 12 अंकों का आधार नंबर दर्ज करें।',
    invalidFiles: 'केवल PDF, JPG, PNG या WEBP फाइलें इस्तेमाल करें, प्रत्येक 10 MB से कम।',
    invalidCaptcha: 'CAPTCHA मेल नहीं खाता।',
    prototype: 'प्रोटोटाइप सत्यापन: इस डेमो के लिए दस्तावेज स्थानीय रूप से दर्ज होते हैं और सर्वर पर नहीं भेजे जाते।',
    documentCount: 'दस्तावेज़ चुने गए'
  }
};

const createCaptcha = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export default function AuthPage({ role, language = 'en', setLanguage, onVerified, isDarkMode, setIsDarkMode }) {
  const t = translations[language] || translations.en;
  const [formData, setFormData] = useState({ name: '', aadhaar: '', documents: [], captcha: '' });
  const [captchaCode, setCaptchaCode] = useState(createCaptcha);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setFormData({ name: '', aadhaar: '', documents: [], captcha: '' });
    setCaptchaCode(createCaptcha());
    setError('');
    setIsVerified(false);
  }, [role]);

  const isFarmer = role === 'farmer';
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((current) => ({ ...current, [name]: name === 'documents' ? Array.from(files || []) : value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validFiles = formData.documents.length > 0 && formData.documents.every((file) => ACCEPTED_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE);
    if (!formData.name.trim() || !formData.aadhaar || !formData.documents.length) return setError(t.required);
    if (!/^\d{12}$/.test(formData.aadhaar.replace(/\s/g, ''))) return setError(t.invalidAadhaar);
    if (!validFiles) return setError(t.invalidFiles);
    if (formData.captcha.trim().toUpperCase() !== captchaCode) return setError(t.invalidCaptcha);

    const profile = {
      role,
      name: formData.name.trim(),
      aadhaar: `XXXX-XXXX-${formData.aadhaar.replace(/\s/g, '').slice(-4)}`,
      documents: formData.documents.map((file) => ({ name: file.name, type: file.type, size: file.size })),
      verifiedAt: new Date().toISOString()
    };
    window.localStorage.setItem(`kishansevak-${role}-verification`, JSON.stringify(profile));
    setIsVerified(true);
    window.setTimeout(() => onVerified(profile), 500);
  };

  return (
    <main className="min-h-[calc(100vh-2rem)] bg-[var(--page-sage)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface-ivory)] shadow-xl lg:grid-cols-[0.85fr_1.15fr] dark:border-emerald-900 dark:bg-[#0d241b]">
        <aside className="relative overflow-hidden bg-[#174f46] p-7 text-white sm:p-10">
          <div className="relative z-10 flex h-full flex-col justify-between gap-12">
            <div>
              <div className="mb-10 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1"><img src="/AgroFPO.svg" alt="KrishiSetu logo" className="h-full w-full object-contain" /></div><span className="text-xl font-bold tracking-wide">KrishiSetu</span></div>
              <span className="mb-3 inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Verified access</span>
              <h1 className="max-w-md text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-emerald-100">{t.subtitle}</p>
            </div>
            <div className="grid gap-3 text-sm text-emerald-100"><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><ShieldCheck className="h-5 w-5 text-amber-300" />Verified marketplace identity</div><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><LockKeyhole className="h-5 w-5 text-amber-300" />Your Aadhaar is stored masked in this prototype</div></div>
          </div>
        </aside>

        <section className="p-6 sm:p-10">
          <div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[var(--info-blue)]">{isFarmer ? t.farmer : t.buyer}</p><h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{isFarmer ? t.farmer : t.buyer}</h2><p className="mt-1 text-sm text-slate-500">{isFarmer ? t.farmerHint : t.buyerHint}</p></div><div className="flex items-center gap-2"><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language" className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs uppercase dark:border-emerald-800 dark:bg-emerald-950/30"><option value="en">EN</option><option value="mr">MR</option><option value="hi">HI</option></select><button type="button" onClick={() => setIsDarkMode((current) => !current)} className="rounded-full border border-slate-200 p-2 text-slate-500 dark:border-emerald-800 dark:text-emerald-200" aria-label="Toggle color mode">{isDarkMode ? '☀' : '◐'}</button></div></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{t.fullName}</span><div className="relative"><UserRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input name="name" value={formData.name} onChange={handleChange} placeholder={t.namePlaceholder} className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-sm dark:border-emerald-800 dark:bg-emerald-950/30" /></div></label><label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{t.aadhaar}</span><input name="aadhaar" inputMode="numeric" maxLength="12" value={formData.aadhaar} onChange={handleChange} placeholder={t.aadhaarPlaceholder} className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm dark:border-emerald-800 dark:bg-emerald-950/30" /></label></div>

            <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{isFarmer ? t.farmerDocuments : t.buyerDocuments}</span><div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-4 dark:border-amber-700 dark:bg-amber-950/20"><div className="flex items-start gap-3"><FileUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" /><div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{isFarmer ? t.farmerHelp : t.buyerHelp}</p><p className="mt-1 text-xs text-slate-500">{t.fileHelp}</p></div></div><input name="documents" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleChange} className="mt-4 block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-600 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-amber-700" />{formData.documents.length > 0 && <p className="mt-2 flex items-center gap-1 text-xs text-emerald-700"><FileCheck2 className="h-3.5 w-3.5" />{formData.documents.length} {t.documentCount}</p>}</div></label>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-emerald-800 dark:bg-emerald-950/20"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.captcha}</span><button type="button" onClick={() => setCaptchaCode(createCaptcha())} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--info-blue)]"><RefreshCw className="h-3.5 w-3.5" />{t.refreshCaptcha}</button></div><div className="flex items-center gap-3"><span className="select-none rounded-lg bg-[#174f46] px-4 py-2 font-mono text-lg font-bold tracking-[0.3em] text-amber-200">{captchaCode}</span><input name="captcha" value={formData.captcha} onChange={handleChange} placeholder={t.captchaPlaceholder} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-emerald-800 dark:bg-emerald-950/30" /></div></div>

            {error && <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-800">{error}</p>}
            {isVerified && <p className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-800"><CheckCircle2 className="h-4 w-4" />{t.verified}</p>}
            <button type="submit" className="w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700">{t.continue}</button>
            <p className="text-center text-[11px] leading-5 text-slate-400">{t.prototype}</p>
          </form>
        </section>
      </div>
    </main>
  );
}
