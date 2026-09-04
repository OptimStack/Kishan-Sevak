// listingsStore.js
// A tiny frontend-only "shared database" for crop listings, backed by
// localStorage. Any component that reads via useSyncExternalStore(subscribe,
// getListings) re-renders automatically when a listing is added or bid on —
// whether that happens in this tab or another tab of the same browser.
//
// Limitation: localStorage is per-browser. This will NOT sync a listing
// between two different browsers/devices — that requires a real backend.

const STORAGE_KEY = 'krishilink_listings_v1';

const seedListings = [
  { id: '1', cropName: 'Soybean', variety: '', grade: 'A', verified: true, quantity: 45, unit: 'quintal', minAskingPrice: 4600, location: 'Latur', farmerName: 'Ramesh Patil', highestBid: 4850, currentBuyer: 'Marico Industries' },
  { id: '2', cropName: 'Cotton', variety: '', grade: 'A', verified: true, quantity: 20, unit: 'quintal', minAskingPrice: 6800, location: 'Yavatmal', farmerName: 'Sanjay Deshmukh', highestBid: null, currentBuyer: null },
  { id: '3', cropName: 'Onion', variety: '', grade: 'B', verified: true, quantity: 120, unit: 'quintal', minAskingPrice: 1500, location: 'Nashik', farmerName: 'Anil Shinde', highestBid: 1620, currentBuyer: 'BigBasket Wholesale' },
  { id: '4', cropName: 'Turmeric', variety: '', grade: 'A', verified: true, quantity: 15, unit: 'quintal', minAskingPrice: 7200, location: 'Sangli', farmerName: 'Vikas Joshi', highestBid: null, currentBuyer: null }
];

function readFromStorage() {
  if (typeof window === 'undefined') return seedListings;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedListings;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedListings;
  } catch {
    return seedListings;
  }
}

function writeToStorage(listings) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch {
    // Private browsing / quota exceeded — fail silently, in-memory state still works for this tab.
  }
}

let listings = readFromStorage();
const listeners = new Set();

function notify() {
  listeners.forEach((cb) => cb());
}

// Catch changes written by OTHER tabs/windows of this same browser.
// (The 'storage' event never fires in the tab that made the change,
// only in other tabs — that's why writes below also call notify() directly.)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      listings = readFromStorage();
      notify();
    }
  });
}

export const listingsStore = {
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  getListings() {
    return listings;
  },

  // Called by CropRegistration on successful submit.
  addListing(cropData) {
    const newListing = {
      id: Date.now().toString(),
      cropName: cropData.cropName === 'Other' ? cropData.cropNameOther : cropData.cropName,
      variety: cropData.variety || '',
      grade: cropData.selfDeclaredGrade || 'Pending verification',
      quantity: parseFloat(cropData.quantity) || 0,
      unit: cropData.quantityUnit || 'quintal',
      minAskingPrice: parseFloat(cropData.minAskingPrice) || 0,
      location: cropData.district || cropData.village || 'Maharashtra',
      farmerName: cropData.sellerName || 'Farmer',
      verified: false,
      highestBid: null,
      currentBuyer: null
    };
    listings = [newListing, ...listings];
    writeToStorage(listings);
    notify();
    return newListing;
  },

  // Called by AdminDash when the quality committee confirms a grade.
  verifyListing(id, finalGrade) {
    listings = listings.map((item) =>
      item.id === id ? { ...item, grade: finalGrade, verified: true } : item
    );
    writeToStorage(listings);
    notify();
  },

  // Called by BuyerDash when a bid is placed.
  placeBid(id, amount, buyerName = 'Your Firm (Demo Wholesaler)') {
    listings = listings.map((item) =>
      item.id === id ? { ...item, highestBid: amount, currentBuyer: buyerName } : item
    );
    writeToStorage(listings);
    notify();
  }
};