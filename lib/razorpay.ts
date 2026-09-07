// Razorpay browser checkout hook — built on the `react-razorpay` package.
// npm i react-razorpay
//
// Usage:
//   const { openCheckout, isLoading, error } = useRazorpayCheckout();
//   const payload = await openCheckout({ key, amount, currency, name, order_id });

import { useCallback } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

export interface RazorpaySuccessPayload {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;          // in paise
  currency: string;
  name: string;
  description?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
}

export function useRazorpayCheckout() {
  const { error, isLoading, Razorpay } = useRazorpay();

  const openCheckout = useCallback(
    async (options: RazorpayCheckoutOptions): Promise<RazorpaySuccessPayload> => {
      let RazorpayConstructor = Razorpay || (typeof window !== "undefined" ? (window as any).Razorpay : undefined);

      if (!RazorpayConstructor && typeof window !== "undefined") {
        await new Promise<void>((resolve) => {
          if ((window as any).Razorpay) {
            RazorpayConstructor = (window as any).Razorpay;
            return resolve();
          }
          const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
          if (existingScript) {
            existingScript.addEventListener("load", () => {
              RazorpayConstructor = (window as any).Razorpay;
              resolve();
            });
            existingScript.addEventListener("error", () => resolve());
            return;
          }
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => {
            RazorpayConstructor = (window as any).Razorpay;
            resolve();
          };
          script.onerror = () => resolve();
          document.body.appendChild(script);
        });
      }

      if (!RazorpayConstructor) {
        throw new Error("Razorpay SDK is currently unavailable. Please check your connection and try again.");
      }

      return new Promise((resolve, reject) => {
        const cleanOptions: any = {
          ...options,
          handler: (response: RazorpaySuccessPayload) => {
            resolve(response);
          },
          modal: {
            ondismiss: () => {
              reject(new Error("Payment cancelled by user"));
            },
          },
        };

        // Remove order_id if not present or empty to avoid Razorpay SDK invalid order parameter error
        if (!cleanOptions.order_id || cleanOptions.order_id.trim() === "") {
          delete cleanOptions.order_id;
        }

        const rzp = new RazorpayConstructor(cleanOptions as RazorpayOrderOptions);

        rzp.on("payment.failed", (response: any) => {
          const errMsg = response?.error?.description || response?.error?.reason || "Payment failed";
          reject(new Error(errMsg));
        });

        rzp.open();
      });
    },
    [Razorpay]
  );

  return { openCheckout, isLoading, error };
}
