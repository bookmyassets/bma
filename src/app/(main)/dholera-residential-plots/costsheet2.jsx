"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import icon from "@/assests/headerCostsheet.png";

const SALUTATIONS = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Dr.", label: "Dr." },
  { value: "Master", label: "Master" },
];

const PROJECT_CONFIGS = {
  "WestWyn Residency": {
    basePrice: 6500,
    chargeType: "development",
    chargeRate: 500,
    chargeName: "Development Charge",
  },
  "WestWyn Estates": {
    basePrice: 6700,
    chargeType: "development",
    chargeRate: 500,
    chargeName: "Development Charge",
  },
  "WestWyn County": {
    basePrice: 11000,
    chargeType: "maintenance",
    chargeRate: 500,
    chargeName: "Maintenance Charge",
  },
  Orchid: {
    basePrice: 6500,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  Paradise: {
    basePrice: 6500,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  "Paradise 2": {
    basePrice: 6500,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  "Maple Township": {
    basePrice: 6500,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  "Marina bay": {
    basePrice: 6500,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  Pride: {
    basePrice: 6500,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
};

const DEFAULT_CONFIG = {
  basePrice: 9250,
  chargeType: "maintenance",
  chargeRate: 500,
  chargeName: "Maintenance Charge",
};

function getProjectConfig(projectName) {
  return PROJECT_CONFIGS[projectName] || DEFAULT_CONFIG;
}

function formatIndianNumber(value) {
  const num = Number(value) || 0;
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export default function CostSheet({
  projects = [],
  projectSlug = null,
  showProjectSelector = true,
}) {
  const [formData, setFormData] = useState({
    salutation: "Mr.",
    name: "",
    phone: "",
    email: "",
    plotNo: "",
    projectName: "",
    plc: "",
    plotAreaYards: "",
    basePlotPriceYards: "",
    legalFee: "20000",
    chargeRate: "",
  });

  const projectsBySlug = useMemo(() => {
    return new Map(projects.map((project) => [project.link, project]));
  }, [projects]);

  const selectedProject = useMemo(() => {
    return (
      projects.find(
        (project) => project.projectName === formData.projectName,
      ) || null
    );
  }, [projects, formData.projectName]);

  useEffect(() => {
    if (!projectSlug) {
      return;
    }

    const project = projectsBySlug.get(projectSlug);
    if (!project) {
      return;
    }

    const config = getProjectConfig(project.projectName);

    setFormData((prev) => ({
      ...prev,
      projectName: project.projectName,
      basePlotPriceYards: String(config.basePrice),
      chargeRate: String(config.chargeRate),
    }));
  }, [projectSlug, projectsBySlug]);

  const activeConfig = useMemo(() => {
    return getProjectConfig(formData.projectName);
  }, [formData.projectName]);

  const numbers = useMemo(() => {
    const plotAreaYards = Number(formData.plotAreaYards) || 0;
    const plc = Number(formData.plc) || 0;
    const basePlotPriceYards = Number(formData.basePlotPriceYards) || 0;
    const legalFee = Number(formData.legalFee) || 0;
    const chargeRate = Number(formData.chargeRate) || 0;
    const ifmsRate = 100;

    const plotPriceWithPLC = basePlotPriceYards + plc;
    const plotAreaFeet = plotAreaYards * 9;
    const totalPaymentYards = plotAreaYards * plotPriceWithPLC;
    const chargeAmount = plotAreaYards * chargeRate;
    const ifms = plotAreaYards * ifmsRate;
    const totalCharges = chargeAmount + legalFee + ifms;
    const plotTotalPayment = totalPaymentYards + totalCharges;

    return {
      plotAreaYards,
      plc,
      basePlotPriceYards,
      legalFee,
      chargeRate,
      ifmsRate,
      plotPriceWithPLC,
      plotAreaFeet,
      totalPaymentYards,
      chargeAmount,
      ifms,
      totalCharges,
      plotTotalPayment,
    };
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      const config = getProjectConfig(value);

      setFormData((prev) => ({
        ...prev,
        projectName: value,
        basePlotPriceYards: String(config.basePrice),
        chargeRate: String(config.chargeRate),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const generatePDF = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const headerImage = await loadImage(icon.src);
    doc.addImage(headerImage, "PNG", 15, 0, 180, 45);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    const title = `Cost Estimate - ${formData.projectName || "Project"}`;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 48);

    const formattedPlc = formatIndianNumber(numbers.plc);
    const formattedBasePrice = formatIndianNumber(numbers.basePlotPriceYards);
    const formattedFinalPrice = formatIndianNumber(numbers.plotPriceWithPLC);
    const formattedTotalPayment = formatIndianNumber(numbers.totalPaymentYards);
    const formattedChargeAmount = formatIndianNumber(numbers.chargeAmount);
    const formattedIfms = formatIndianNumber(numbers.ifms);
    const formattedLegalFee = formatIndianNumber(numbers.legalFee);
    const formattedTotalCharges = formatIndianNumber(numbers.totalCharges);
    const formattedPlotTotalPayment = formatIndianNumber(
      numbers.plotTotalPayment,
    );

    autoTable(doc, {
      startY: 50,
      body: [
        ["Name", `${formData.salutation} ${formData.name}`.trim()],
        ["Phone", formData.phone],
        ["Email", formData.email],
        ["Project Name", formData.projectName],
        ["Plot No", formData.plotNo],
        ["Plot Area (Sq. Yards)", String(numbers.plotAreaYards)],
        ["Plot Area (Sq. Feet)", String(numbers.plotAreaFeet)],
        ["Plot Price per Sq. Yard", `Rs. ${formattedBasePrice}`],
        ["Preferred Location Charges (PLC)", `Rs. ${formattedPlc}`],
        ["Final Plot Price per Sq. Yard", `Rs. ${formattedFinalPrice}`],
        ["Total Payment", `Rs. ${formattedTotalPayment}`],
      ],
      theme: "grid",
      styles: {
        fontSize: 11,
        cellPadding: 3,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [0, 51, 102],
        textColor: 255,
        fontStyle: "bold",
        lineWidth: 0.8,
      },
      alternateRowStyles: { fillColor: [225, 230, 255] },
      columnStyles: {
        0: { halign: "left", cellWidth: "auto" },
        1: { halign: "right", cellWidth: 80 },
      },
    });

    let finalY = doc.lastAutoTable.finalY + 6;

    doc.setFontSize(14);
    doc.text("Additional Charges", pageWidth / 2, finalY, {
      align: "center",
    });

    autoTable(doc, {
      startY: finalY + 4,
      body: [
        [
          `${activeConfig.chargeName} (${numbers.chargeRate} x Size)`,
          `Rs. ${formattedChargeAmount}`,
        ],
        ["Legal Fee (Per Sale Deed)", `Rs. ${formattedLegalFee}`],
        [`IFMS (${numbers.ifmsRate} x Size)`, `Rs. ${formattedIfms}`],
        ["Total Charges", `Rs. ${formattedTotalCharges}`],
        ["Plot Total Payment", `Rs. ${formattedPlotTotalPayment}`],
      ],
      theme: "grid",
      styles: {
        fontSize: 12,
        cellPadding: 3,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [0, 51, 102],
        textColor: 255,
        fontStyle: "bold",
        lineWidth: 0.8,
      },
      alternateRowStyles: { fillColor: [225, 230, 255] },
      columnStyles: {
        0: { halign: "left", cellWidth: "auto" },
        1: { halign: "right", cellWidth: 80 },
      },
    });

    finalY = doc.lastAutoTable.finalY;

    doc.setFontSize(10);
    doc.text("Terms & Conditions:", 15, finalY + 6);
    doc.setFontSize(9);

    const terms = [
      "1. Full payment must be made within the stipulated 30-day period",
      "2. Payment delay or default may result in booking amount forfeiture and plot cancellation.",
      "3. Stamp duty and registration deposits are additional.",
      "4. Refunds are available within 14 days of booking; after 15 days, the booking becomes non-refundable.",
      "5. BBA will be initiated after 25% payment is completed.",
      "6. Company decision only through authorised written communication.",
      "7. Late Payment Charges:",
      "a. Rs. 250/- per sq yard if payment is made after 45 days and within 60 days.",
      "b. Rs. 500/- per sq yard if payment is made after 60 days and within 90 days.",
      "Note - Kindly acknowledge the payment schedule to ensure a seamless registry process.",
    ];

    terms.forEach((term, index) => {
      const isSubPoint = /^[a-z]\./i.test(term.trim());
      const xPos = isSubPoint ? 25 : 15;
      doc.text(term.trim(), xPos, finalY + 10 + index * 5);
    });

    const date = new Date().toLocaleDateString("en-IN");
    const footerText = `Date of Generation: ${date}`;
    const footerWidth = doc.getTextWidth(footerText);

    doc.setFontSize(9);
    doc.text(
      footerText,
      pageWidth - footerWidth - 15,
      doc.internal.pageSize.height - 5,
    );

    doc.save(`${formData.projectName || "Plot"}_Details.pdf`);
  }, [activeConfig.chargeName, formData, numbers]);

  const currentProjectTitle =
    selectedProject?.projectName || formData.projectName;

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-4 shadow-xl shadow-gray-500">
      <p className="mb-3 text-center text-xl font-bold text-gray-700">
        {currentProjectTitle
          ? `${currentProjectTitle} - Cost Estimate`
          : "Cost Estimate"}
      </p>

      <form>
        <div className="grid gap-x-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="w-2/5 px-2 py-1 font-semibold text-gray-600">
                    Salutation
                  </td>
                  <td className="px-2 py-1">
                    <select
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    >
                      {SALUTATIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Name
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Phone
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      inputMode="numeric"
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Email
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                {showProjectSelector && (
                  <tr className="border-b">
                    <td className="px-2 py-1 font-semibold text-gray-600">
                      Project
                    </td>
                    <td className="px-2 py-1">
                      <select
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        className="w-full rounded border px-2 py-1 text-sm"
                      >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                          <option
                            key={project.link}
                            value={project.projectName}
                          >
                            {project.projectName} - {project.location}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )}

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Plot No
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      name="plotNo"
                      value={formData.plotNo}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">PLC</td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="plc"
                      value={formData.plc}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="w-2/5 px-2 py-1 font-semibold text-gray-600">
                    Area (Sq. Yds)
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="plotAreaYards"
                      value={formData.plotAreaYards}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Area (Sq. Ft)
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={numbers.plotAreaFeet || ""}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Base Price / Sq. Yd
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="basePlotPriceYards"
                      value={formData.basePlotPriceYards}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Final Price / Sq. Yd
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={numbers.plotPriceWithPLC.toFixed(2)}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Total Payment
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={numbers.totalPaymentYards.toFixed(2)}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b bg-gray-100">
                  <td
                    colSpan="2"
                    className="px-2 py-1 text-center font-bold text-gray-700"
                  >
                    Additional Charges
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    {activeConfig.chargeName} Rate
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="chargeRate"
                      value={formData.chargeRate}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    {activeConfig.chargeName} Amount
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={numbers.chargeAmount.toFixed(2)}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Legal Fee
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="legalFee"
                      value={formData.legalFee}
                      onChange={handleChange}
                      className="w-full rounded border px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-2 font-semibold text-gray-600">IFMS Rate</td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={numbers.ifmsRate}
                      readOnly
                      className="w-full rounded border bg-gray-100 p-2"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-2 font-semibold text-gray-600">
                    IFMS ({numbers.ifmsRate} x Size)
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={numbers.ifms.toFixed(2)}
                      readOnly
                      className="w-full rounded border bg-gray-100 p-2"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Total Charges
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={numbers.totalCharges.toFixed(2)}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-2 py-1 text-sm"
                    />
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Plot Total
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={numbers.plotTotalPayment.toFixed(2)}
                      readOnly
                      className="w-full rounded border bg-gray-50 px-2 py-1 text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button
          type="button"
          onClick={generatePDF}
          className="mt-4 w-full rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
}
