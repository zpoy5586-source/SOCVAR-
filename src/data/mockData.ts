import { Product, Service, PatientRegistration, NewsArticle, Testimonial } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- BIONIC LEGS ---
  {
    id: 'leg-aegis-titan',
    name: 'Aegis-X Titan Microprocessor Knee System',
    category: 'legs',
    subCategory: 'Transfemoral (Above Knee)',
    tagline: 'Dual-sensor neural microprocessor with real-time stumble recovery',
    price: 18500,
    originalPrice: 21000,
    rating: 4.9,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    badge: 'Flagship Bionic',
    description: 'The Aegis-X Titan represents the pinnacle of robotic lower-limb prosthetics. Built with an aerospace-grade titanium frame and a dual-frequency microprocessor calculating kinetic swing velocity 1,000 times per second, it guarantees effortless slope negotiation, stair ascent, and instant stumble recovery.',
    keyFeatures: [
      'Adaptive Microprocessor Hydraulics with 1000Hz sensor array',
      'Dynamic stumble recovery reflex to prevent falls on uneven terrain',
      'Integrated Bluetooth 5.3 telemetry for mobile smartphone calibration',
      'Ultra-silent magnetic linear damper system',
      'Submersible IP68 waterproof rating (up to 3 meters fresh/salt water)'
    ],
    specs: [
      { label: 'Mobility Classification', value: 'K3 - K4 (High Mobility)' },
      { label: 'Weight Limit', value: '150 kg (330 lbs)' },
      { label: 'Knee Flexion Angle', value: 'Up to 142°' },
      { label: 'Battery Runtime', value: 'Up to 72 hours per charge' },
      { label: 'Chassis Material', value: 'Ti-6Al-4V Grade 5 Titanium & Carbon Shell' }
    ],
    warrantyYears: 5,
    weightGrams: 1420,
    batteryLifeHours: 72,
    isWaterproof: true,
    inStock: true,
    leadTimeDays: 7,
    fittingType: 'Custom Socket'
  },
  {
    id: 'leg-veloce-sprint',
    name: 'Veloce Carbon Sprint & Endurance Blade',
    category: 'legs',
    subCategory: 'Transtibial & Transfemoral',
    tagline: 'High-energy return curved composite blade for running and athletics',
    price: 8900,
    originalPrice: 9800,
    rating: 4.8,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    badge: 'Athletic Choice',
    description: 'Forged from multi-layered aerospace carbon fiber, the Veloce Sprint Blade is engineered for runners, sprinters, and active amputees. Delivers 96% kinetic energy rebound with low impact on the residual limb.',
    keyFeatures: [
      'Twin-spring carbon trajectory mimicking biological Achilles tendon',
      'Interchangeable spike soles and rubber all-terrain trail treads',
      'Zero maintenance passive mechanical recoil system',
      'Optimized pylon clamp for rapid alignment changes'
    ],
    specs: [
      { label: 'Energy Return Rate', value: '96.2%' },
      { label: 'User Weight Category', value: '50 - 130 kg (Category 1 - 8)' },
      { label: 'Ground Clearance', value: 'Adjustable 220 - 340 mm' },
      { label: 'Weight', value: '720g' },
      { label: 'Corrosion Resistance', value: 'Full saltwater & sweat resistant' }
    ],
    warrantyYears: 3,
    weightGrams: 720,
    isWaterproof: true,
    inStock: true,
    leadTimeDays: 5,
    fittingType: 'Modular Standard'
  },
  {
    id: 'leg-orthoflex-vacuum',
    name: 'OrthoFlex Smart Elevated Vacuum Transtibial System',
    category: 'legs',
    subCategory: 'Transtibial (Below Knee)',
    tagline: 'Active smart-vacuum socket technology that eliminates piston action & skin friction',
    price: 11200,
    rating: 4.9,
    reviewCount: 61,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    badge: 'Maximum Comfort',
    description: 'Designed specifically for below-knee amputees who suffer from residual limb volume fluctuations, blisters, or shear stresses. OrthoFlex monitors socket vacuum pressure dynamically and maintains constant intimate contact.',
    keyFeatures: [
      'Micro-pump active air-expulsion ensuring Zero-Slip linkage',
      'Gel-infused polyurethane smart liner with anti-microbial silver ion coating',
      'Shock-absorbing multiaxial ankle foot with hydraulic eversion/inversion',
      'Reduces limb shear stress by 85%'
    ],
    specs: [
      { label: 'Mobility Classification', value: 'K2 - K4' },
      { label: 'Vacuum Level', value: '-12 to -22 inHg automatically regulated' },
      { label: 'Ankle Range of Motion', value: '26° total (15° plantar, 11° dorsi)' },
      { label: 'Limb Volume Compensation', value: 'Up to ±12% daily change' }
    ],
    warrantyYears: 4,
    weightGrams: 1180,
    batteryLifeHours: 96,
    isWaterproof: true,
    inStock: true,
    leadTimeDays: 10,
    fittingType: 'Custom Socket'
  },
  {
    id: 'leg-hydro-trekker',
    name: 'HydroTrek All-Terrain Submersible Prosthetic Leg',
    category: 'legs',
    subCategory: 'Transfemoral & Transtibial',
    tagline: 'Heavy-duty polycentric 4-bar linkage engineered for mud, sand, and ocean swimming',
    price: 9400,
    originalPrice: 10500,
    rating: 4.7,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=900&q=80',
    badge: 'All-Terrain Outdoor',
    description: 'A completely mechanical, fail-safe water leg that requires no charging. Built with 316 Marine-grade stainless steel and carbon matrix tubing, ideal for outdoor enthusiasts, fishermen, and swimmers.',
    keyFeatures: [
      'Manual lock switch for steady stance in shallow water and slippery decks',
      'Quick-drain hydrodynamic canals preventing water weight buildup',
      'High-traction rubber tread foot with drainage vents',
      'Corrosion-proof Teflon bearings'
    ],
    specs: [
      { label: 'Water Depth Rating', value: 'Unlimited (Full immersion)' },
      { label: 'Weight Limit', value: '135 kg' },
      { label: 'Knee Mechanism', value: 'Polycentric 4-bar geometry' },
      { label: 'Materials', value: 'Marine 316 Stainless, Carbon, Delrin' }
    ],
    warrantyYears: 4,
    weightGrams: 1350,
    isWaterproof: true,
    inStock: true,
    leadTimeDays: 4,
    fittingType: 'Modular Standard'
  },

  // --- BIONIC HANDS ---
  {
    id: 'hand-neurogrip-pro',
    name: 'NeuroGrip Pro Multi-Articulating Bionic Hand',
    category: 'hands',
    subCategory: 'Transradial & Transhumeral',
    tagline: '14 automated grip modes with dual EMG neural surface electrodes',
    price: 19800,
    originalPrice: 22500,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    badge: 'Clinical Best Seller',
    description: 'The NeuroGrip Pro features individually powered motorized digits with proportional speed and force control. Using ultra-sensitive non-invasive myoelectric sensors placed over residual forearm muscle bellies, it transforms muscle twitches into smooth, natural hand movement.',
    keyFeatures: [
      '14 anatomical grip patterns: Precision Pinch, Power Key, Point Index, Tripod, Tool Grip, Relaxed',
      'Individual DC motors per finger with stall-detection stall torque',
      'Rotating thumb with motorized opposition control',
      'Conductive silicone fingertips compatible with all modern smartphones and touchscreens',
      'Quick-disconnect wrist for rapid tool or sports attachments'
    ],
    specs: [
      { label: 'Max Grip Force', value: '110 N (Power grasp)' },
      { label: 'Cycle Speed', value: 'Full open to close in 0.28 seconds' },
      { label: 'Sensory Method', value: 'Dual 8-channel myoelectric surface EMG' },
      { label: 'Battery Lifespan', value: '36 hours continuous use' },
      { label: 'Chassis Material', value: 'Aviation 7075 Aluminum & Carbon Skeleton' }
    ],
    warrantyYears: 5,
    weightGrams: 510,
    batteryLifeHours: 36,
    isWaterproof: false,
    inStock: true,
    leadTimeDays: 7,
    fittingType: 'Custom Socket'
  },
  {
    id: 'hand-haptic-touch',
    name: 'HapticTouch Sensory-Feedback Neural Bionic Arm',
    category: 'hands',
    subCategory: 'Transradial (Below Elbow)',
    tagline: 'Feel what you touch through closed-loop cutaneous tactile feedback arrays',
    price: 24500,
    originalPrice: 27000,
    rating: 5.0,
    reviewCount: 37,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    badge: 'Sensory Breakthrough',
    description: 'For the first time in commercial upper-limb prosthetics, HapticTouch closes the biological loop. Micro-pressure sensors in the fingertips relay tactile pressure back to your residual limb skin through gentle electro-tactile or vibro-transducers, letting you grasp fragile eggs or hold a loved one’s hand with intuitive pressure.',
    keyFeatures: [
      'Tactile closed-loop feedback transducers placed on residual limb skin',
      'AI pattern-recognition engine that adapts to user muscle fatigue throughout the day',
      'Reinforced titanium knuckles capable of handling heavy luggage and weights',
      'Integrated companion app for grip customization and live sensory telemetry'
    ],
    specs: [
      { label: 'Tactile Resolution', value: '32-level discrete pressure feedback' },
      { label: 'Grip Modes', value: '24 customizable profiles' },
      { label: 'Lift Capacity', value: '45 kg (99 lbs) passive hold' },
      { label: 'Weight', value: '560g including battery and sensors' }
    ],
    warrantyYears: 5,
    weightGrams: 560,
    batteryLifeHours: 28,
    isWaterproof: false,
    inStock: true,
    leadTimeDays: 14,
    fittingType: 'Custom Socket'
  },
  {
    id: 'hand-titan-industrial',
    name: 'TitanGrip Heavy-Duty Waterproof Task Arm',
    category: 'hands',
    subCategory: 'Transradial & Heavy Vocational',
    tagline: 'Ruggedized waterproof chassis built for construction, mechanics, and outdoor labor',
    price: 13900,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    badge: 'Heavy Duty IP67',
    description: 'Designed specifically for amputees returning to trades, mechanic shops, welding, and demanding manual labor. Built without fragile cosmetic gloves, featuring high-friction polyurethane pads and steel reinforced tendons.',
    keyFeatures: [
      'IP67 Dust and Waterproof: wash directly under running water or work in heavy rain',
      'High-torque planetary gearbox resisting up to 750 N accidental pinch force',
      'Non-slip textured jaw inserts with magnetic bolt-holding tip',
      'Impact-resistant elastomer bumpers'
    ],
    specs: [
      { label: 'Pinch Force', value: '180 N sustained' },
      { label: 'Ingress Protection', value: 'IP67 Certified' },
      { label: 'Impact Tolerance', value: 'Drop tested from 2.5 meters' },
      { label: 'Operating Temp', value: '-20°C to +55°C' }
    ],
    warrantyYears: 4,
    weightGrams: 640,
    batteryLifeHours: 48,
    isWaterproof: true,
    inStock: true,
    leadTimeDays: 6,
    fittingType: 'Modular Standard'
  },
  {
    id: 'hand-kidz-modular',
    name: 'KIDZ-Bio Pediatric Adaptive Grow-With-Me Hand',
    category: 'hands',
    subCategory: 'Pediatric (Ages 4-15)',
    tagline: 'Lightweight, cheerful, modular prosthetic hand that grows with childhood development',
    price: 6800,
    originalPrice: 7500,
    rating: 4.9,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    badge: 'Pediatric Design',
    description: 'Children need prosthetics that inspire confidence, playfulness, and keep up with physical growth. KIDZ-Bio utilizes an interchangeable 3D modular shell system where fingers and palm sizes can be upgraded annually at a fraction of the cost.',
    keyFeatures: [
      'Ultra-lightweight under 240g to prevent residual limb shoulder strain',
      'Play-proof shock resistant casing in customizable superhero & neon themes',
      'Intuitive dual-muscle myoelectric sensor with game-based training app',
      'Annual modular sizing upgrade subscription included'
    ],
    specs: [
      { label: 'Target Age', value: '4 to 15 years' },
      { label: 'Weight', value: '235g' },
      { label: 'Grip Types', value: 'Pinch, Ball Grasp, Pen Hold, High-Five' },
      { label: 'Shell Customization', value: '12 color themes' }
    ],
    warrantyYears: 3,
    weightGrams: 235,
    batteryLifeHours: 24,
    isWaterproof: true,
    inStock: true,
    leadTimeDays: 7,
    fittingType: 'Modular Standard'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'service-physiotherapy',
    category: 'physiotherapy',
    title: 'Advanced Physiotherapy & Gait Retraining',
    subtitle: 'Comprehensive post-amputation mobility rehabilitation & robotic gait optimization',
    pricePerSession: 140,
    packagePrice: 650,
    packageSessions: 5,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 168,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    shortDesc: 'State-of-the-art gait training, residual limb volume conditioning, prosthetic alignment adaptation, and balance mastery for lower and upper limb amputees.',
    fullDesc: 'Our specialized Physiotherapy and Gait Retraining Department bridges the gap between receiving a prosthetic device and moving with effortless biological confidence. Led by certified Doctor of Physical Therapy (DPT) clinicians and Prosthetic Rehabilitation Specialists, we utilize zero-gravity harness tracks, dynamic pressure-plate gait analysis, and biofeedback core stabilization.',
    keyBenefits: [
      'Dynamic balance restoration and fall prevention protocols',
      'Biomechanical gait analysis reducing hip and spine compensation strain',
      'Residual limb desensitization, edema reduction, and scar tissue mobilization',
      'Endurance conditioning and functional obstacle course navigation',
      'Personalized home exercise plan with real-time video exercises'
    ],
    targetConditions: [
      'Recent transfemoral & transtibial amputees preparing for first prosthesis',
      'Experienced amputees experiencing gait asymmetry or back/hip pain',
      'Athletic amputees transitioning to running blades or sport-specific legs',
      'Upper-limb amputees needing scapular stabilization & prosthetic arm control'
    ],
    methodologies: [
      'Computerized 3D Gait Analysis & Ground Reaction Force Mapping',
      'Body-Weight Supported Treadmill Training (BWSTT)',
      'Proprioceptive Neuromuscular Facilitation (PNF)',
      'Robotic Exoskeleton Stride Guidance'
    ],
    leadTherapist: {
      name: 'Dr. Marcus Vance, DPT, CPO',
      role: 'Director of Prosthetic Rehabilitation & Gait Biomechanics',
      credentials: 'DPT, Board Certified Clinical Specialist in Orthopedic & Amputee Physical Therapy',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      experienceYears: 16
    },
    deliveryMode: ['In-Clinic', 'Home Visit', 'Virtual Telehealth']
  },
  {
    id: 'service-speech',
    category: 'speech',
    title: 'Neurological & Cognitive Speech Therapy',
    subtitle: 'Specialized speech, voice, articulation, and cognitive-communication rehabilitation',
    pricePerSession: 125,
    packagePrice: 580,
    packageSessions: 5,
    durationMinutes: 50,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80',
    shortDesc: 'Comprehensive communication and cognitive speech therapy tailored for trauma survivors, post-stroke recovery, neurological articulation, and breath coordination.',
    fullDesc: 'Trauma, surgical interventions, neurological disorders, and prolonged critical care can drastically impact vocal cord motor control, respiratory rhythm, memory, and speech fluency. Our speech-language pathologists provide compassionate, science-backed therapy to rebuild vocal strength, articulate clearly, and regain social and professional voice confidence.',
    keyBenefits: [
      'Neuromuscular re-education of oral-motor, palatal, and vocal articulators',
      'Diaphragmatic breath support restoration for sustained clear voice projection',
      'Cognitive-communication strategies (memory, executive focus, word-finding)',
      'Swallowing (dysphagia) safety exercises and oral coordination',
      'Assistive augmentative communication (AAC) technology training'
    ],
    targetConditions: [
      'Traumatic brain injury (TBI) & post-accident communication impairment',
      'Stroke-induced aphasia, dysarthria, and apraxia of speech',
      'Tracheostomy or extended intubation voice fatigue and hoarseness',
      'Vocal strain, cognitive fog, and post-surgery speech rehabilitation'
    ],
    methodologies: [
      'Lee Silverman Voice Treatment (LSVT LOUD) Certified protocols',
      'Surface Electromyography (sEMG) Biofeedback for speech musculature',
      'Melodic Intonation Therapy & Rhythmized Articulation',
      'Digital Cognitive Rehabilitation Software Modules'
    ],
    leadTherapist: {
      name: 'Elena Rostova, M.S., CCC-SLP',
      role: 'Head of Neurological Speech & Cognitive Rehabilitation',
      credentials: 'Licensed Speech-Language Pathologist, ASHA Certified, Neuro-Rehab Fellow',
      avatar: 'https://images.unsplash.com/photo-1594824813500-244f77a83416?auto=format&fit=crop&w=400&q=80',
      experienceYears: 12
    },
    deliveryMode: ['In-Clinic', 'Virtual Telehealth']
  },
  {
    id: 'service-counseling',
    category: 'counseling',
    title: 'Trauma, Amputee & Psychological Counseling',
    subtitle: 'Empathetic mental health support, phantom limb coping & body image adaptation',
    pricePerSession: 130,
    packagePrice: 600,
    packageSessions: 5,
    durationMinutes: 50,
    rating: 5.0,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=900&q=80',
    shortDesc: 'Specialized clinical psychologists and peer counseling addressing the psychological realities of limb loss, phantom pain, body identity transformation, and family resilience.',
    fullDesc: 'Losing a limb or undergoing major reconstructive surgery is as much an emotional and psychological transformation as it is a physical one. Our specialized counseling department is dedicated exclusively to amputees and trauma survivors. We guide patients through phantom sensation management, grief processing, self-identity restoration, and returning to career and hobbies with unwavering optimism.',
    keyBenefits: [
      'Evidence-based relief techniques for Phantom Limb Pain (PLP) & sensations',
      'Overcoming grief, anxiety, and depression following traumatic amputation',
      'Healthy adaptation to changed body image and public social situations',
      'Family & caregiver dynamic counseling to build a rock-solid support network',
      'Vocational reintegration counseling and disability advocacy guidance'
    ],
    targetConditions: [
      'New amputees experiencing acute emotional distress, shock, or phantom limb pain',
      'Long-term prosthetic users confronting burnout or lifestyle transitions',
      'Caregivers, spouses, and parents of pediatric or adult amputees',
      'Veterans and first responders adapting to service-connected limb trauma'
    ],
    methodologies: [
      'Mirror Therapy & Virtual Reality Sensory Retraining for Phantom Pain',
      'Cognitive Behavioral Therapy (CBT) for Trauma and Body Image',
      'Acceptance and Commitment Therapy (ACT)',
      'Peer-Mentor Match Amputee Circles'
    ],
    leadTherapist: {
      name: 'Dr. Sarah Al-Mansoor, Ph.D., LPC',
      role: 'Chief Clinical Psychologist & Amputee Counseling Chair',
      credentials: 'Ph.D. in Clinical Rehabilitation Psychology, Certified Trauma Specialist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      experienceYears: 15
    },
    deliveryMode: ['In-Clinic', 'Virtual Telehealth', 'Home Visit']
  }
];

export const INITIAL_REGISTRATIONS: PatientRegistration[] = [
  {
    id: 'reg-001',
    registrationNumber: 'BNX-2026-7841',
    createdAt: '2026-09-24T10:30:00Z',
    fullName: 'Robert Sterling',
    email: 'robert.sterling@example.com',
    phone: '+1 (555) 349-2189',
    age: 38,
    gender: 'male',
    city: 'Chicago, IL',
    country: 'United States',
    amputationType: 'legs',
    amputationSide: 'right',
    amputationLevel: 'Transfemoral (Above Knee)',
    causeOfAmputation: 'Trauma / Accident',
    timeSinceAmputation: '6-12 months',
    mobilityKLevel: 'K3',
    currentDeviceStatus: 'Upgrading current device',
    selectedServices: ['physiotherapy', 'counseling'],
    primaryGoal: 'Achieve stable independent walking on stairs and resume light hiking without canes.',
    preferredConsultationType: 'In-Clinic VIP Fitting',
    status: 'under_clinical_review',
    assignedSpecialist: 'Dr. Marcus Vance, DPT, CPO',
    scheduledDate: '2026-10-04T14:00:00Z',
    emergencyContactName: 'Clara Sterling (Spouse)',
    emergencyContactPhone: '+1 (555) 349-2190',
    notes: 'Residual limb healthy, fully matured surgical scar. Evaluated for Aegis-X Titan Knee.'
  },
  {
    id: 'reg-002',
    registrationNumber: 'BNX-2026-7842',
    createdAt: '2026-09-26T15:15:00Z',
    fullName: 'Amina Nour',
    email: 'amina.nour@example.com',
    phone: '+1 (555) 892-4112',
    age: 29,
    gender: 'female',
    city: 'Boston, MA',
    country: 'United States',
    amputationType: 'hands',
    amputationSide: 'left',
    amputationLevel: 'Transradial (Below Elbow)',
    causeOfAmputation: 'Congenital',
    timeSinceAmputation: '3+ years',
    currentDeviceStatus: 'Upgrading current device',
    selectedServices: ['physiotherapy', 'speech'],
    primaryGoal: 'Transition from passive cosmetic hand to multi-articulating myoelectric hand for graphic design work and typing.',
    preferredConsultationType: 'In-Clinic VIP Fitting',
    status: 'assessment_scheduled',
    assignedSpecialist: 'Dr. Sarah Al-Mansoor, Ph.D.',
    scheduledDate: '2026-10-08T10:30:00Z',
    emergencyContactName: 'Tariq Nour (Brother)',
    emergencyContactPhone: '+1 (555) 892-4115',
    notes: 'Candidate for NeuroGrip Pro or HapticTouch with EMG fine motor training.'
  },
  {
    id: 'reg-003',
    registrationNumber: 'BNX-2026-7843',
    createdAt: '2026-09-28T09:40:00Z',
    fullName: 'David K. Henderson',
    email: 'david.henderson@example.com',
    phone: '+1 (555) 412-9903',
    age: 45,
    gender: 'male',
    city: 'Seattle, WA',
    country: 'United States',
    amputationType: 'legs',
    amputationSide: 'bilateral',
    amputationLevel: 'Bilateral Transtibial (Below Knee)',
    causeOfAmputation: 'Vascular / Diabetic',
    timeSinceAmputation: '1-3 years',
    mobilityKLevel: 'K2',
    currentDeviceStatus: 'Replacement needed',
    selectedServices: ['physiotherapy', 'counseling'],
    primaryGoal: 'Replace heavy ill-fitting sockets with dual elevated vacuum systems to prevent skin breakdown.',
    preferredConsultationType: 'In-Clinic VIP Fitting',
    status: 'registered',
    emergencyContactName: 'Margaret Henderson',
    emergencyContactPhone: '+1 (555) 412-9904',
    notes: 'Requires dual vacuum casting and gait balance retraining.'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-01',
    title: 'Direct Neural Interfacing: The Next Evolution of Bionic Hand Manipulation',
    category: 'Clinical Tech',
    author: 'Dr. Julian Morales',
    authorRole: 'Chief Technology Officer, Bionix Lab',
    date: 'Sep 21, 2026',
    readTime: '5 min read',
    summary: 'How targeted muscle reinnervation (TMR) combined with high-density myoelectric sensors is cutting reaction times down to biological reflexes.',
    content: [
      'Over the past decade, bionic hands have transformed from single-motor pinchers into sophisticated multi-articulating wonders. Yet, the primary bottleneck has always been the interface between the human nervous system and the robotic chassis.',
      'Our research facility at Bionix & Rehab has integrated 16-channel dry surface EMG arrays with machine-learning pattern recognition. Instead of having to awkwardly isolate forearm muscles, patients simply think about grabbing a mug, turning a key, or typing, and the robotic hand mirrors the intention in less than 35 milliseconds.',
      'Clinical trials across 50 amputee volunteers demonstrated a 92% reduction in cognitive fatigue during daily office and home tasks.'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'news-02',
    title: 'From Intensive Care to 10K Marathon: Robert’s Unyielding Spirit',
    category: 'Patient Stories',
    author: 'Elena Rostova',
    authorRole: 'Clinical Rehabilitation Editor',
    date: 'Sep 15, 2026',
    readTime: '4 min read',
    summary: 'After surviving a high-speed motorcycle collision and transfemoral amputation, Robert completed his first endurance race using the Aegis-X Titan and Veloce Blade.',
    content: [
      'Two years ago, Robert Sterling woke up in trauma intensive care facing an above-knee amputation. The emotional shock was staggering, compounded by intense phantom limb pain.',
      'Through our integrated care pathway combining psychological counseling with Dr. Sarah Al-Mansoor, rigorous robotic gait retraining with Dr. Marcus Vance, and precision titanium socket fabrication, Robert rebuilt his strength step by step.',
      '"The technology gave me the hardware," Robert says, "but the therapy team gave me my life back."'
    ],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'news-03',
    title: 'Managing Phantom Limb Pain: Breakthroughs in Virtual Reality Mirror Therapy',
    category: 'Rehabilitation',
    author: 'Dr. Sarah Al-Mansoor, Ph.D.',
    authorRole: 'Director of Amputee Counseling',
    date: 'Sep 08, 2026',
    readTime: '6 min read',
    summary: 'Why up to 80% of amputees experience phantom pain and how cutting-edge immersive sensory feedback provides non-opioid neural relief.',
    content: [
      'Phantom limb pain is not imagined; it is a neurological misfire occurring in the primary somatosensory cortex when the brain seeks feedback from a missing limb and receives silence.',
      'Our clinic has introduced 3D immersive VR mirror therapy where patients see an avatar of their missing limb moving smoothly in virtual space synchronized with residual muscle contractions.',
      'Results show a 68% drop in subjective pain scores without reliance on heavy prescription painkillers, allowing patients to sleep peacefully and participate fully in daily life.'
    ],
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'news-04',
    title: 'Global Outreach 2026: Subsidizing Bionic Care for Underserved Amputees',
    category: 'Company News',
    author: 'Bionix Executive Foundation',
    authorRole: 'Humanitarian Care Board',
    date: 'Aug 29, 2026',
    readTime: '3 min read',
    summary: 'Announcing our 2026 Hope In Motion fund: committing 150 pro-bono bionic fittings and comprehensive therapy scholarships worldwide.',
    content: [
      'Prosthetic technology must not be a luxury reserved for the few. Bionix & Rehab is proud to announce the expansion of the Hope In Motion foundation, partnering with global trauma recovery NGOs.',
      'For every 10 commercial bionic systems sold, we fund one full pediatric or adult fitting along with 6 months of specialized physiotherapy and counseling.'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance Jr.',
    age: 34,
    amputationInfo: 'Right Transfemoral (Above Knee)',
    deviceUsed: 'Aegis-X Titan Microprocessor Knee',
    achievement: 'Hiked 14 miles across Appalachian trails 9 months post-fitting',
    quote: 'Before Aegis-X, every gravel path made me freeze in fear of falling. Now, the hydraulic reflex catches me instantly if I stumble.',
    story: 'The combination of personalized socket vacuum fitting and gait therapy changed my entire trajectory. I went from avoiding going outside to coaching my daughter’s soccer team.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'test-2',
    name: 'Sophia Chang',
    age: 26,
    amputationInfo: 'Left Transradial (Below Elbow)',
    deviceUsed: 'NeuroGrip Pro Multi-Articulating Hand',
    achievement: 'Returned to fine culinary cooking & violin playing',
    quote: 'Being able to switch between precision pinch for holding garlic cloves and a firm cylinder grip for a sauté pan felt like magic.',
    story: 'The occupational therapy and speech/cognitive counseling helped me manage the trauma of my accident. The team treated me with such respect and scientific precision.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'test-3',
    name: 'Carl Washington',
    age: 52,
    amputationInfo: 'Bilateral Transtibial (Below Knee)',
    deviceUsed: 'Dual OrthoFlex Elevated Vacuum System',
    achievement: 'Zero skin sores in 18 months, walking 8,000 steps daily',
    quote: 'Diabetic limb loss was terrifying. Bionix gave me back my dignity, my legs, and my peace of mind.',
    story: 'The socket comfort is unlike anything else. No rubbing, no sweat accumulation. The physiotherapy team taught me how to distribute my weight naturally.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];
