/**
 * Organization Single Source of Truth
 * Chishty Foundation — Official Contact, Compliance, and Banking Configuration
 */

export interface OrganizationContact {
  legalName: string;
  displayName: string;
  tagline: string;
  foundedYear: number;
  founder: string;
  founderTitle: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    full: string;
    mapsUrl: string;
  };
  phones: {
    display: string;
    landline1: string;
    landline2: string;
    whatsapp: string;
    whatsappUrl: string;
  };
  emails: {
    chairman: string;
    services: string;
  };
  website: {
    domain: string;
    url: string;
  };
  socialLinks: {
    label: string;
    href: string;
  }[];
  compliance: {
    nitiAayog: {
      id: string;
      verified: boolean;
      label: string;
    };
    section12A: {
      status: string;
      number?: string;
      verified: boolean;
    };
    section80G: {
      status: string;
      number?: string;
      verified: boolean;
    };
    csr1: {
      status: string;
      number?: string;
      verified: boolean;
    };
  };
  bankAccounts: {
    primary: {
      bankName: string;
      accountName: string;
      accountNumber: string;
      ifsc: string;
      branch: string;
      isPrimary: boolean;
    };
    secondary: {
      bankName: string;
      accountName: string;
      accountNumber: string;
      ifsc: string;
      branch: string;
      // Note: Branch name "Kutchury Road" is preserved as listed; requires manual verification against official bank document to confirm whether it is "Kutchary Road" or "Kutchury Road".
      branchVerificationRequired: boolean;
      isPrimary: boolean;
    };
  };
}

export const ORGANIZATION_CONFIG: OrganizationContact = {
  legalName: "Chishty Foundation",
  displayName: "Chishty Foundation",
  tagline: "Serving Humanity Since 2007",
  foundedYear: 2007,
  founder: "Haji Syed Salman Chishty",
  founderTitle: "Gaddi Nashin (Hereditary Key Holder), Dargah Ajmer Sharif",
  address: {
    line1: "Chishty Manzil Sufi Khanqah, Jhalra Street",
    line2: "Dargah Sharif",
    city: "Ajmer Sharif",
    state: "Rajasthan",
    pincode: "305001",
    country: "India",
    full: "Chishty Manzil Sufi Khanqah, Jhalra Street, Dargah Sharif, Ajmer Sharif — 305001, Rajasthan, India",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chishty+Manzil+Sufi+Khanqah+Jhalra+Street+Dargah+Sharif+Ajmer+Sharif",
  },
  phones: {
    display: "+91 145 2429473 · +91 145 2944973",
    landline1: "+91 145 2429473",
    landline2: "+91 145 2944973",
    whatsapp: "+91 98291 74973",
    whatsappUrl: "https://wa.me/919829174973",
  },
  emails: {
    chairman: "chairman@chishtyfoundation.org",
    services: "services@chishtyfoundation.org",
  },
  website: {
    domain: "chishtyfoundation.org",
    url: "https://chishtyfoundation.org",
  },
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/chishtyfoundation/" },
    { label: "Instagram", href: "https://www.instagram.com/chishtyfoundation/" },
    { label: "YouTube", href: "https://www.youtube.com/@SufiMusafir" },
    { label: "WhatsApp", href: "https://wa.me/919829174973" },
    { label: "X", href: "https://x.com/sufimusafir" },
  ],
  compliance: {
    nitiAayog: {
      id: "RJ/2017/0178972",
      verified: true,
      label: "NITI Aayog (NGO Darpan)",
    },
    section12A: {
      status: "Registration details under verification",
      verified: false,
    },
    section80G: {
      status: "50% Tax Exemption (Registration certificate under verification)",
      verified: false,
    },
    csr1: {
      status: "Eligible for CSR Grants (Registration number under verification)",
      verified: false,
    },
  },
  bankAccounts: {
    primary: {
      bankName: "Bank of India (BOI) — Ajmer Branch",
      accountName: "CHISHTY FOUNDATION",
      accountNumber: "666010110001053",
      ifsc: "BKID0006660",
      branch: "Near St. Francis Hospital, Martindal Bridge, Ajmer, Rajasthan – 305001",
      isPrimary: true,
    },
    secondary: {
      bankName: "ICICI Bank Ltd. — Ajmer",
      accountName: "CHISHTY FOUNDATION",
      accountNumber: "018501008699",
      ifsc: "ICIC0000185",
      branch: "Kutchury Road, Ajmer, Rajasthan",
      branchVerificationRequired: true,
      isPrimary: false,
    },
  },
};
