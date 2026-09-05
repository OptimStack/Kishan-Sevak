import { getQualityKey } from './localization.js';

export const normalizeMatchValue = (value) => String(value || '').trim().toLocaleLowerCase();

export const isCommodityQualityMatch = (farmerListing, buyerBid) => (
  (farmerListing.cropCode && buyerBid.cropCode
    ? normalizeMatchValue(farmerListing.cropCode) === normalizeMatchValue(buyerBid.cropCode)
    : normalizeMatchValue(farmerListing.cropName) === normalizeMatchValue(buyerBid.crop))
  && getQualityKey(farmerListing.quality) === getQualityKey(buyerBid.quality)
);

export const hasMatchingBuyerBid = (farmerListing, buyerBids) => (
  buyerBids.some((buyerBid) => isCommodityQualityMatch(farmerListing, buyerBid))
);

export const hasMatchingFarmerAsk = (buyerBid, farmerListings) => (
  farmerListings.some((farmerListing) => isCommodityQualityMatch(farmerListing, buyerBid))
);
