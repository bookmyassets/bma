"use client";

import { useEffect, useMemo, useState } from "react";

const PROJECTS = [
  {
    id: "residency",
    name: "WestWyn Residency",
    subtitle: "Premium living in the heart of growth",
    tag: "Residential Plots",
  },
  {
    id: "estates",
    name: "WestWyn Estates",
    subtitle: "Expansive plots. Brighter possibilities.",
    tag: "Investment Plots",
  },
];

const BOOKING_AMOUNT = 50000;

const BANK_DETAILS = {
  residency: {
    beneficiaryName: "BookMyAssets Projects",
    bankName: "ICICI Bank",
    accountNumber: "532905000086",
    ifscCode: "ICIC0005329",
    accountType: "Current Account",
    branch: "JMD Galleria, Sector 48, Gurugram",
    upiId: "msbookmyassetsprojects.eazypay@icici",
  },

  estates: {
    beneficiaryName: "Westwyn Partners LLP",
    bankName: "IDFC FIRST Bank",
    accountNumber: "10287620896",
    ifscCode: "IDFB0020129",
    accountType: "Current Account",
    branch: "SOHNA ROAD BRANCH",
    upiId: "westwynpartnersllp1@idfcbank",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PaymentClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectId: "residency",
    plotNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState(null);
  const [activeMethod, setActiveMethod] = useState("upi");
  const [copiedField, setCopiedField] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("idle");

  const [paymentStatusError, setPaymentStatusError] = useState("");

  const [completedPayment, setCompletedPayment] = useState(null);

  const selectedProject = useMemo(
    () =>
      PROJECTS.find((project) => project.id === form.projectId) || PROJECTS[0],
    [form.projectId],
  );

  const selectedBankDetails =
    BANK_DETAILS[form.projectId] || BANK_DETAILS.residency;

  useEffect(() => {
    if (!payment?.qr?.id ) {
      return;
    }

    if (paymentStatus === "paid" || paymentStatus === "expired") {
      return;
    }

    let cancelled = false;
    let intervalId;

    const qrId = payment.qr.id;
    const closeBy = payment.qr.closeBy;

    async function checkPaymentStatus() {
      try {
        /**
         * Stop polling if the Razorpay QR has expired.
         */
        if (closeBy && Math.floor(Date.now() / 1000) >= closeBy) {
          if (!cancelled) {
            setPaymentStatus("expired");
          }

          return;
        }

        const response = await fetch(
          `/api/payments/status/${encodeURIComponent(qrId)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          /**
           * Don't destroy the payment screen because of
           * one temporary polling failure.
           */
          console.error("Payment status check failed:", data);

          setPaymentStatusError("Unable to refresh payment status right now.");

          return;
        }

        setPaymentStatusError("");

        if (data.status === "paid") {
          setPaymentStatus("paid");
          setCompletedPayment(data);

          return;
        }

        if (data.status === "processing") {
          setPaymentStatus("processing");

          return;
        }

        setPaymentStatus("pending");
      } catch (statusError) {
        if (cancelled) {
          return;
        }

        console.error("Payment status request failed:", statusError);

        setPaymentStatusError("Unable to refresh payment status right now.");
      }
    }

    /**
     * Check immediately instead of waiting 3 seconds
     * for the first request.
     */
    checkPaymentStatus();

    intervalId = window.setInterval(checkPaymentStatus, 3000);

    return () => {
      cancelled = true;

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [
    payment?.qr?.id,
    payment?.qr?.closeBy,
    paymentStatus,
  ]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function selectProject(projectId) {
    setForm((current) => ({
      ...current,
      projectId,
    }));

    setError("");
  }

  async function copyToClipboard(value, field) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField("");
      }, 1800);
    } catch (error) {
      console.error("Unable to copy:", error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Please enter the client name.");
      return;
    }

    const phone = form.phone.replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(phone)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!form.projectId) {
      setError("Please select a project.");
      return;
    }

    if (!form.plotNumber.trim()) {
      setError("Please enter the plot / booking ID.");
      return;
    }

    try {
      setLoading(true);
      setPayment(null);
      setCompletedPayment(null);
      setPaymentStatus("idle");
      setPaymentStatusError("");

      const response = await fetch("/api/payments/create-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone,
          projectId: form.projectId,
          plotNumber: form.plotNumber.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.code === "PAYMENT_GATEWAY_NOT_CONFIGURED") {
          setError(
            "The payment gateway is being configured. Please try again shortly.",
          );
          return;
        }

        setError(data?.error || "Unable to start the payment.");
        return;
      }

      setPayment(data);
      setActiveMethod("upi");
      setPaymentStatus("pending");
    } catch (submitError) {
      console.error("Payment request failed:", submitError);

      setError("Unable to connect to the payment service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#06090f] text-white">
      <section className="relative overflow-hidden border-b border-[#ddbc69]/20 bg-[radial-gradient(circle_at_top_left,_rgba(221,188,105,0.16),_transparent_28%),linear-gradient(135deg,#090d14_0%,#0a1320_45%,#081423_100%)] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#ddbc69]">
              Payments
            </p>

            <a
              href="/"
              className="inline-flex items-center rounded-full border border-[#ddbc69]/40 px-4 py-2 text-sm text-[#f3df9d] transition hover:bg-[#ddbc69]/10"
            >
              ← Back to Website
            </a>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Secure Payments
                <span className="mt-2 block font-normal text-white">
                  Fast. Safe. Verified.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                Complete your booking payment for WestWyn projects through our
                secure payment flow. Share your details first so we can connect
                your payment with the correct booking.
              </p>
            </div>

            <div className="justify-self-end rounded-[28px] border border-[#ddbc69]/20 bg-white/[0.03] px-6 py-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.35em] text-[#ddbc69]">
                Assets for a better tomorrow
              </p>

              <div className="mt-5 h-px w-24 bg-[#ddbc69]/45" />

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <HeroStat title="Verified" subtitle="Project accounts" />
                <HeroStat title="Secure" subtitle="Payment process" />
                <HeroStat title="Connected" subtitle="Ready for CRM" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center">
            <StepBadge
              number="1"
              title="Your Details"
              subtitle="Help us identify your booking"
              active
            />

            <div className="hidden h-px flex-1 bg-[#ddbc69]/30 lg:block" />

            <StepBadge
              number="2"
              title="Make Payment"
              subtitle="Scan QR or use bank details"
            />
          </div>

          <div className="mt-10">
            <div className="mb-4 flex items-center gap-4">
              <p className="min-w-fit text-xs font-semibold uppercase tracking-[0.3em] text-[#ddbc69]">
                Select Project
              </p>
              <div className="h-px flex-1 bg-[#ddbc69]/25" />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {PROJECTS.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => selectProject(project.id)}
                  className={`group flex w-full items-center justify-between rounded-[24px] border p-4 text-left transition ${
                    form.projectId === project.id
                      ? "border-[#ddbc69] bg-[#ddbc69]/12 shadow-[0_0_0_1px_rgba(221,188,105,0.28)]"
                      : "border-white/10 bg-white/[0.035] hover:border-[#ddbc69]/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-16 w-20 items-center justify-center rounded-2xl border text-center text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        form.projectId === project.id
                          ? "border-[#ddbc69]/60 bg-[#ddbc69]/12 text-[#f4de9e]"
                          : "border-white/10 bg-white/5 text-white/60"
                      }`}
                    >
                      BMA
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-white">
                        {project.name}
                      </p>
                      <p className="mt-1 text-sm text-white/58">
                        {project.subtitle}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.26em] text-[#ddbc69]">
                        {project.tag}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-6 w-6 rounded-full border-2 ${
                      form.projectId === project.id
                        ? "border-[#ddbc69] bg-[#ddbc69]"
                        : "border-white/35"
                    }`}
                  >
                    {form.projectId === project.id ? (
                      <div className="m-auto mt-[4px] h-2.5 w-2.5 rounded-full bg-[#081019]" />
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-7 xl:grid-cols-[0.96fr_1.04fr]">
            <div className="rounded-[30px] bg-[#f7f2e8] p-5 text-[#171717] shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7b767] text-lg text-[#9d7a22]">
                  🧾
                </div>

                <div>
                  <p className="text-sm font-medium text-[#9d7a22]">
                    Step 1 of 2
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight text-[#171717]">
                    Your Details
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#4f4b43]">
                    Please share a few details to help us link your payment with
                    your booking in our system.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Full Name" required>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className={lightInputClass}
                    />
                  </FormField>

                  <FormField label="Mobile Number" required>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      autoComplete="tel"
                      inputMode="numeric"
                      className={lightInputClass}
                    />
                  </FormField>

                  <FormField label="Email">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className={lightInputClass}
                    />
                  </FormField>

                  <FormField label="Project" required>
                    <select
                      name="projectId"
                      value={form.projectId}
                      onChange={handleChange}
                      className={lightInputClass}
                    >
                      {PROJECTS.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <div className="sm:col-span-2">
                    <FormField label="Plot / Booking ID" required>
                      <input
                        type="text"
                        name="plotNumber"
                        value={form.plotNumber}
                        onChange={handleChange}
                        placeholder="Enter plot or booking ID"
                        className={lightInputClass}
                      />
                    </FormField>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#ddbc69]/30 bg-[#f7edd4] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9d7a22]">
                        Booking Amount
                      </p>
                      <p className="mt-1 text-sm text-[#5a5348]">
                        Fixed booking amount for the selected project
                      </p>
                    </div>

                    <p className="text-3xl font-semibold text-[#b38723]">
                      {formatCurrency(BOOKING_AMOUNT)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#eadab0] bg-[#faf3df] px-4 py-4 text-sm leading-6 text-[#534d43]">
                  These details help our team quickly connect your payment with
                  your booking and assist you better.
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#ddbc69] px-6 py-4 text-base font-semibold text-[#1b160d] transition hover:bg-[#e8ca78] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating Secure Payment..."
                    : "Proceed to Payment →"}
                </button>
              </form>
            </div>

            <div className="rounded-[30px] border border-[#ddbc69]/20 bg-[linear-gradient(180deg,rgba(14,20,31,0.98),rgba(8,12,20,0.98))] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.24)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#ddbc69]/35 text-lg text-[#ddbc69]">
                  💳
                </div>

                <div>
                  <p className="text-sm font-medium text-[#ddbc69]">
                    Step 2 of 2
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight text-white">
                    Make Your Payment
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                    Use the payment methods below to complete your booking
                    payment securely.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex rounded-2xl border border-[#ddbc69]/20 bg-[#0e1420] p-1">
                <button
                  type="button"
                  onClick={() => setActiveMethod("upi")}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    activeMethod === "upi"
                      ? "bg-[#ddbc69] text-[#18130b]"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  Scan & Pay (UPI)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMethod("bank")}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    activeMethod === "bank"
                      ? "bg-[#ddbc69] text-[#18130b]"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  Bank Transfer
                </button>
              </div>

              {activeMethod === "upi" ? (
                <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[24px] bg-white p-5 text-center">
                    <div className="mx-auto flex min-h-[290px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
                      {payment?.qr?.imageUrl ? (
                        <img
                          src={payment.qr.imageUrl}
                          alt={`Payment QR for ${selectedProject.name}`}
                          className="h-auto w-full max-w-[240px]"
                        />
                      ) : (
                        <div className="max-w-[220px]">
                          <div className="mx-auto grid h-44 w-44 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
                            QR will appear here after Step 1
                          </div>
                          <p className="mt-4 text-sm text-slate-500">
                            Generate the secure QR by filling your details and
                            proceeding to payment.
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-700">
                      Scan & Pay with any UPI App
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                        <span
                          key={app}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ddbc69]">
                      Payment Summary
                    </p>

                    <div className="mt-5 space-y-4">
                      <SummaryRow
                        label="Project"
                        value={selectedProject.name}
                      />
                      <SummaryRow
                        label="Booking Amount"
                        value={formatCurrency(BOOKING_AMOUNT)}
                        highlight
                      />
                      <SummaryRow
                        label="Client Name"
                        value={form.name || "—"}
                      />
                      <SummaryRow label="Mobile" value={form.phone || "—"} />
                      <SummaryRow
                        label="Plot / Booking ID"
                        value={form.plotNumber || "—"}
                      />
                      <SummaryRow
                        label="Payment Reference"
                        value={
                          payment?.paymentReference ||
                          "Will appear after QR generation"
                        }
                      />
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                              Project UPI ID
                            </p>

                            <p className="mt-2 break-all text-sm font-medium text-white">
                              {selectedBankDetails.upiId}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(selectedBankDetails.upiId, "upi")
                            }
                            className="
        shrink-0
        rounded-xl
        border
        border-[#ddbc69]/25
        bg-[#ddbc69]/10
        px-3
        py-2
        text-xs
        font-semibold
        text-[#ddbc69]
        transition
        hover:bg-[#ddbc69]/15
      "
                          >
                            {copiedField === "upi" ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {payment ? (
                      <>
                        <PaymentStatusBadge status={paymentStatus} />

                        {paymentStatusError ? (
                          <p className="mt-3 text-xs leading-5 text-amber-200/80">
                            {paymentStatusError} We will keep trying
                            automatically.
                          </p>
                        ) : null}

                        {paymentStatus === "paid" && completedPayment ? (
                          <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.08] p-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-lg font-bold text-[#07111f]">
                                ✓
                              </div>

                              <div>
                                <p className="font-semibold text-emerald-200">
                                  Booking payment received
                                </p>

                                <p className="mt-1 text-sm leading-5 text-white/60">
                                  Your payment has been detected successfully.
                                </p>
                              </div>
                            </div>

                            <div className="mt-5 space-y-4 border-t border-emerald-400/15 pt-4">
                              <SummaryRow
                                label="Amount Paid"
                                value={formatCurrency(
                                  completedPayment.amount?.rupees ||
                                    BOOKING_AMOUNT,
                                )}
                                highlight
                              />

                              <SummaryRow
                                label="Payment ID"
                                value={completedPayment.payment?.id || "—"}
                              />

                              <SummaryRow
                                label="Payment Method"
                                value={
                                  completedPayment.payment?.method
                                    ? completedPayment.payment.method.toUpperCase()
                                    : "UPI"
                                }
                              />

                              <SummaryRow
                                label="Project"
                                value={
                                  completedPayment.project?.name ||
                                  selectedProject.name
                                }
                              />

                              <SummaryRow
                                label="Plot / Booking ID"
                                value={form.plotNumber}
                              />
                            </div>
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-[#101722] px-4 py-3 text-sm text-white/60">
                        Complete Step 1 to generate the live project payment QR.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ddbc69]">
                        Verified Project Account
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        Bank Transfer Details
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                        Transfer the booking amount only to the verified account
                        shown for the selected project.
                      </p>
                    </div>

                    <div className="rounded-full border border-[#ddbc69]/20 bg-[#ddbc69]/10 px-4 py-2 text-xs font-semibold text-[#ddbc69]">
                      {selectedProject.name}
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                    <BankRow
                      label="Beneficiary Name"
                      value={selectedBankDetails.beneficiaryName}
                      onCopy={() =>
                        copyToClipboard(
                          selectedBankDetails.beneficiaryName,
                          "beneficiary",
                        )
                      }
                      copied={copiedField === "beneficiary"}
                    />

                    <BankRow
                      label="Bank Name"
                      value={selectedBankDetails.bankName}
                    />

                    <BankRow
                      label="Account Number"
                      value={selectedBankDetails.accountNumber}
                      onCopy={() =>
                        copyToClipboard(
                          selectedBankDetails.accountNumber,
                          "account",
                        )
                      }
                      copied={copiedField === "account"}
                    />

                    <BankRow
                      label="IFSC Code"
                      value={selectedBankDetails.ifscCode}
                      onCopy={() =>
                        copyToClipboard(selectedBankDetails.ifscCode, "ifsc")
                      }
                      copied={copiedField === "ifsc"}
                    />

                    <BankRow
                      label="Branch"
                      value={selectedBankDetails.branch}
                    />

                    <BankRow
                      label="UPI ID"
                      value={selectedBankDetails.upiId}
                      onCopy={() =>
                        copyToClipboard(selectedBankDetails.upiId, "bank-upi")
                      }
                      copied={copiedField === "bank-upi"}
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
                    <p className="text-sm font-semibold text-[#f2d989]">
                      Manual bank transfers require verification
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/60">
                      Automatic payment confirmation will apply to payments
                      completed through the Razorpay payment flow. Direct bank
                      transfers may require manual reconciliation by our team.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-2xl border border-[#8ecf73]/30 bg-[linear-gradient(90deg,rgba(79,127,48,0.14),rgba(93,155,76,0.08))] px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-lg text-[#c9ec8e]">🛡️</div>
                  <div>
                    <p className="text-sm font-semibold text-[#e2f7b8]">
                      Your payments are secure and encrypted.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/70">
                      Once the payment is received, our team will verify it and
                      update your booking shortly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <MiniTrustCard
                  title="Quick Verification"
                  subtitle="Faster booking confirmation"
                />
                <MiniTrustCard
                  title="Connected to CRM"
                  subtitle="Helps us serve you better"
                />
                <MiniTrustCard
                  title="Secure & Reliable"
                  subtitle="Your information is safe with us"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroStat({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-white/55">{subtitle}</p>
    </div>
  );
}

function StepBadge({ number, title, subtitle, active = false }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-semibold ${
          active
            ? "border-[#ddbc69] bg-[#ddbc69] text-[#0f1115]"
            : "border-white/20 bg-white/[0.04] text-white"
        }`}
      >
        {number}
      </div>

      <div>
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="text-sm text-white/58">{subtitle}</p>
      </div>
    </div>
  );
}

function FormField({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#1e1b16]">
        {label}
        {required ? <span className="ml-1 text-[#b38723]">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <p
        className={`mt-1 break-words ${
          highlight
            ? "text-2xl font-semibold text-[#ddbc69]"
            : "text-base font-medium text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function BankRow({ label, value, onCopy, copied = false }) {
  return (
    <div
      className="
        grid
        gap-2
        border-b
        border-white/10
        px-4
        py-4
        last:border-b-0
        sm:grid-cols-[190px_1fr_auto]
        sm:items-center
      "
    >
      <p className="text-sm text-white/50">{label}</p>

      <p className="break-all text-sm font-medium text-white">{value}</p>

      {onCopy ? (
        <button
          type="button"
          onClick={onCopy}
          className="
            mt-1
            w-fit
            rounded-lg
            border
            border-[#ddbc69]/20
            bg-[#ddbc69]/10
            px-3
            py-1.5
            text-xs
            font-semibold
            text-[#ddbc69]
            transition
            hover:bg-[#ddbc69]/15
            sm:mt-0
          "
        >
          {copied ? "Copied" : "Copy"}
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

function MiniTrustCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-white/55">{subtitle}</p>
    </div>
  );
}

function PaymentStatusBadge({ status }) {
  if (status === "paid") {
    return (
      <div
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-emerald-400/30
          bg-emerald-400/10
          px-4
          py-2
          text-sm
          font-semibold
          text-emerald-300
        "
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-[#07111f]">
          ✓
        </span>
        Payment Successful
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-blue-400/25
          bg-blue-400/10
          px-4
          py-2
          text-sm
          text-blue-200
        "
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
        Processing payment...
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-amber-400/25
          bg-amber-400/10
          px-4
          py-2
          text-sm
          text-amber-200
        "
      >
        QR expired. Generate a new payment QR.
      </div>
    );
  }

  return (
    <div
      className="
        mt-6
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#ddbc69]/20
        bg-[#ddbc69]/10
        px-4
        py-2
        text-sm
        text-[#ddbc69]
      "
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#ddbc69]" />
      Waiting for payment...
    </div>
  );
}

const lightInputClass = `
  h-12
  w-full
  rounded-xl
  border
  border-[#d5d1c7]
  bg-white
  px-4
  text-sm
  text-[#1a1a1a]
  outline-none
  transition
  placeholder:text-[#857d72]
  focus:border-[#c89f34]
  focus:ring-2
  focus:ring-[#ddbc69]/20
`;
