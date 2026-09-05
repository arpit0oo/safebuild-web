import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const goliath = {
  name: "Goliath Crane",
  slug: "goliath-crane",
  category: "goliath-crane",
  categoryName: "Goliath Crane",
  image: "",
  isFeatured: true,
  tagline: "IS:3177 and IS:807 certified goliath crane for open yard heavy operations",
  description: "Safe Build Engineering's Goliath Cranes are designed and manufactured in accordance with IS:3177 and IS:4137, considering adequate factor of safety with respect to appropriate duty.\n\nThe structural parts of the cranes are designed in accordance with IS:807. Safe Build Engineering manufactures cranes as per international standards — built with standard components and controls to ensure long-term reliability.\n\nOur wide range of Goliath Cranes are ideal for handling heavy material equipment across various industries and projects. Applicable in construction, industry, yards, roadsides and other open areas.",
  features: [
    "High quality structural assembly per IS:4301",
    "Minimum maintenance and emergency interlude",
    "Easily adjustable limit-switches",
    "Load tested to 125% and certified",
    "Squirrel cage induction motors with fail safe brakes",
    "Built-in brakes for hoisting, cross travel and long travel"
  ],
  specs: {
    "Safe Working Load": "1000 kg to 60,000 kg",
    "Span": "5 m to 50 m",
    "Height of Lift": "As per customer specifications",
    "Class of Duty": "M5, M7, M8 as per IS 3177 / IS 807",
    "Speeds": "Selected depending on client specifications and shed dimensions",
    "Crane Control": "Pendant push buttons / Radio remote / Cabin with master control",
    "Drive System": "Twin drive squirrel cage induction geared motors with fail safe brakes",
    "Motor Insulation Class": "B/F",
    "Power Supply": "Trailing cables / drag chain / shrouded bus bars / cable reeling drum"
  },
  sections: [],
  contentStatus: "Draft",
  imageStatus: "Client to Provide"
};

try {
  await setDoc(doc(db, 'products', 'goliath-crane'), goliath);
  console.log('✅ Goliath Crane re-seeded successfully');
} catch (e) {
  console.error('❌ Seed failed:', e);
}
