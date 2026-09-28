// Initial Seed Data for Glowspace Skincare Retail

export const INITIAL_CATEGORIES = [
  {
    id: 'face-care',
    name: 'Face Care',
    slug: 'face-care',
    tagline: 'Targeted treatments, serums & cleansers for radiant skin',
    icon: 'sparkles',
    image: 'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop',
    itemCount: 8
  },
  {
    id: 'body-care',
    name: 'Body Care',
    slug: 'body-care',
    tagline: 'Hydrating lotions, velvet washes & body oils',
    icon: 'heart',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    itemCount: 3
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    slug: 'hair-care',
    tagline: 'Scalp therapies, botanical elixirs & nutritive masks',
    icon: 'wind',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    itemCount: 2
  },
  {
    id: 'skin-essentials',
    name: 'Skin Essentials',
    slug: 'skin-essentials',
    tagline: 'Sunscreens, mists, lip treatments & daily shields',
    icon: 'sun',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    itemCount: 3
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: 'GLW-FC-01',
    name: 'Glowspace Hydrating Face Serum',
    subtitle: 'Hyaluronic Acid 2% + Provitamin B5',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 899,
    originalPrice: 1199,
    costPrice: 340,
    stock: 45,
    minStockThreshold: 10,
    rating: 4.9,
    reviewCount: 142,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An ultra-lightweight, multi-depth hydration serum combining three molecular weights of Pure Hyaluronic Acid with soothing Provitamin B5 to plump, hydrate, and visibly smooth fine dehydration lines.',
    ingredients: 'Aqua, Sodium Hyaluronate (Multi-molecular), Panthenol (Provitamin B5), Glycerin, Centella Asiatica Extract, Sodium PCA, Ethylhexylglycerin, Phenoxyethanol.',
    howToUse: 'Apply 3-4 drops onto clean, slightly damp facial skin every morning and evening. Gently pat until fully absorbed before following with your favorite moisturizer.',
    benefits: 'Delivers 72-hour deep cellular moisture, restores skin bounce, calms redness, and reinforces the epidermal barrier without feeling sticky.',
    suitableFor: 'All skin types, especially dehydrated, sensitive, and dry skin.',
    unitsSold: 320
  },
  {
    id: 'prod-002',
    sku: 'GLW-FC-02',
    name: 'Vitamin C 15% Brightening Serum',
    subtitle: 'Pure L-Ascorbic Acid + Ferulic Acid & Vitamin E',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 999,
    originalPrice: 1399,
    costPrice: 380,
    stock: 6, // Low Stock for demo alert!
    minStockThreshold: 10,
    rating: 4.8,
    reviewCount: 98,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A potent antioxidant powerhouse serum designed to visibly fade dark spots, even out hyperpigmentation, and impart a radiant, lit-from-within morning glow.',
    ingredients: 'Aqua, 3-O-Ethyl Ascorbic Acid 15%, Ferulic Acid 0.5%, Tocopherol (Vitamin E), Kakadu Plum Extract, Propanediol, Sodium Hyaluronate.',
    howToUse: 'Dispense 3-4 drops in the morning. Smooth evenly over clean face and neck. Always follow with a broad-spectrum SPF 50.',
    benefits: 'Diminishes sun spots and post-acne marks, boosts collagen synthesis, and defends against urban oxidative stress.',
    suitableFor: 'Dull, uneven, sun-damaged, or hyperpigmented skin.',
    unitsSold: 285
  },
  {
    id: 'prod-003',
    sku: 'GLW-FC-03',
    name: 'Gentle Hydrating Ceramide Cleanser',
    subtitle: 'Non-Foaming Gentle Gel with 3 Essential Ceramides',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 549,
    originalPrice: 699,
    costPrice: 190,
    stock: 58,
    minStockThreshold: 12,
    rating: 4.9,
    reviewCount: 115,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1556228722-d0b5be04912d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228722-d0b5be04912d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A comforting, pH-balanced creamy gel cleanser that melts away impurities, excess sebum, and light makeup without stripping vital natural barrier oils.',
    ingredients: 'Aqua, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Oat Kernel Flour, Cocamidopropyl Hydroxysultaine.',
    howToUse: 'Massage gently over wet skin in circular motions for 60 seconds. Rinse thoroughly with lukewarm water.',
    benefits: 'Cleanses gently while replenishing essential skin lipids and maintaining optimum pH balance (5.5).',
    suitableFor: 'Normal, dry, and sensitive skin types.',
    unitsSold: 240
  },
  {
    id: 'prod-004',
    sku: 'GLW-FC-04',
    name: 'Rose Water & Niacinamide Balancing Toner',
    subtitle: 'Damask Rose Hydrosol + 5% Niacinamide & Zinc',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 499,
    originalPrice: 649,
    costPrice: 160,
    stock: 5, // Low stock for demo alert!
    minStockThreshold: 10,
    rating: 4.7,
    reviewCount: 76,
    isBestSeller: false,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An alcohol-free, refreshing facial toner steam-distilled from pure Damask Rose Petals, enriched with 5% Niacinamide to tighten enlarged pores and balance oiliness.',
    ingredients: 'Rosa Damascena Flower Water 85%, Niacinamide 5%, Zinc PCA 1%, Witch Hazel Extract (Alcohol Free), Allantoin, Sodium Hyaluronate.',
    howToUse: 'After cleansing, pour onto a cotton pad or mist directly over face and gently press into skin until absorbed.',
    benefits: 'Refines skin texture, minimizes visible pore appearance, calms irritations, and provides instantaneous dewy hydration.',
    suitableFor: 'Oily, combination, and acne-prone skin.',
    unitsSold: 190
  },
  {
    id: 'prod-005',
    sku: 'GLW-FC-05',
    name: 'Deep Moisture Ceramide Repair Cream',
    subtitle: 'Ceramides + Squalane + Centella Asiatica',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 799,
    originalPrice: 1099,
    costPrice: 280,
    stock: 38,
    minStockThreshold: 10,
    rating: 4.9,
    reviewCount: 88,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A rich yet non-greasy barrier recovery cream formulated with a 3:1:1 physiological lipid ratio to lock in moisture, eliminate dry patches, and repair compromised barriers.',
    ingredients: 'Aqua, Caprylic/Capric Triglyceride, Plant Squalane, Ceramide NP, Shea Butter, Centella Asiatica Extract, Madecassoside, Glycerin.',
    howToUse: 'Warm a dime-sized amount between fingertips and gently press onto face and neck as the final moisturizing step.',
    benefits: 'Restores skin barrier strength in 3 days, heals flakiness, and soothes redness after active treatments.',
    suitableFor: 'Dry, stressed, and sensitive skin.',
    unitsSold: 215
  },
  {
    id: 'prod-006',
    sku: 'GLW-SE-01',
    name: 'Mineral Dew Broad-Spectrum Sunscreen SPF 50+',
    subtitle: 'PA++++ Zinc Oxide Sunscreen with Dewy Invisible Finish',
    category: 'skin-essentials',
    categoryName: 'Skin Essentials',
    price: 699,
    originalPrice: 899,
    costPrice: 240,
    stock: 52,
    minStockThreshold: 10,
    rating: 4.8,
    reviewCount: 164,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An invisible, lightweight daily broad-spectrum mineral sunscreen that delivers comprehensive UVA/UVB and blue light protection with zero white cast and no greasy residue.',
    ingredients: 'Zinc Oxide 18%, Titanium Dioxide 4%, Green Tea Leaf Extract, Niacinamide 2%, Hyaluronic Acid, Vitamin E, Silica.',
    howToUse: 'Apply generously and evenly 15 minutes prior to sun exposure as the last step of morning skincare. Reapply every 2-3 hours.',
    benefits: 'Protects against UV photoaging, prevents dark spots, and leaves a fresh, glass-skin dewy finish without clogging pores.',
    suitableFor: 'All skin types, safe for acne-prone and sensitive skin.',
    unitsSold: 310
  },
  {
    id: 'prod-007',
    sku: 'GLW-SE-02',
    name: 'Pure Botanical Soothing Aloe Vera Gel',
    subtitle: '99% Organic Cold-Pressed Aloe with Cucumber & Cica',
    category: 'skin-essentials',
    categoryName: 'Skin Essentials',
    price: 399,
    originalPrice: 499,
    costPrice: 120,
    stock: 64,
    minStockThreshold: 15,
    rating: 4.7,
    reviewCount: 65,
    isBestSeller: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Multipurpose soothing gel prepared from fresh organic Aloe Barbadensis leaf juice to instantly calm sunburns, shaving irritation, razor bumps, and dehydrated skin.',
    ingredients: 'Organic Aloe Barbadensis Leaf Juice 99%, Cucumber Fruit Extract, Centella Asiatica Extract, Allantoin, Carbomer, Tea Tree Extract.',
    howToUse: 'Apply liberally over face, body, or scalp whenever soothing hydration is needed. Can also be used as a sleeping mask or after-sun balm.',
    benefits: 'Instant cooling relief, diminishes post-sun redness, provides weightless non-sticky moisture.',
    suitableFor: 'All skin types, especially irritated, inflamed, or sunburnt skin.',
    unitsSold: 160
  },
  {
    id: 'prod-008',
    sku: 'GLW-FC-06',
    name: 'AHA 10% Gentle Exfoliating Peeling Solution',
    subtitle: 'Lactic Acid 10% + Glycolic Acid & Tasmanian Pepperberry',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 649,
    originalPrice: 849,
    costPrice: 210,
    stock: 30,
    minStockThreshold: 8,
    rating: 4.6,
    reviewCount: 52,
    isBestSeller: false,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A gentle weekly exfoliating serum that lifts dead superficial skin cells, unblocks congested pores, and reveals baby-soft glowing texture.',
    ingredients: 'Aqua, Lactic Acid 8%, Glycolic Acid 2%, Tasmanian Pepperberry Extract, Hyaluronic Acid, Aloe Vera Extract, Sodium Hydroxide.',
    howToUse: 'Use only at night, 1-2 times weekly. Apply a thin layer to clean dry skin. Leave on for 10 minutes, then rinse with warm water.',
    benefits: 'Unclogs congested pores, smoothens bumpy texture, and improves radiance in 1 use.',
    suitableFor: 'Dull, textured, uneven, and acne-prone skin.',
    unitsSold: 125
  },
  {
    id: 'prod-009',
    sku: 'GLW-FC-07',
    name: 'Peptide & Green Tea Rejuvenating Eye Cream',
    subtitle: 'Matrixyl 3000 + Caffeine & Organic Green Tea Extract',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 749,
    originalPrice: 999,
    costPrice: 250,
    stock: 22,
    minStockThreshold: 8,
    rating: 4.8,
    reviewCount: 44,
    isBestSeller: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e9a0c302?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512290900672-1f02e9a0c302?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A targeted, silky eye treatment formulated to depuff morning eye bags, fade stubborn dark under-eye circles, and smooth crow’s feet.',
    ingredients: 'Aqua, Caffeine 3%, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Camellia Sinensis (Green Tea) Extract, Jojoba Oil, Squalane.',
    howToUse: 'Gently dab a rice-grain amount around the orbital bone using your ring finger until absorbed.',
    benefits: 'Reduces puffiness within 15 minutes and visibly brightens dark under-eye shadows.',
    suitableFor: 'Tired eyes, dark circles, fine lines.',
    unitsSold: 110
  },
  {
    id: 'prod-010',
    sku: 'GLW-BC-01',
    name: 'Golden Glow Nourishing Body Oil',
    subtitle: 'Sweet Almond, Jojoba & Vitamin E Shimmering Infusion',
    category: 'body-care',
    categoryName: 'Body Care',
    price: 849,
    originalPrice: 1149,
    costPrice: 290,
    stock: 28,
    minStockThreshold: 10,
    rating: 4.9,
    reviewCount: 68,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A sumptuous dry body oil that envelops the skin in radiant satin softness and a delicate natural warm vanilla-rose fragrance without leaving an oily film.',
    ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina (Rosehip) Seed Oil, Tocopherol, Natural Fragrance.',
    howToUse: 'Massage over damp body skin straight out of the shower for locks-in moisture and a radiant satiny sheen.',
    benefits: 'Deeply nourishes dry limbs, improves skin elasticity, and provides an all-day luminous glow.',
    suitableFor: 'All body skin types, dry or ashy skin.',
    unitsSold: 145
  },
  {
    id: 'prod-011',
    sku: 'GLW-BC-02',
    name: 'Shea & Murumuru Velvet Body Cream',
    subtitle: 'Ultra-Rich Whipped Body Butter with Niacinamide',
    category: 'body-care',
    categoryName: 'Body Care',
    price: 599,
    originalPrice: 799,
    costPrice: 210,
    stock: 35,
    minStockThreshold: 10,
    rating: 4.8,
    reviewCount: 57,
    isBestSeller: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A decadent, whipped body moisturizer loaded with raw Shea Butter, Murumuru Butter, and calming colloidal oatmeal to heal flaky, parched skin.',
    ingredients: 'Butyrospermum Parkii (Shea) Butter, Astrocaryum Murumuru Seed Butter, Colloidal Oatmeal, Niacinamide 3%, Squalane, Glycerin.',
    howToUse: 'Smooth generously over entire body, focusing on dry zones like elbows, knees, and heels.',
    benefits: 'Continuous 48-hour moisture, softens rough patches, and soothes itchy dry skin.',
    suitableFor: 'Extremely dry, flaky, or eczema-prone body skin.',
    unitsSold: 130
  },
  {
    id: 'prod-012',
    sku: 'GLW-HC-01',
    name: 'Rosemary & Biotin Scalp Revitalizing Oil',
    subtitle: 'Stimulating Hair & Scalp Therapy with Peppermint',
    category: 'hair-care',
    categoryName: 'Hair Care',
    price: 699,
    originalPrice: 899,
    costPrice: 230,
    stock: 42,
    minStockThreshold: 12,
    rating: 4.9,
    reviewCount: 93,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An invigorating scalp treatment infused with pure Rosemary Essential Oil, Biotin, and stimulating caffeine to strengthen hair roots and reduce hair fall.',
    ingredients: 'Rosmarinus Officinalis (Rosemary) Leaf Oil, Biotin, Caffeine, Ricinus Communis (Castor) Seed Oil, Mentha Piperita (Peppermint) Oil, Argania Spinosa Kernel Oil.',
    howToUse: 'Part hair into sections and apply 3-5 drops directly to scalp. Massage for 5 minutes. Leave on for at least 2 hours or overnight before washing.',
    benefits: 'Boosts microcirculation to hair follicles, strengthens strands from the root, reduces seasonal shedding.',
    suitableFor: 'Thinning hair, weak roots, and dry or flaky scalp.',
    unitsSold: 210
  },
  {
    id: 'prod-013',
    sku: 'GLW-HC-02',
    name: 'Silk Protein Restorative Hair Mask',
    subtitle: 'Hydrolyzed Silk + Keratin & Moroccan Argan Oil',
    category: 'hair-care',
    categoryName: 'Hair Care',
    price: 799,
    originalPrice: 1049,
    costPrice: 270,
    stock: 4, // Low stock demo alert!
    minStockThreshold: 10,
    rating: 4.7,
    reviewCount: 39,
    isBestSeller: false,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An intensive conditioning hair treatment that repairs heat and chemical damage, smoothens split ends, and leaves tresses with mirror-like shine.',
    ingredients: 'Aqua, Cetearyl Alcohol, Hydrolyzed Silk, Hydrolyzed Keratin, Argania Spinosa (Argan) Oil, Behentrimonium Chloride, Panthenol.',
    howToUse: 'After shampooing, apply generously to mid-lengths and ends. Leave on for 10-15 minutes, then rinse thoroughly.',
    benefits: 'Eliminates frizz, restores hair elasticity, and protects against styling heat.',
    suitableFor: 'Damaged, frizzy, colored, or heat-styled hair.',
    unitsSold: 88
  },
  {
    id: 'prod-014',
    sku: 'GLW-SE-03',
    name: 'Peptide Glaze Hydrating Lip Mask',
    subtitle: 'Volumizing Peptides + Shea Butter & Wild Berry Nectar',
    category: 'skin-essentials',
    categoryName: 'Skin Essentials',
    price: 349,
    originalPrice: 449,
    costPrice: 100,
    stock: 50,
    minStockThreshold: 15,
    rating: 4.9,
    reviewCount: 122,
    isBestSeller: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A glossy, leave-on lip treatment that drenches dry, chapped lips in rich moisture, softening flaky skin and leaving a high-shine plump glaze.',
    ingredients: 'Polyisobutene, Butyrospermum Parkii (Shea) Butter, Palmitoyl Tripeptide-1, Astrocaryum Murumuru Butter, Vitamin E, Berry Flavor Extract.',
    howToUse: 'Apply liberally onto lips throughout the day for high-shine hydration or slather before bedtime as an intensive overnight lip mask.',
    benefits: 'Instant plumping appearance, eliminates chapped dry flakes, high-shine mirror finish without stickiness.',
    suitableFor: 'Dry, chapped, thin lips.',
    unitsSold: 350
  },
  {
    id: 'prod-015',
    sku: 'GLW-FC-08',
    name: 'Midnight Recovery Squalane Facial Oil',
    subtitle: '100% Plant-Derived Squalane + Blue Tansy & Evening Primrose',
    category: 'face-care',
    categoryName: 'Face Care',
    price: 949,
    originalPrice: 1299,
    costPrice: 330,
    stock: 26,
    minStockThreshold: 8,
    rating: 4.8,
    reviewCount: 51,
    isBestSeller: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A soothing nocturnal facial oil infused with botanical Blue Tansy and sugarcane Squalane to calm inflammation, soothe stressed skin, and restore youthful elasticity.',
    ingredients: 'Sugarcane Squalane 95%, Tanacetum Annuum (Blue Tansy) Flower Oil, Oenothera Biennis (Evening Primrose) Oil, Tocopherol.',
    howToUse: 'Warm 2-3 drops between palms and gently press onto clean face and neck before bed as the last step in your routine.',
    benefits: 'Calms redness, balances sebum production, non-comedogenic and fast-absorbing.',
    suitableFor: 'Stressed, redness-prone, acne-prone, and dry skin.',
    unitsSold: 95
  },
  {
    id: 'prod-016',
    sku: 'GLW-BC-03',
    name: 'Exfoliating Coffee & Cocoa Body Polish',
    subtitle: 'Roasted Arabica Coffee + Raw Cocoa & Coconut Butter',
    category: 'body-care',
    categoryName: 'Body Care',
    price: 549,
    originalPrice: 749,
    costPrice: 180,
    stock: 31,
    minStockThreshold: 10,
    rating: 4.7,
    reviewCount: 43,
    isBestSeller: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A rich stimulating body scrub that buffs away dull dry skin, stimulates lymphatic circulation, and softens strawberry legs and rough skin.',
    ingredients: 'Coffea Arabica (Coffee) Seed Powder, Sucrose, Cocos Nucifera (Coconut) Oil, Theobroma Cacao Seed Butter, Vitamin E.',
    howToUse: 'Massage over wet skin in upward circular motions in the shower. Rinse well with warm water.',
    benefits: 'Smooths keratosis pilaris (strawberry skin), energizes circulation, leaves skin ultra-soft.',
    suitableFor: 'Rough, textured, dull body skin.',
    unitsSold: 115
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-101',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    joinedDate: '2026-01-15',
    totalOrders: 4,
    totalSpent: 4896,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    address: {
      street: '42, Lotus Boulevard, Sector 100',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201304'
    }
  },
  {
    id: 'cust-102',
    name: 'Riya Patel',
    email: 'riya.patel@example.com',
    phone: '+91 98123 45678',
    joinedDate: '2026-02-10',
    totalOrders: 3,
    totalSpent: 3597,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    address: {
      street: 'Flat 402, Shanti Heights, Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054'
    }
  },
  {
    id: 'cust-103',
    name: 'Priya Mehta',
    email: 'priya.mehta@example.com',
    phone: '+91 97234 56789',
    joinedDate: '2026-02-28',
    totalOrders: 5,
    totalSpent: 6245,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    address: {
      street: '15, Marine Lines, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    }
  },
  {
    id: 'cust-104',
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    phone: '+91 99876 54321',
    joinedDate: '2026-03-05',
    totalOrders: 2,
    totalSpent: 2198,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    address: {
      street: 'B-12, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016'
    }
  },
  {
    id: 'cust-105',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@example.com',
    phone: '+91 98450 12345',
    joinedDate: '2026-03-20',
    totalOrders: 3,
    totalSpent: 3847,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
    address: {
      street: '7th Cross, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    }
  },
  {
    id: 'cust-106',
    name: 'Sneha Nair',
    email: 'sneha.nair@example.com',
    phone: '+91 97451 98765',
    joinedDate: '2026-04-12',
    totalOrders: 2,
    totalSpent: 2448,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    address: {
      street: 'Harbour View Road, Panampilly Nagar',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682036'
    }
  },
  {
    id: 'cust-107',
    name: 'Aditya Joshi',
    email: 'aditya.joshi@example.com',
    phone: '+91 98220 54321',
    joinedDate: '2026-05-02',
    totalOrders: 1,
    totalSpent: 1248,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    address: {
      street: 'Senapati Bapat Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411016'
    }
  },
  {
    id: 'cust-108',
    name: 'Tanvi Kapoor',
    email: 'tanvi.kapoor@example.com',
    phone: '+91 98111 22334',
    joinedDate: '2026-05-18',
    totalOrders: 4,
    totalSpent: 5196,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    address: {
      street: 'Golf Course Road, DLF Phase 5',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    }
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'GLW-2601',
    orderNumber: 'GLW-2601',
    customerId: 'cust-101',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-01-18T10:30:00Z',
    items: [
      { id: 'prod-001', name: 'Glowspace Hydrating Face Serum', price: 899, costPrice: 340, quantity: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-003', name: 'Gentle Hydrating Ceramide Cleanser', price: 549, costPrice: 190, quantity: 1, image: 'https://images.unsplash.com/photo-1556228722-d0b5be04912d?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1448,
    discount: 0,
    shipping: 0,
    tax: 72,
    totalAmount: 1520,
    totalCost: 530,
    profit: 990,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: '42, Lotus Boulevard, Sector 100',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201304'
    },
    trackingNumber: 'TRK-891024'
  },
  {
    id: 'GLW-2602',
    orderNumber: 'GLW-2602',
    customerId: 'cust-102',
    customerName: 'Riya Patel',
    customerEmail: 'riya.patel@example.com',
    customerPhone: '+91 98123 45678',
    date: '2026-02-14T14:15:00Z',
    items: [
      { id: 'prod-002', name: 'Vitamin C 15% Brightening Serum', price: 999, costPrice: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-006', name: 'Mineral Dew Sunscreen SPF 50+', price: 699, costPrice: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1698,
    discount: 100,
    shipping: 0,
    tax: 80,
    totalAmount: 1678,
    totalCost: 620,
    profit: 1058,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'Flat 402, Shanti Heights, Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054'
    },
    trackingNumber: 'TRK-891025'
  },
  {
    id: 'GLW-2603',
    orderNumber: 'GLW-2603',
    customerId: 'cust-103',
    customerName: 'Priya Mehta',
    customerEmail: 'priya.mehta@example.com',
    customerPhone: '+91 97234 56789',
    date: '2026-03-02T11:45:00Z',
    items: [
      { id: 'prod-001', name: 'Glowspace Hydrating Face Serum', price: 899, costPrice: 340, quantity: 2, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-014', name: 'Peptide Glaze Hydrating Lip Mask', price: 349, costPrice: 100, quantity: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 2147,
    discount: 200,
    shipping: 0,
    tax: 97,
    totalAmount: 2044,
    totalCost: 780,
    profit: 1264,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: '15, Marine Lines, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    trackingNumber: 'TRK-891026'
  },
  {
    id: 'GLW-2604',
    orderNumber: 'GLW-2604',
    customerId: 'cust-104',
    customerName: 'Rohan Verma',
    customerEmail: 'rohan.verma@example.com',
    customerPhone: '+91 99876 54321',
    date: '2026-03-18T16:20:00Z',
    items: [
      { id: 'prod-005', name: 'Deep Moisture Ceramide Cream', price: 799, costPrice: 280, quantity: 1, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-003', name: 'Gentle Hydrating Cleanser', price: 549, costPrice: 190, quantity: 1, image: 'https://images.unsplash.com/photo-1556228722-d0b5be04912d?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1348,
    discount: 0,
    shipping: 50,
    tax: 67,
    totalAmount: 1465,
    totalCost: 470,
    profit: 995,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'B-12, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016'
    },
    trackingNumber: 'TRK-891027'
  },
  {
    id: 'GLW-2605',
    orderNumber: 'GLW-2605',
    customerId: 'cust-105',
    customerName: 'Kavya Reddy',
    customerEmail: 'kavya.reddy@example.com',
    customerPhone: '+91 98450 12345',
    date: '2026-04-05T09:10:00Z',
    items: [
      { id: 'prod-012', name: 'Rosemary & Biotin Scalp Oil', price: 699, costPrice: 230, quantity: 1, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-010', name: 'Golden Glow Body Oil', price: 849, costPrice: 290, quantity: 1, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1548,
    discount: 150,
    shipping: 0,
    tax: 70,
    totalAmount: 1468,
    totalCost: 520,
    profit: 948,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: '7th Cross, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    trackingNumber: 'TRK-891028'
  },
  {
    id: 'GLW-2606',
    orderNumber: 'GLW-2606',
    customerId: 'cust-106',
    customerName: 'Sneha Nair',
    customerEmail: 'sneha.nair@example.com',
    customerPhone: '+91 97451 98765',
    date: '2026-04-22T13:40:00Z',
    items: [
      { id: 'prod-006', name: 'Mineral Dew Sunscreen SPF 50+', price: 699, costPrice: 240, quantity: 2, image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1398,
    discount: 0,
    shipping: 0,
    tax: 70,
    totalAmount: 1468,
    totalCost: 480,
    profit: 988,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'Harbour View Road, Panampilly Nagar',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682036'
    },
    trackingNumber: 'TRK-891029'
  },
  {
    id: 'GLW-2607',
    orderNumber: 'GLW-2607',
    customerId: 'cust-108',
    customerName: 'Tanvi Kapoor',
    customerEmail: 'tanvi.kapoor@example.com',
    customerPhone: '+91 98111 22334',
    date: '2026-05-19T18:00:00Z',
    items: [
      { id: 'prod-001', name: 'Glowspace Hydrating Face Serum', price: 899, costPrice: 340, quantity: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-002', name: 'Vitamin C 15% Brightening Serum', price: 999, costPrice: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-014', name: 'Peptide Glaze Hydrating Lip Mask', price: 349, costPrice: 100, quantity: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 2247,
    discount: 225,
    shipping: 0,
    tax: 101,
    totalAmount: 2123,
    totalCost: 820,
    profit: 1303,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'Golf Course Road, DLF Phase 5',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    },
    trackingNumber: 'TRK-891030'
  },
  {
    id: 'GLW-2608',
    orderNumber: 'GLW-2608',
    customerId: 'cust-101',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-06-08T12:00:00Z',
    items: [
      { id: 'prod-015', name: 'Midnight Recovery Squalane Oil', price: 949, costPrice: 330, quantity: 1, image: 'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-005', name: 'Deep Moisture Ceramide Cream', price: 799, costPrice: 280, quantity: 1, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1748,
    discount: 100,
    shipping: 0,
    tax: 82,
    totalAmount: 1730,
    totalCost: 610,
    profit: 1120,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: '42, Lotus Boulevard, Sector 100',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201304'
    },
    trackingNumber: 'TRK-891031'
  },
  {
    id: 'GLW-2609',
    orderNumber: 'GLW-2609',
    customerId: 'cust-103',
    customerName: 'Priya Mehta',
    customerEmail: 'priya.mehta@example.com',
    customerPhone: '+91 97234 56789',
    date: '2026-07-11T15:30:00Z',
    items: [
      { id: 'prod-010', name: 'Golden Glow Body Oil', price: 849, costPrice: 290, quantity: 1, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-011', name: 'Shea & Murumuru Velvet Cream', price: 599, costPrice: 210, quantity: 1, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-016', name: 'Exfoliating Coffee Body Polish', price: 549, costPrice: 180, quantity: 1, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1997,
    discount: 200,
    shipping: 0,
    tax: 90,
    totalAmount: 1887,
    totalCost: 680,
    profit: 1207,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: '15, Marine Lines, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    trackingNumber: 'TRK-891032'
  },
  {
    id: 'GLW-2610',
    orderNumber: 'GLW-2610',
    customerId: 'cust-102',
    customerName: 'Riya Patel',
    customerEmail: 'riya.patel@example.com',
    customerPhone: '+91 98123 45678',
    date: '2026-08-04T10:05:00Z',
    items: [
      { id: 'prod-001', name: 'Glowspace Hydrating Face Serum', price: 899, costPrice: 340, quantity: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-004', name: 'Rose Water Balancing Toner', price: 499, costPrice: 160, quantity: 1, image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1398,
    discount: 0,
    shipping: 0,
    tax: 70,
    totalAmount: 1468,
    totalCost: 500,
    profit: 968,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'Flat 402, Shanti Heights, Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054'
    },
    trackingNumber: 'TRK-891033'
  },
  {
    id: 'GLW-2611',
    orderNumber: 'GLW-2611',
    customerId: 'cust-107',
    customerName: 'Aditya Joshi',
    customerEmail: 'aditya.joshi@example.com',
    customerPhone: '+91 98220 54321',
    date: '2026-08-20T17:45:00Z',
    items: [
      { id: 'prod-003', name: 'Gentle Hydrating Ceramide Cleanser', price: 549, costPrice: 190, quantity: 1, image: 'https://images.unsplash.com/photo-1556228722-d0b5be04912d?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-006', name: 'Mineral Dew Sunscreen SPF 50+', price: 699, costPrice: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1248,
    discount: 0,
    shipping: 0,
    tax: 62,
    totalAmount: 1310,
    totalCost: 430,
    profit: 880,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'Senapati Bapat Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411016'
    },
    trackingNumber: 'TRK-891034'
  },
  {
    id: 'GLW-2612',
    orderNumber: 'GLW-2612',
    customerId: 'cust-105',
    customerName: 'Kavya Reddy',
    customerEmail: 'kavya.reddy@example.com',
    customerPhone: '+91 98450 12345',
    date: '2026-09-02T11:20:00Z',
    items: [
      { id: 'prod-002', name: 'Vitamin C 15% Brightening Serum', price: 999, costPrice: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-009', name: 'Peptide & Green Tea Eye Cream', price: 749, costPrice: 250, quantity: 1, image: 'https://images.unsplash.com/photo-1512290900672-1f02e9a0c302?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1748,
    discount: 100,
    shipping: 0,
    tax: 82,
    totalAmount: 1730,
    totalCost: 630,
    profit: 1100,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    shippingAddress: {
      street: '7th Cross, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    trackingNumber: 'TRK-891035'
  },
  {
    id: 'GLW-2613',
    orderNumber: 'GLW-2613',
    customerId: 'cust-108',
    customerName: 'Tanvi Kapoor',
    customerEmail: 'tanvi.kapoor@example.com',
    customerPhone: '+91 98111 22334',
    date: '2026-09-15T09:40:00Z',
    items: [
      { id: 'prod-001', name: 'Glowspace Hydrating Face Serum', price: 899, costPrice: 340, quantity: 2, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-006', name: 'Mineral Dew Sunscreen SPF 50+', price: 699, costPrice: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 2497,
    discount: 250,
    shipping: 0,
    tax: 112,
    totalAmount: 2359,
    totalCost: 920,
    profit: 1439,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    shippingAddress: {
      street: 'Golf Course Road, DLF Phase 5',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    },
    trackingNumber: 'TRK-891036'
  },
  {
    id: 'GLW-2614',
    orderNumber: 'GLW-2614',
    customerId: 'cust-101',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-09-24T14:10:00Z',
    items: [
      { id: 'prod-008', name: 'AHA 10% Peeling Solution', price: 649, costPrice: 210, quantity: 1, image: 'https://images.unsplash.com/photo-1608248597358-1e44f128c947?q=80&w=800&auto=format&fit=crop' },
      { id: 'prod-007', name: 'Pure Aloe Vera Gel', price: 399, costPrice: 120, quantity: 1, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 1048,
    discount: 0,
    shipping: 0,
    tax: 52,
    totalAmount: 1100,
    totalCost: 330,
    profit: 770,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    shippingAddress: {
      street: '42, Lotus Boulevard, Sector 100',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201304'
    },
    trackingNumber: 'TRK-891037'
  },
  {
    id: 'GLW-2615',
    orderNumber: 'GLW-2615',
    customerId: 'cust-104',
    customerName: 'Rohan Verma',
    customerEmail: 'rohan.verma@example.com',
    customerPhone: '+91 99876 54321',
    date: '2026-09-27T18:30:00Z',
    items: [
      { id: 'prod-002', name: 'Vitamin C 15% Brightening Serum', price: 999, costPrice: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop' }
    ],
    subtotal: 999,
    discount: 0,
    shipping: 50,
    tax: 50,
    totalAmount: 1099,
    totalCost: 380,
    profit: 719,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    shippingAddress: {
      street: 'B-12, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016'
    },
    trackingNumber: 'TRK-891038'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    productId: 'prod-001',
    author: 'Sunaina K.',
    rating: 5,
    date: '2026-08-12',
    verified: true,
    title: 'Holy grail hydrating serum!',
    comment: 'I have tried numerous hyaluronic acid serums, but this one completely transformed my dry patches within one week! It sinks right in without any stickiness and leaves my skin plump and glowing all day long.'
  },
  {
    id: 'rev-02',
    productId: 'prod-001',
    author: 'Meera Deshmukh',
    rating: 5,
    date: '2026-08-25',
    verified: true,
    title: 'Glass skin in a bottle',
    comment: 'The formulation is so pure and gentle. Doesn’t trigger my sensitive acne-prone skin at all. 10/10 recommendation!'
  },
  {
    id: 'rev-03',
    productId: 'prod-002',
    author: 'Aakriti Sen',
    rating: 5,
    date: '2026-09-02',
    verified: true,
    title: 'Faded my stubborn dark spots',
    comment: 'My post-acne marks faded noticeably in 3 weeks. Ferulic acid makes it super stable and it smells naturally crisp and fresh.'
  },
  {
    id: 'rev-04',
    productId: 'prod-006',
    author: 'Divya Iyer',
    rating: 5,
    date: '2026-09-14',
    verified: true,
    title: 'Zero white cast, wonderful under makeup!',
    comment: 'Finally a mineral SPF 50 that does not leave a ghostly white layer or feel heavy in Indian weather. It blends like a dream.'
  }
];

export const INITIAL_SETTINGS = {
  storeName: 'Glowspace Skincare',
  tagline: 'Simple Skincare. Healthier Looking Skin.',
  currency: '₹',
  taxRate: 5, // 5% GST
  shippingFee: 50,
  freeShippingThreshold: 999,
  lowStockThreshold: 10,
  contactEmail: 'support@glowspace.in',
  contactPhone: '+91 800-GLOW-CARE (1800 4569 2273)',
  address: 'Level 4, Glowspace Pavilion, Indiranagar, Bengaluru, KA 560038',
  supportHours: 'Mon - Sat: 9:00 AM – 8:00 PM IST',
  coupons: [
    { code: 'GLOW10', discountPercent: 10, minSpend: 499, description: '10% OFF on all orders above ₹499' },
    { code: 'WELCOME20', discountPercent: 20, minSpend: 999, description: '20% OFF for new skincare lovers' },
    { code: 'FREESHIP', freeShipping: true, minSpend: 500, description: 'Free Express Shipping' }
  ]
};
