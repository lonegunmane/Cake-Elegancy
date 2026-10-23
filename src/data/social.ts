/**
 * Cake Elegancy - Centralized Brand, Contact & Social Media Information
 * Hellen's cakery paradise (Lusaka, Zambia - Order-Only Bakery)
 */

export const BRAND_INFO = {
  name: 'Cake Elegancy',
  tagline: "Hellen's cakery paradise",
  founder: 'Hellen',
  location: 'Lusaka, Zambia',
  businessType: 'Order-Only Bakery (No Walk-in Storefront)',
  discountPercent: 20,
  currency: 'ZMW',
  currencySymbol: 'K',
};

export const CONTACT_INFO = {
  whatsapp: {
    number: '+260 971 603 384',
    rawPhone: '260971603384',
    url: 'https://wa.me/260971603384',
    label: '+260 971 603 384',
    type: 'Calls + WhatsApp',
    inquiryMessage: "Hello Hellen, I'm reaching out from the Cake Elegancy website to make an inquiry!",
  },
  callsOnly: {
    number: '+260 957 784 048',
    rawPhone: '+260957784048',
    url: 'tel:+260957784048',
    label: '+260 957 784 048',
    type: 'Calls only',
  },
};

export interface SocialLink {
  id: 'instagram' | 'whatsapp' | 'facebook' | 'tiktok';
  name: string;
  accountName?: string;
  handle?: string;
  url: string;
  isPlaceholder?: boolean;
  colorClass: string;
  badgeText?: string;
}

export const SOCIAL_LINKS: Record<'instagram' | 'whatsapp' | 'facebook' | 'tiktok', SocialLink> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    accountName: 'CAKE ELEGANCE',
    handle: '@cake_elegancee',
    url: 'https://www.instagram.com/cake_elegancee/',
    isPlaceholder: false,
    colorClass: 'from-purple-600 via-pink-600 to-amber-500',
    badgeText: '@cake_elegancee',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    accountName: 'Cake Elegancy (Hellen)',
    handle: '+260 971 603 384',
    url: 'https://wa.me/260971603384',
    isPlaceholder: false,
    colorClass: 'bg-emerald-600',
    badgeText: 'Chat on WhatsApp',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    accountName: 'Cake Elegancy',
    handle: '#',
    url: '#',
    isPlaceholder: true,
    colorClass: 'bg-blue-600',
    badgeText: 'Coming Soon',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    accountName: 'Cake Elegancy',
    handle: '#',
    url: '#',
    isPlaceholder: true,
    colorClass: 'bg-neutral-900',
    badgeText: 'Coming Soon',
  },
};

export const DELIVERY_PARTNERS = {
  local: {
    name: 'Yango Deli',
    scope: 'Local Lusaka Deliveries',
    ratesNote: 'Standard Yango Deli charges apply upon dispatch',
  },
  countrywide: {
    name: 'Platinum Carrier Services',
    scope: 'Country-wide Zambian Deliveries',
    ratesNote: 'Standard carrier charges apply based on destination town',
  },
};
