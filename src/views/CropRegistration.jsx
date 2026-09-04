import React, { useState, useEffect } from 'react';
import {
  Sprout, Scale, IndianRupee, MapPin, Truck, Warehouse, FileText,
  CheckCircle2, ArrowLeft, Loader2, User, Phone, ShieldCheck, Users,
  Landmark, Camera, CalendarDays, Wallet, ClipboardCheck, Sparkles
} from 'lucide-react';
import { listingsStore } from './Listingsstore';

const translations = {
  en: {
    heading: "Agricultural Crop Registration",
    subheading: "Publish dynamic harvest allocations to the live marketplace with logistical tracking.",
    badge: "Market Linkage Form",
    successTitle: "Harvest Registered Successfully!",
    successBody: "The crop metrics and silo e-tender blueprints have been synced with MongoDB Atlas.",

    section6: "1. eNWR Verification & Auto-Fill",
    enwrIntro: "Upload your eNWR (Electronic Negotiable Warehouse Receipt) first — we'll auto-fill your crop, quantity, and location details below from it. You can still edit anything afterward.",
    enwrAutoFilledBanner: "Details auto-filled from your eNWR — review and edit the fields below.",
    storageType: "Storage Location / Type",
    storageTypePlaceholder: "e.g., On-farm godown, APMC warehouse",
    enwrUpload: "Upload eNWR",
    enwrUploadHint: "Electronic Negotiable Warehouse Receipt — PDF or image, up to 10MB",
    enwrNumber: "eNWR Number",
    enwrNumberPlaceholder: "e.g., ENWR/MH/2026/00981",
    enwrQuantity: "Quantity Covered by eNWR",
    pledgeLoanLabel: "Apply for MSAMB Pledge Loan against eNWR",
    pledgeLoanHint: "Avail a pledge loan from MSAMB using this eNWR as collateral.",
    pledgeLoanAmount: "Loan Amount Requested (₹)",
    pledgeLoanAmountPlaceholder: "e.g., 150000",

    section1: "2. Seller Details",
    sellerName: "Name / FPO Name",
    sellerNamePlaceholder: "e.g., Ramesh Patil or Latur Farmers FPO",
    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "e.g., 98765 43210",

    section2: "3. Crop / Product Details",
    cropName: "Crop / Commodity",
    cropNamePlaceholder: "Select a crop",
    cropOther: "Other (specify below)",
    cropOtherPlaceholder: "Enter crop name",
    variety: "Variety (if applicable)",
    varietyPlaceholder: "e.g., Bt-Cotton, JS-335 Soybean",
    quantity: "Total Quantity Available",
    minQuantity: "Minimum Quantity Willing to Sell",
    quantityUnit: "Unit",
    unitKg: "Kg",
    unitQuintal: "Quintal",
    unitTonne: "Tonne",
    availableFrom: "Available From",
    availableUntil: "Available Until / Delivery Deadline",

    section3: "4. Quality Verification",
    section3Body: "Upload a quality testing certificate where available. Verified lots are prioritized in the marketplace.",
    photoUpload: "Upload Produce Photo (for AI Grading)",
    photoUploadHint: "JPG or PNG, up to 10MB",
    certUpload: "Upload Quality Testing Certificate",
    certUploadHint: "Supports PDF, DOCX, or Image formats up to 10MB",
    certNumber: "Certificate / Test Report Number",
    certNumberPlaceholder: "e.g., QTC-2026-00451",
    verificationStatus: "Verification Status",
    verificationStatusValue: "Pending Committee Verification",
    verificationStatusHint: "Set by the system/committee after review — not farmer-entered.",
    selfGrade: "Self-Declared Grade (fallback if no certificate)",
    selfGradePlaceholder: "Select grade",
    gradeA: "Grade A",
    gradeB: "Grade B",
    gradeC: "Grade C",

    section4: "5. FPO / Crop Pooling",
    poolingLabel: "Add produce to FPO / crop pool",
    poolingHint: "Combine this lot with other farmers' produce for stronger auction pricing.",
    poolingSelect: "Select FPO / Pool",
    poolingSelectPlaceholder: "e.g., Latur Farmers Producer Company",

    section5: "6. Location",
    state: "State",
    statePlaceholder: "e.g., Maharashtra",
    district: "District",
    districtPlaceholder: "e.g., Latur, Yavatmal, Nashik",
    village: "Village / Taluk",
    villagePlaceholder: "e.g., Ausa Taluk",
    pickupLocation: "Pickup / Storage Location",
    pickupLocationPlaceholder: "Full address for pickup or storage",

    section7: "7. Auction / Pricing",
    minAskingPrice: "Minimum Asking Price",
    perUnit: "per",
    targetPrice: "Preferred / Target Price (optional)",

    section8: "8. Delivery / Logistics",
    deliveryMode: "Delivery Mode",
    deliveryBuyerPickup: "Buyer Pickup",
    deliveryFarmerDelivery: "Farmer Delivery",
    deliveryWarehouseTransfer: "Warehouse Transfer",
    maxDistance: "Maximum Delivery Distance (km)",
    loadingDetails: "Loading / Packaging Details",
    loadingDetailsPlaceholder: "e.g., Loose in 50kg jute bags, forklift access available",

    section9: "9. Payment Settlement",
    paymentMethod: "Payment Method",
    paymentMethodPlaceholder: "Select payment method",
    paymentBankTransfer: "Bank Transfer (NEFT/RTGS)",
    paymentUpi: "UPI",
    paymentCheque: "Cheque",
    paymentCod: "Cash on Delivery",
    accountDetailsBank: "Bank Account Number",
    accountDetailsUpi: "UPI ID",
    accountDetailsCheque: "Payee Name (as per bank records)",
    accountDetailsPlaceholder: "Depends on the method selected above",
    ifscCode: "IFSC Code",
    ifscCodePlaceholder: "e.g., SBIN0001234",
    codNote: "No settlement details needed — payment is collected on delivery.",

    section10: "10. Final Confirmation",
    confirmOwnership: "I confirm I own or have authorization to sell this produce",

    ledgerTitle: "Live Pricing Ledger",
    harvestValue: "Estimated Lot Value:",
    minAskLedger: "Minimum Ask (unit price):",
    quantityLedger: "Total Quantity:",
    finalPrice: "Final Asking Price:",
    finalPriceNote: "Total Quantity × Minimum Ask",
    submitting: "Syncing Cluster...",
    submit: "Submit for Auction",
    cancel: "Cancel & Return to Dashboard"
  },
  mr: {
    heading: "कृषी पीक नोंदणी",
    subheading: "दळणवळण ट्रॅकिंगसह थेट बाजारपेठेत तुमची कापणी प्रकाशित करा.",
    badge: "बाजार जोडणी फॉर्म",
    successTitle: "कापणी यशस्वीरित्या नोंदवली!",
    successBody: "पीक तपशील आणि गोदाम ई-निविदा कागदपत्रे MongoDB Atlas सह सिंक केली गेली आहेत.",

    section6: "१. eNWR पडताळणी आणि स्वयं-भरण",
    enwrIntro: "आधी तुमचा eNWR (इलेक्ट्रॉनिक निगोशिएबल वेअरहाऊस रिसीट) अपलोड करा — त्यावरून खालील पीक, प्रमाण आणि स्थान तपशील आपोआप भरले जातील. नंतर तुम्ही कोणताही तपशील संपादित करू शकता.",
    enwrAutoFilledBanner: "तुमच्या eNWR वरून तपशील आपोआप भरले गेले आहेत — खालील माहिती तपासा आणि आवश्यक तिथे संपादित करा.",
    storageType: "साठवण स्थान / प्रकार",
    storageTypePlaceholder: "उदा., शेतावरील गोदाम, एपीएमसी गोदाम",
    enwrUpload: "eNWR अपलोड करा",
    enwrUploadHint: "इलेक्ट्रॉनिक निगोशिएबल वेअरहाऊस रिसीट — PDF किंवा प्रतिमा, 10MB पर्यंत",
    enwrNumber: "eNWR क्रमांक",
    enwrNumberPlaceholder: "उदा., ENWR/MH/2026/00981",
    enwrQuantity: "eNWR अंतर्गत समाविष्ट प्रमाण",
    pledgeLoanLabel: "eNWR वर एमएसएएमबी तारण कर्जासाठी अर्ज करा",
    pledgeLoanHint: "या eNWR ला तारण ठेवून एमएसएएमबीकडून तारण कर्ज मिळवा.",
    pledgeLoanAmount: "मागणी केलेली कर्ज रक्कम (₹)",
    pledgeLoanAmountPlaceholder: "उदा., १,५०,०००",

    section1: "२. विक्रेता तपशील",
    sellerName: "नाव / एफपीओ नाव",
    sellerNamePlaceholder: "उदा., रमेश पाटील किंवा लातूर शेतकरी एफपीओ",
    phoneNumber: "फोन नंबर",
    phoneNumberPlaceholder: "उदा., ९८७६५ ४३२१०",

    section2: "३. पीक / उत्पादन तपशील",
    cropName: "पीक / वस्तू",
    cropNamePlaceholder: "पीक निवडा",
    cropOther: "इतर (खाली नमूद करा)",
    cropOtherPlaceholder: "पिकाचे नाव प्रविष्ट करा",
    variety: "जात (लागू असल्यास)",
    varietyPlaceholder: "उदा., बीटी-कापूस, जेएस-३३५ सोयाबीन",
    quantity: "एकूण उपलब्ध प्रमाण",
    minQuantity: "विक्रीसाठी किमान इच्छुक प्रमाण",
    quantityUnit: "एकक",
    unitKg: "किलो",
    unitQuintal: "क्विंटल",
    unitTonne: "टन",
    availableFrom: "उपलब्ध तारीख (पासून)",
    availableUntil: "उपलब्ध तारीख (पर्यंत) / वितरण अंतिम मुदत",

    section3: "४. गुणवत्ता पडताळणी",
    section3Body: "उपलब्ध असल्यास गुणवत्ता चाचणी प्रमाणपत्र अपलोड करा. पडताळणी केलेल्या लॉटला बाजारपेठेत प्राधान्य दिले जाते.",
    photoUpload: "उत्पादनाचा फोटो अपलोड करा (एआय ग्रेडिंगसाठी)",
    photoUploadHint: "JPG किंवा PNG, 10MB पर्यंत",
    certUpload: "गुणवत्ता चाचणी प्रमाणपत्र अपलोड करा",
    certUploadHint: "PDF, DOCX किंवा प्रतिमा स्वरूप, 10MB पर्यंत",
    certNumber: "प्रमाणपत्र / चाचणी अहवाल क्रमांक",
    certNumberPlaceholder: "उदा., QTC-2026-00451",
    verificationStatus: "पडताळणी स्थिती",
    verificationStatusValue: "समिती पडताळणी प्रलंबित",
    verificationStatusHint: "पुनरावलोकनानंतर प्रणाली/समितीद्वारे निश्चित — शेतकऱ्याने प्रविष्ट करायचे नाही.",
    selfGrade: "स्वयं-घोषित दर्जा (प्रमाणपत्र नसल्यास पर्याय)",
    selfGradePlaceholder: "दर्जा निवडा",
    gradeA: "दर्जा अ",
    gradeB: "दर्जा ब",
    gradeC: "दर्जा क",

    section4: "५. एफपीओ / पीक एकत्रीकरण",
    poolingLabel: "उत्पादन एफपीओ / पीक पूलमध्ये जोडा",
    poolingHint: "मजबूत लिलाव किंमतीसाठी इतर शेतकऱ्यांच्या उत्पादनासह हा लॉट एकत्र करा.",
    poolingSelect: "एफपीओ / पूल निवडा",
    poolingSelectPlaceholder: "उदा., लातूर फार्मर्स प्रोड्युसर कंपनी",

    section5: "६. स्थान",
    state: "राज्य",
    statePlaceholder: "उदा., महाराष्ट्र",
    district: "जिल्हा",
    districtPlaceholder: "उदा., लातूर, यवतमाळ, नाशिक",
    village: "गाव / तालुका",
    villagePlaceholder: "उदा., औसा तालुका",
    pickupLocation: "पिकअप / साठवण स्थान",
    pickupLocationPlaceholder: "पिकअप किंवा साठवणीसाठी संपूर्ण पत्ता",

    section7: "७. लिलाव / किंमत",
    minAskingPrice: "किमान मागणी किंमत",
    perUnit: "प्रति",
    targetPrice: "प्राधान्य / लक्ष्य किंमत (ऐच्छिक)",

    section8: "८. वितरण / लॉजिस्टिक्स",
    deliveryMode: "वितरण पद्धत",
    deliveryBuyerPickup: "खरेदीदार पिकअप",
    deliveryFarmerDelivery: "शेतकरी वितरण",
    deliveryWarehouseTransfer: "गोदाम हस्तांतरण",
    maxDistance: "कमाल वितरण अंतर (किमी)",
    loadingDetails: "लोडिंग / पॅकेजिंग तपशील",
    loadingDetailsPlaceholder: "उदा., ५० किलो गोणपाटाच्या पिशव्यांमध्ये सैल, फोर्कलिफ्ट प्रवेश उपलब्ध",

    section9: "९. पेमेंट सेटलमेंट",
    paymentMethod: "पेमेंट पद्धत",
    paymentMethodPlaceholder: "पेमेंट पद्धत निवडा",
    paymentBankTransfer: "बँक हस्तांतरण (NEFT/RTGS)",
    paymentUpi: "यूपीआय",
    paymentCheque: "धनादेश (चेक)",
    paymentCod: "डिलिव्हरीच्या वेळी रोख",
    accountDetailsBank: "बँक खाते क्रमांक",
    accountDetailsUpi: "यूपीआय आयडी",
    accountDetailsCheque: "प्राप्तकर्त्याचे नाव (बँक नोंदीनुसार)",
    accountDetailsPlaceholder: "वरील निवडलेल्या पद्धतीनुसार",
    ifscCode: "आयएफएससी कोड",
    ifscCodePlaceholder: "उदा., SBIN0001234",
    codNote: "सेटलमेंट तपशीलाची गरज नाही — डिलिव्हरीच्या वेळी पेमेंट घेतले जाईल.",

    section10: "१०. अंतिम पुष्टीकरण",
    confirmOwnership: "मी पुष्टी करतो की हे उत्पादन विकण्याचा माझ्याकडे मालकी हक्क/अधिकार आहे",

    ledgerTitle: "थेट किंमत तक्ता",
    harvestValue: "अंदाजे लॉट मूल्य:",
    minAskLedger: "किमान मागणी (एकक किंमत):",
    quantityLedger: "एकूण प्रमाण:",
    finalPrice: "अंतिम विक्री किंमत:",
    finalPriceNote: "एकूण प्रमाण × किमान मागणी",
    submitting: "सिंक होत आहे...",
    submit: "लिलावासाठी सादर करा",
    cancel: "रद्द करा आणि डॅशबोर्डवर परत जा"
  },
  hi: {
    heading: "कृषि फसल पंजीकरण",
    subheading: "लॉजिस्टिक ट्रैकिंग के साथ अपनी फसल लाइव मार्केटप्लेस में प्रकाशित करें.",
    badge: "बाजार लिंकेज फॉर्म",
    successTitle: "फसल सफलतापूर्वक पंजीकृत हुई!",
    successBody: "फसल मेट्रिक्स और साइलो ई-टेंडर दस्तावेज़ MongoDB Atlas के साथ सिंक कर दिए गए हैं.",

    section6: "1. eNWR सत्यापन और स्वतः-भरण",
    enwrIntro: "पहले अपना eNWR (इलेक्ट्रॉनिक नेगोशिएबल वेयरहाउस रसीद) अपलोड करें — इससे नीचे दिए गए फसल, मात्रा और स्थान विवरण अपने आप भर जाएंगे. आप बाद में किसी भी फ़ील्ड को संपादित कर सकते हैं.",
    enwrAutoFilledBanner: "आपके eNWR से विवरण अपने आप भर दिए गए हैं — नीचे दी गई जानकारी जांचें और आवश्यकतानुसार संपादित करें.",
    storageType: "भंडारण स्थान / प्रकार",
    storageTypePlaceholder: "जैसे, फार्म गोदाम, एपीएमसी गोदाम",
    enwrUpload: "eNWR अपलोड करें",
    enwrUploadHint: "इलेक्ट्रॉनिक नेगोशिएबल वेयरहाउस रसीद — PDF या छवि, 10MB तक",
    enwrNumber: "eNWR संख्या",
    enwrNumberPlaceholder: "जैसे, ENWR/MH/2026/00981",
    enwrQuantity: "eNWR द्वारा कवर की गई मात्रा",
    pledgeLoanLabel: "eNWR पर एमएसएएमबी प्रतिज्ञा ऋण (Pledge Loan) हेतु आवेदन करें",
    pledgeLoanHint: "इस eNWR को गिरवी रखकर एमएसएएमबी से प्रतिज्ञा ऋण प्राप्त करें.",
    pledgeLoanAmount: "अनुरोधित ऋण राशि (₹)",
    pledgeLoanAmountPlaceholder: "जैसे, 150000",

    section1: "2. विक्रेता विवरण",
    sellerName: "नाम / एफपीओ नाम",
    sellerNamePlaceholder: "जैसे, रमेश पाटिल या लातूर किसान एफपीओ",
    phoneNumber: "फोन नंबर",
    phoneNumberPlaceholder: "जैसे, 98765 43210",

    section2: "3. फसल / उत्पाद विवरण",
    cropName: "फसल / जिंस",
    cropNamePlaceholder: "फसल चुनें",
    cropOther: "अन्य (नीचे बताएं)",
    cropOtherPlaceholder: "फसल का नाम दर्ज करें",
    variety: "किस्म (यदि लागू हो)",
    varietyPlaceholder: "जैसे, बीटी-कपास, जेएस-335 सोयाबीन",
    quantity: "कुल उपलब्ध मात्रा",
    minQuantity: "बेचने के लिए न्यूनतम इच्छुक मात्रा",
    quantityUnit: "इकाई",
    unitKg: "किलो",
    unitQuintal: "क्विंटल",
    unitTonne: "टन",
    availableFrom: "उपलब्धता तिथि (से)",
    availableUntil: "उपलब्धता तिथि (तक) / डिलीवरी की अंतिम तिथि",

    section3: "4. गुणवत्ता सत्यापन",
    section3Body: "उपलब्ध होने पर गुणवत्ता परीक्षण प्रमाणपत्र अपलोड करें. सत्यापित लॉट को बाज़ार में प्राथमिकता मिलती है.",
    photoUpload: "उत्पाद की फोटो अपलोड करें (एआई ग्रेडिंग हेतु)",
    photoUploadHint: "JPG या PNG, 10MB तक",
    certUpload: "गुणवत्ता परीक्षण प्रमाणपत्र अपलोड करें",
    certUploadHint: "PDF, DOCX या छवि प्रारूप, 10MB तक समर्थित",
    certNumber: "प्रमाणपत्र / परीक्षण रिपोर्ट संख्या",
    certNumberPlaceholder: "जैसे, QTC-2026-00451",
    verificationStatus: "सत्यापन स्थिति",
    verificationStatusValue: "समिति सत्यापन लंबित",
    verificationStatusHint: "समीक्षा के बाद सिस्टम/समिति द्वारा तय — किसान द्वारा दर्ज नहीं की जाती.",
    selfGrade: "स्व-घोषित ग्रेड (प्रमाणपत्र न होने पर विकल्प)",
    selfGradePlaceholder: "ग्रेड चुनें",
    gradeA: "ग्रेड ए",
    gradeB: "ग्रेड बी",
    gradeC: "ग्रेड सी",

    section4: "5. एफपीओ / फसल पूलिंग",
    poolingLabel: "उत्पाद को एफपीओ / फसल पूल में जोड़ें",
    poolingHint: "बेहतर नीलामी मूल्य के लिए इस लॉट को अन्य किसानों की उपज के साथ मिलाएं.",
    poolingSelect: "एफपीओ / पूल चुनें",
    poolingSelectPlaceholder: "जैसे, लातूर फार्मर्स प्रोड्यूसर कंपनी",

    section5: "6. स्थान",
    state: "राज्य",
    statePlaceholder: "जैसे, महाराष्ट्र",
    district: "जिला",
    districtPlaceholder: "जैसे, लातूर, यवतमाल, नासिक",
    village: "गांव / तालुका",
    villagePlaceholder: "जैसे, औसा तालुका",
    pickupLocation: "पिकअप / भंडारण स्थान",
    pickupLocationPlaceholder: "पिकअप या भंडारण के लिए पूरा पता",

    section7: "7. नीलामी / मूल्य निर्धारण",
    minAskingPrice: "न्यूनतम मांग मूल्य",
    perUnit: "प्रति",
    targetPrice: "पसंदीदा / लक्ष्य मूल्य (वैकल्पिक)",

    section8: "8. डिलीवरी / लॉजिस्टिक्स",
    deliveryMode: "डिलीवरी का तरीका",
    deliveryBuyerPickup: "खरीदार पिकअप",
    deliveryFarmerDelivery: "किसान डिलीवरी",
    deliveryWarehouseTransfer: "गोदाम स्थानांतरण",
    maxDistance: "अधिकतम डिलीवरी दूरी (किमी)",
    loadingDetails: "लोडिंग / पैकेजिंग विवरण",
    loadingDetailsPlaceholder: "जैसे, 50 किलो जूट बैग में ढीला, फोर्कलिफ्ट पहुंच उपलब्ध",

    section9: "9. भुगतान निपटान",
    paymentMethod: "भुगतान का तरीका",
    paymentMethodPlaceholder: "भुगतान का तरीका चुनें",
    paymentBankTransfer: "बैंक हस्तांतरण (NEFT/RTGS)",
    paymentUpi: "यूपीआई",
    paymentCheque: "चेक",
    paymentCod: "डिलीवरी पर नकद",
    accountDetailsBank: "बैंक खाता संख्या",
    accountDetailsUpi: "यूपीआई आईडी",
    accountDetailsCheque: "प्राप्तकर्ता का नाम (बैंक रिकॉर्ड के अनुसार)",
    accountDetailsPlaceholder: "ऊपर चुने गए तरीके के अनुसार",
    ifscCode: "आईएफएससी कोड",
    ifscCodePlaceholder: "जैसे, SBIN0001234",
    codNote: "निपटान विवरण की आवश्यकता नहीं — डिलीवरी पर भुगतान लिया जाएगा.",

    section10: "10. अंतिम पुष्टि",
    confirmOwnership: "मैं पुष्टि करता हूं कि इस उपज को बेचने का मेरे पास स्वामित्व/अधिकार है",

    ledgerTitle: "लाइव मूल्य निर्धारण खाता",
    harvestValue: "अनुमानित लॉट मूल्य:",
    minAskLedger: "न्यूनतम मांग (इकाई मूल्य):",
    quantityLedger: "कुल मात्रा:",
    finalPrice: "अंतिम मांग मूल्य:",
    finalPriceNote: "कुल मात्रा × न्यूनतम मांग",
    submitting: "सिंक हो रहा है...",
    submit: "नीलामी हेतु सबमिट करें",
    cancel: "रद्द करें और डैशबोर्ड पर वापस जाएं"
  }
};

const CROP_OPTIONS = [
  "Soybean", "Bt-Cotton", "Tur (Arhar)", "Chana (Gram)", "Jowar", "Bajra",
  "Wheat", "Onion", "Turmeric", "Sugarcane", "Other"
];

export default function CropRegistration({ onBack, onPublished = () => {}, language = 'en' }) {
  const t = translations[language] || translations.en;

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [enwrAutoFilled, setEnwrAutoFilled] = useState(false);

  const [formData, setFormData] = useState({
    // eNWR verification & auto-fill
    storageType: '',
    enwrFile: null,
    enwrNumber: '',
    enwrQuantity: '',
    msambPledgeLoan: false,
    pledgeLoanAmount: '',

    // Seller details
    sellerName: '',
    phoneNumber: '',

    // Crop / product details
    cropName: '',
    cropNameOther: '',
    variety: '',
    quantity: '',
    minQuantity: '',
    quantityUnit: 'quintal',
    availableFrom: '',
    availableUntil: '',

    // Quality verification
    qualityPhoto: null,
    certificateFile: null,
    certificateNumber: '',
    selfDeclaredGrade: '',

    // FPO / crop pooling
    isPoolingEnabled: false,
    poolingFpo: '',

    // Location
    state: '',
    district: '',
    village: '',
    pickupLocation: '',

    // Auction / pricing
    minAskingPrice: '',
    targetPrice: '',

    // Delivery / logistics
    deliveryMode: 'buyer_pickup',
    maxDeliveryDistance: '',
    loadingDetails: '',

    // Payment settlement
    paymentMethod: 'bank_transfer',
    accountDetails: '',
    ifscCode: '',

    // Final confirmation
    confirmOwnership: false,

    finalAskingPrice: 0
  });

  useEffect(() => {
    const qty = parseFloat(formData.quantity) || 0;
    const minAsk = parseFloat(formData.minAskingPrice) || 0;
    setFormData(prev => ({ ...prev, finalAskingPrice: qty * minAsk }));
  }, [formData.quantity, formData.minAskingPrice]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  // Uploading the eNWR simulates pulling the lot's registered details straight
  // from the warehouse receipt record, pre-filling the crop, quantity, and
  // location sections below. Only empty fields are filled so nothing the
  // farmer already typed gets overwritten.
  const handleEnwrFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    if (!file) {
      setFormData(prev => ({ ...prev, enwrFile: null }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      enwrFile: file,
      enwrNumber: prev.enwrNumber || `ENWR/MH/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      cropName: prev.cropName || 'Soybean',
      variety: prev.variety || 'JS-335',
      quantity: prev.quantity || '120',
      quantityUnit: prev.quantityUnit || 'quintal',
      enwrQuantity: prev.enwrQuantity || prev.quantity || '120',
      state: prev.state || 'Maharashtra',
      district: prev.district || 'Latur',
      village: prev.village || 'Ausa Taluk',
      pickupLocation: prev.pickupLocation || 'APMC Warehouse, Latur',
      storageType: prev.storageType || 'APMC-accredited warehouse'
    }));
    setEnwrAutoFilled(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const publishedCrop = { ...formData };

    // Writes into the shared, localStorage-backed store — this is what
    // makes the listing show up on BuyerDash/AdminDash and persist across reloads.
    listingsStore.addListing(publishedCrop);

    setIsLoading(false);
    setShowSuccess(true);
    onPublished(publishedCrop);

    setEnwrAutoFilled(false);
    setFormData({
      storageType: '', enwrFile: null, enwrNumber: '', enwrQuantity: '',
      msambPledgeLoan: false, pledgeLoanAmount: '',
      sellerName: '', phoneNumber: '',
      cropName: '', cropNameOther: '', variety: '', quantity: '', minQuantity: '',
      quantityUnit: 'quintal', availableFrom: '', availableUntil: '',
      qualityPhoto: null, certificateFile: null, certificateNumber: '', selfDeclaredGrade: '',
      isPoolingEnabled: false, poolingFpo: '',
      state: '', district: '', village: '', pickupLocation: '',
      minAskingPrice: '', targetPrice: '',
      deliveryMode: 'buyer_pickup', maxDeliveryDistance: '', loadingDetails: '',
      paymentMethod: 'bank_transfer', accountDetails: '', ifscCode: '',
      confirmOwnership: false, finalAskingPrice: 0
    });

    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 1500);
  };

  const unitLabel = formData.quantityUnit === 'kg' ? t.unitKg
    : formData.quantityUnit === 'tonne' ? t.unitTonne
    : t.unitQuintal;

  const accountLabel = formData.paymentMethod === 'upi' ? t.accountDetailsUpi
    : formData.paymentMethod === 'cheque' ? t.accountDetailsCheque
    : t.accountDetailsBank;

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

          {/* 1. eNWR Verification & Auto-Fill */}
          <div className="bg-white rounded-xl border-2 border-emerald-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-emerald-600" /> {t.section6}
            </h3>
            <p className="text-xs text-slate-500 leading-normal flex items-start gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{t.enwrIntro}</span>
            </p>

            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 transition-all text-center bg-slate-50/50">
              <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <input
                type="file" accept=".pdf,.jpg,.png" onChange={handleEnwrFileChange}
                name="enwrFile" id="enwr-upload" className="hidden"
              />
              <label htmlFor="enwr-upload" className="cursor-pointer block">
                <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block">
                  {formData.enwrFile ? formData.enwrFile.name : t.enwrUpload}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">{t.enwrUploadHint}</span>
              </label>
            </div>

            {enwrAutoFilled && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-lg animate-fadeIn">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{t.enwrAutoFilledBanner}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.enwrNumber}</label>
                <input
                  type="text" name="enwrNumber" value={formData.enwrNumber} onChange={handleInputChange}
                  placeholder={t.enwrNumberPlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.enwrQuantity}</label>
                <input
                  type="number" name="enwrQuantity" value={formData.enwrQuantity} onChange={handleInputChange} min="0"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.storageType}</label>
              <input
                type="text" name="storageType" value={formData.storageType} onChange={handleInputChange}
                placeholder={t.storageTypePlaceholder}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
              />
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                  <Landmark className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <label htmlFor="msambPledgeLoan" className="text-sm font-bold text-slate-800 block cursor-pointer">{t.pledgeLoanLabel}</label>
                    <span className="text-xs text-slate-400 block">{t.pledgeLoanHint}</span>
                  </div>
                </div>
                <input
                  type="checkbox" id="msambPledgeLoan" name="msambPledgeLoan" checked={formData.msambPledgeLoan} onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 flex-shrink-0"
                />
              </div>

              {formData.msambPledgeLoan && (
                <div className="animate-fadeIn pt-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.pledgeLoanAmount}</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="number" name="pledgeLoanAmount" value={formData.pledgeLoanAmount} onChange={handleInputChange} min="0"
                      placeholder={t.pledgeLoanAmountPlaceholder}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 bg-white rounded-lg text-sm transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Seller Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" /> {t.section1}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.sellerName}</label>
                <input
                  type="text" name="sellerName" value={formData.sellerName} onChange={handleInputChange} required
                  placeholder={t.sellerNamePlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.phoneNumber}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required
                    placeholder={t.phoneNumberPlaceholder}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Crop / Product Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Sprout className="h-4 w-4 text-emerald-600" /> {t.section2}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.cropName}</label>
                <select
                  name="cropName" value={formData.cropName} onChange={handleInputChange} required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                >
                  <option value="" disabled>{t.cropNamePlaceholder}</option>
                  {CROP_OPTIONS.map(crop => (
                    <option key={crop} value={crop}>{crop === 'Other' ? t.cropOther : crop}</option>
                  ))}
                </select>
              </div>
              {formData.cropName === 'Other' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.cropOther}</label>
                  <input
                    type="text" name="cropNameOther" value={formData.cropNameOther} onChange={handleInputChange} required
                    placeholder={t.cropOtherPlaceholder}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.variety}</label>
              <input
                type="text" name="variety" value={formData.variety} onChange={handleInputChange}
                placeholder={t.varietyPlaceholder}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.quantity}</label>
                <div className="relative">
                  <Scale className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required min="0"
                    placeholder="e.g., 50"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.minQuantity}</label>
                <input
                  type="number" name="minQuantity" value={formData.minQuantity} onChange={handleInputChange} min="0"
                  placeholder="e.g., 10"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.quantityUnit}</label>
                <select
                  name="quantityUnit" value={formData.quantityUnit} onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                >
                  <option value="kg">{t.unitKg}</option>
                  <option value="quintal">{t.unitQuintal}</option>
                  <option value="tonne">{t.unitTonne}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.availableFrom}</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date" name="availableFrom" value={formData.availableFrom} onChange={handleInputChange} required
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.availableUntil}</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date" name="availableUntil" value={formData.availableUntil} onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Quality Verification */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> {t.section3}
            </h3>
            <p className="text-xs text-slate-500 leading-normal">{t.section3Body}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-5 transition-all text-center bg-slate-50/50">
                <Camera className="h-7 w-7 text-slate-400 mx-auto mb-2" />
                <input
                  type="file" accept="image/*" onChange={handleFileChange}
                  name="qualityPhoto" id="quality-photo-upload" className="hidden"
                />
                <label htmlFor="quality-photo-upload" className="cursor-pointer block">
                  <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block">
                    {formData.qualityPhoto ? formData.qualityPhoto.name : t.photoUpload}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">{t.photoUploadHint}</span>
                </label>
              </div>

              <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-5 transition-all text-center bg-slate-50/50">
                <FileText className="h-7 w-7 text-slate-400 mx-auto mb-2" />
                <input
                  type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange}
                  name="certificateFile" id="cert-upload" className="hidden"
                />
                <label htmlFor="cert-upload" className="cursor-pointer block">
                  <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block">
                    {formData.certificateFile ? formData.certificateFile.name : t.certUpload}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">{t.certUploadHint}</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.certNumber}</label>
                <input
                  type="text" name="certificateNumber" value={formData.certificateNumber} onChange={handleInputChange}
                  placeholder={t.certNumberPlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              {!formData.certificateFile && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.selfGrade}</label>
                  <select
                    name="selfDeclaredGrade" value={formData.selfDeclaredGrade} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  >
                    <option value="" disabled>{t.selfGradePlaceholder}</option>
                    <option value="A">{t.gradeA}</option>
                    <option value="B">{t.gradeB}</option>
                    <option value="C">{t.gradeC}</option>
                  </select>
                </div>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.verificationStatus}</span>
              <span className="block text-sm font-semibold text-amber-600 mt-0.5">{t.verificationStatusValue}</span>
              <span className="block text-[11px] text-slate-400 mt-1">{t.verificationStatusHint}</span>
            </div>
          </div>

          {/* 5. FPO / Crop Pooling */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-600" /> {t.section4}
            </h3>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.poolingSelect}</label>
                  <input
                    type="text" name="poolingFpo" value={formData.poolingFpo} onChange={handleInputChange} required={formData.isPoolingEnabled}
                    placeholder={t.poolingSelectPlaceholder}
                    className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 6. Location */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" /> {t.section5}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.state}</label>
                <input
                  type="text" name="state" value={formData.state} onChange={handleInputChange} required
                  placeholder={t.statePlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.district}</label>
                <input
                  type="text" name="district" value={formData.district} onChange={handleInputChange} required
                  placeholder={t.districtPlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.village}</label>
                <input
                  type="text" name="village" value={formData.village} onChange={handleInputChange}
                  placeholder={t.villagePlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.pickupLocation}</label>
                <input
                  type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange}
                  placeholder={t.pickupLocationPlaceholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* 7. Auction / Pricing */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-emerald-600" /> {t.section7}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  {t.minAskingPrice} (₹ {t.perUnit} {unitLabel})
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number" name="minAskingPrice" value={formData.minAskingPrice} onChange={handleInputChange} required min="0"
                    placeholder="e.g., 4800"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.targetPrice}</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number" name="targetPrice" value={formData.targetPrice} onChange={handleInputChange} min="0"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 8. Delivery / Logistics */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-600" /> {t.section8}
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.deliveryMode}</label>
              <select
                name="deliveryMode" value={formData.deliveryMode} onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
              >
                <option value="buyer_pickup">{t.deliveryBuyerPickup}</option>
                <option value="farmer_delivery">{t.deliveryFarmerDelivery}</option>
                <option value="warehouse_transfer">{t.deliveryWarehouseTransfer}</option>
              </select>
            </div>

            {formData.deliveryMode === 'farmer_delivery' && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.maxDistance}</label>
                <input
                  type="number" name="maxDeliveryDistance" value={formData.maxDeliveryDistance} onChange={handleInputChange} min="0"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.loadingDetails}</label>
              <textarea
                name="loadingDetails" value={formData.loadingDetails} onChange={handleInputChange} rows="2"
                placeholder={t.loadingDetailsPlaceholder}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          {/* 9. Payment Settlement */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-600" /> {t.section9}
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.paymentMethod}</label>
              <select
                name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
              >
                <option value="bank_transfer">{t.paymentBankTransfer}</option>
                <option value="upi">{t.paymentUpi}</option>
                <option value="cheque">{t.paymentCheque}</option>
                <option value="cod">{t.paymentCod}</option>
              </select>
            </div>

            {formData.paymentMethod === 'cod' ? (
              <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{t.codNote}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{accountLabel}</label>
                  <input
                    type="text" name="accountDetails" value={formData.accountDetails} onChange={handleInputChange} required
                    placeholder={t.accountDetailsPlaceholder}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
                {formData.paymentMethod === 'bank_transfer' && (
                  <div className="animate-fadeIn">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{t.ifscCode}</label>
                    <input
                      type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} required
                      placeholder={t.ifscCodePlaceholder}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white transition-all"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 10. Final Confirmation */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-emerald-600" /> {t.section10}
            </h3>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox" name="confirmOwnership" checked={formData.confirmOwnership} onChange={handleInputChange} required
                className="h-4 w-4 mt-0.5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">{t.confirmOwnership}</span>
            </label>
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
                  <span>{t.quantityLedger}</span>
                  <span className="font-mono text-slate-200">
                    {(parseFloat(formData.quantity) || 0).toLocaleString('en-IN')} {unitLabel}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t.minAskLedger}</span>
                  <span className="font-mono text-slate-200">
                    ₹{(parseFloat(formData.minAskingPrice) || 0).toLocaleString('en-IN')} / {unitLabel}
                  </span>
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