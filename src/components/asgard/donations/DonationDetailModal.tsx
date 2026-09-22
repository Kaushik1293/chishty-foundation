"use client";

import React, { useState } from "react";
import {
  Printer,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  IndianRupee,
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface DonationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationRecord | null;
}

export default function DonationDetailModal({
  isOpen,
  onClose,
  donation,
}: DonationDetailModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!donation) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formattedAmount = Number(donation.amount || 0).toLocaleString("en-IN");
  const formattedDate = donation.created_at
    ? formatDateDDMMYYYY(donation.created_at)
    : "—";

  const handlePrintReceipt = () => {
    const printWindow = window.open("", "_blank", "width=750,height=850");
    if (!printWindow) {
      window.print();
      return;
    }

    const receiptNo = donation.payment_id || `CF-${donation.id || Date.now()}`;
    const printDate = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Donation Receipt - Chishty Foundation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E3A2B; background: #fff; padding: 40px; }
    .receipt-box { border: 2px solid #D4A843; border-radius: 12px; padding: 32px; max-width: 650px; margin: 0 auto; background: #FCFBF7; }
    .header { text-align: center; border-bottom: 2px solid #E6DEC8; padding-bottom: 20px; margin-bottom: 24px; }
    .logo-text { font-size: 26px; font-weight: 800; color: #1E3A2B; text-transform: uppercase; letter-spacing: 2px; }
    .subtitle { font-size: 13px; color: #976E1A; font-weight: 600; letter-spacing: 1px; margin-top: 4px; }
    .reg-info { font-size: 11px; color: #555; margin-top: 6px; }
    .badge { display: inline-block; background: #1E3A2B; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 8px; }
    .receipt-title { font-size: 18px; font-weight: bold; color: #1E3A2B; text-align: center; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table td { padding: 8px 12px; font-size: 13px; vertical-align: top; }
    .info-table tr:nth-child(even) { background: #F5EFE0; }
    .info-table td.label { font-weight: bold; color: #1E3A2B; width: 40%; }
    .amount-highlight { background: #1E3A2B; color: #D4A843; font-size: 20px; font-weight: 900; text-align: center; padding: 14px; border-radius: 8px; margin: 16px 0; }
    .footer { border-top: 1px dashed #D4A843; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #666; text-align: center; line-height: 1.6; }
    .stamp { text-align: right; margin-top: 20px; font-size: 12px; color: #1E3A2B; }
    .stamp-line { border-top: 1px solid #1E3A2B; display: inline-block; width: 160px; text-align: center; padding-top: 4px; margin-top: 40px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="receipt-box">
    <div class="header">
      <div class="logo-text">CHISHTY FOUNDATION</div>
      <div class="subtitle">Official Donation Receipt</div>
      <div class="reg-info">Ajmer Sharif, Rajasthan, India | contact@chishtyfoundation.org</div>
      <div class="badge">80G TAX EXEMPTION ELIGIBLE</div>
    </div>

    <div class="receipt-title">RECEIPT VOUCHER</div>

    <table class="info-table">
      <tr><td class="label">Receipt / Txn No:</td><td><strong>${receiptNo}</strong></td></tr>
      <tr><td class="label">Date:</td><td>${formattedDate} (Printed: ${printDate})</td></tr>
      <tr><td class="label">Donor Name:</td><td><strong>${donation.full_name || "Anonymous Donor"}</strong></td></tr>
      <tr><td class="label">Email Address:</td><td>${donation.email || "—"}</td></tr>
      <tr><td class="label">Phone Number:</td><td>${donation.phone || "—"}</td></tr>
      <tr><td class="label">Address / Location:</td><td>${[donation.address, donation.city, donation.country].filter(Boolean).join(", ") || "—"}</td></tr>
      <tr><td class="label">Purpose / Cause:</td><td><strong>${donation.category}</strong></td></tr>
      <tr><td class="label">Payment Mode:</td><td>${donation.payment_method}</td></tr>
      <tr><td class="label">Status:</td><td><strong>${donation.status?.toUpperCase() || "COMPLETED"}</strong></td></tr>
    </table>

    <div class="amount-highlight">
      CONTRIBUTION: ₹${formattedAmount} INR
    </div>

    <div class="stamp">
      <div class="stamp-line">Authorized Signatory<br /><small>Chishty Foundation</small></div>
    </div>

    <div class="footer">
      <p>Thank you for your generous contribution. Your support enables us to continue our social and spiritual missions globally.</p>
      <p>This is a computer generated receipt from the Chishty Foundation Asgard Administration Portal.</p>
    </div>
  </div>
  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`);
    printWindow.document.close();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Donation Details"
      subtitle={`Transaction Record: ${donation.payment_id || `ID #${donation.id}`}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 font-satoshi text-dark-green">
        {/* Top Summary Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-dark-green to-[#134237] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-dark-yellow/30">
          <div>
            <span className="text-xs uppercase tracking-wider text-light-yellow font-semibold">
              {donation.category}
            </span>
            <div className="text-3xl font-bold font-satoshi text-white mt-0.5 flex items-baseline gap-1">
              <span className="text-2xl text-dark-yellow">₹</span>
              {formattedAmount}
            </div>
            <p className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-dark-yellow" />
              <span>{formattedDate}</span>
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <span className="text-xs px-3 py-1 rounded-full font-semibold uppercase bg-dark-yellow/20 border border-dark-yellow/40 text-light-yellow">
              {donation.status || "Completed"}
            </span>
            <button
              onClick={handlePrintReceipt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-dark-yellow" />
              <span>Print Official Receipt</span>
            </button>
          </div>
        </div>

        {/* Donor Information */}
        <div className="p-4 rounded-2xl bg-white border border-stroke space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-dark-green/60 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-dark-yellow" />
            Donor Contact Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-dark-green/60 block text-[11px]">Full Name</span>
              <span className="font-bold text-dark-green text-sm">
                {donation.full_name || "Anonymous Donor"}
              </span>
            </div>

            <div>
              <span className="text-dark-green/60 block text-[11px]">Email Address</span>
              <span className="font-semibold text-dark-green flex items-center gap-1 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-dark-green/40 shrink-0" />
                {donation.email || "—"}
              </span>
            </div>

            <div>
              <span className="text-dark-green/60 block text-[11px]">Phone Number</span>
              <span className="font-semibold text-dark-green flex items-center gap-1 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-dark-green/40 shrink-0" />
                {donation.phone || "—"}
              </span>
            </div>

            <div>
              <span className="text-dark-green/60 block text-[11px]">Location</span>
              <span className="font-semibold text-dark-green flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-dark-green/40 shrink-0" />
                {[donation.city, donation.country].filter(Boolean).join(", ") || "—"}
              </span>
            </div>

            {donation.address && (
              <div className="sm:col-span-2">
                <span className="text-dark-green/60 block text-[11px]">Address</span>
                <span className="font-medium text-dark-green mt-0.5 block">
                  {donation.address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Transaction & Payment Technical Details */}
        <div className="p-4 rounded-2xl bg-white border border-stroke space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-dark-green/60 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-dark-yellow" />
            Payment Gateway & Transaction Details
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-beige/50 border border-stroke">
              <span className="text-dark-green/70">Payment Method</span>
              <span className="font-semibold text-dark-green">{donation.payment_method}</span>
            </div>

            {donation.payment_id && (
              <div className="flex items-center justify-between p-2 rounded-xl bg-beige/50 border border-stroke">
                <span className="text-dark-green/70">Payment ID</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-medium text-dark-green text-[11px]">
                    {donation.payment_id}
                  </span>
                  <button
                    onClick={() => handleCopy(donation.payment_id!, "pid")}
                    className="p-1 text-dark-green/50 hover:text-dark-yellow transition-colors cursor-pointer"
                    title="Copy Payment ID"
                  >
                    {copiedKey === "pid" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {donation.razorpay_order_id && (
              <div className="flex items-center justify-between p-2 rounded-xl bg-beige/50 border border-stroke">
                <span className="text-dark-green/70">Razorpay Order ID</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-medium text-dark-green text-[11px]">
                    {donation.razorpay_order_id}
                  </span>
                  <button
                    onClick={() => handleCopy(donation.razorpay_order_id!, "oid")}
                    className="p-1 text-dark-green/50 hover:text-dark-yellow transition-colors cursor-pointer"
                    title="Copy Order ID"
                  >
                    {copiedKey === "oid" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {donation.notes && (
              <div className="p-3 rounded-xl bg-beige/70 border border-stroke">
                <span className="text-[11px] font-bold text-dark-green/70 block mb-1">
                  Admin / Donor Notes:
                </span>
                <p className="text-dark-green text-xs italic">{donation.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-dark-green/10 hover:bg-dark-green/15 text-dark-green font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrintReceipt}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-semibold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
