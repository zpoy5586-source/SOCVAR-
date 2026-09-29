export type ProductCategory = 'legs' | 'hands';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string; // e.g. 'Transfemoral Knee', 'Transtibial Foot', 'Multi-Grip Hand', 'Transradial Arm'
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
  keyFeatures: string[];
  specs: ProductSpec[];
  warrantyYears: number;
  weightGrams: number;
  batteryLifeHours?: number;
  isWaterproof: boolean;
  inStock: boolean;
  leadTimeDays: number;
  fittingType: 'Custom Socket' | 'Modular Standard' | 'Osseointegrated Ready';
}

export type ServiceCategory = 'physiotherapy' | 'speech' | 'counseling';

export interface Therapist {
  name: string;
  role: string;
  credentials: string;
  avatar: string;
  experienceYears: number;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  pricePerSession: number;
  packagePrice: number;
  packageSessions: number;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  image: string;
  shortDesc: string;
  fullDesc: string;
  keyBenefits: string[];
  targetConditions: string[];
  methodologies: string[];
  leadTherapist: Therapist;
  deliveryMode: ('In-Clinic' | 'Virtual Telehealth' | 'Home Visit')[];
}

export type AmputationType = 'legs' | 'hands' | 'both' | 'rehabilitation';

export type MobilityLevel = 'K1' | 'K2' | 'K3' | 'K4';

export interface PatientRegistration {
  id: string;
  registrationNumber: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  city: string;
  country: string;
  
  // Specific Clinical details
  amputationType: AmputationType;
  amputationSide: 'left' | 'right' | 'bilateral';
  amputationLevel: string; // e.g. Transtibial (below knee), Transfemoral (above knee), Transradial (below elbow), Transhumeral (above elbow)
  causeOfAmputation: 'Trauma / Accident' | 'Vascular / Diabetic' | 'Cancer / Tumor' | 'Congenital' | 'Other';
  timeSinceAmputation: string; // e.g. "< 6 months", "6-12 months", "1-3 years", "3+ years"
  mobilityKLevel?: MobilityLevel;
  currentDeviceStatus: 'First-time prosthetic user' | 'Upgrading current device' | 'Replacement needed' | 'Post-surgical recovery';
  
  // Therapy needs
  selectedServices: ('physiotherapy' | 'speech' | 'counseling')[];
  primaryGoal: string;
  preferredConsultationType: 'In-Clinic VIP Fitting' | 'Telehealth Initial Assessment' | 'Home Evaluation';
  
  // Status
  status: 'registered' | 'under_clinical_review' | 'assessment_scheduled' | 'fitting_in_progress' | 'device_delivered';
  assignedSpecialist?: string;
  scheduledDate?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  additionalNotes?: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  productId?: string;
  serviceId?: string;
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  image: string;
  options?: {
    size?: string;
    side?: 'Left' | 'Right' | 'Bilateral Pair';
    socketCustomization?: string;
    sessionPackage?: string;
    bookingDate?: string;
    bookingTime?: string;
    deliveryMode?: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: 'Credit Card' | 'Health Insurance Co-Pay' | 'Medical Financing' | 'Direct Transfer';
  status: 'paid' | 'processing' | 'shipped' | 'delivered';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Clinical Tech' | 'Patient Stories' | 'Rehabilitation' | 'Company News';
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  amputationInfo: string;
  deviceUsed: string;
  quote: string;
  story: string;
  image: string;
  achievement: string;
}
