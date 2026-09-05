export const qualityOptions = {
  en: [
    { value: 'premium', label: 'Premium' },
    { value: 'grade-a', label: 'Grade A' },
    { value: 'grade-b', label: 'Grade B' },
    { value: 'standard', label: 'Standard' }
  ],
  mr: [
    { value: 'premium', label: 'प्रीमियम' },
    { value: 'grade-a', label: 'ग्रेड A' },
    { value: 'grade-b', label: 'ग्रेड B' },
    { value: 'standard', label: 'सामान्य' }
  ],
  hi: [
    { value: 'premium', label: 'प्रीमियम' },
    { value: 'grade-a', label: 'ग्रेड A' },
    { value: 'grade-b', label: 'ग्रेड B' },
    { value: 'standard', label: 'मानक' }
  ]
};

export const getQualityOptions = (language) => qualityOptions[language] || qualityOptions.en;

export const getQualityKey = (value) => {
  const normalized = String(value || '').trim().toLocaleLowerCase();
  if (normalized.includes('premium') || normalized.includes('प्रीमियम')) return 'premium';
  if (normalized.includes('grade a') || normalized.includes('ग्रेड a')) return 'grade-a';
  if (normalized.includes('grade b') || normalized.includes('ग्रेड b')) return 'grade-b';
  return 'standard';
};

export const getQualityLabel = (value, language) => (
  getQualityOptions(language).find((option) => option.value === getQualityKey(value))?.label || value
);

export const getCommodityLabel = (item, commodities, language) => {
  const match = commodities.find((commodity) => (
    (item.cropCode && commodity.code === item.cropCode)
    || [item.crop, item.cropName].includes(commodity.nameEn)
    || [item.crop, item.cropName].includes(commodity.nameMr)
  ));

  if (!match) return item.crop || item.cropName || '';
  return language === 'en' ? match.nameEn : match.nameMr;
};

export const getDistrictLabel = (item, districts, language) => {
  const match = districts.find((district) => (
    (item.locationCode && district.code === item.locationCode)
    || [item.location].includes(district.nameEn)
    || [item.location].includes(district.nameMr)
  ));

  if (!match) return item.location || '';
  return language === 'en' ? match.nameEn : match.nameMr;
};
