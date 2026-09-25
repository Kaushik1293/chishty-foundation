export interface DonationRecord {
  id?: string | number;
  category: string;
  amount: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  payment_method: string;
  payment_id?: string | null;
  razorpay_order_id?: string | null;
  razorpay_signature?: string | null;
  status: "completed" | "pending" | "failed" | "refunded";
  notes?: string | null;
  created_at?: string;
}

export const defaultDonations: DonationRecord[] = [];
