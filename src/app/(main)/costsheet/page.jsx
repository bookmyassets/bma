"use client";
import icon from "@/assests/pdfIcon.webp";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


// Salutation options
const SALUTATIONS = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Dr.", label: "Dr." },
  { value: "Master", label: "Master" },
];

// Local projects array
const PROJECTS = [
  { id: 1, title: "WestWyn Estate", ctype: "D" },
  { id: 2, title: "WestWyn County", ctype: "M" },
  { id: 3, title: "Paradise", ctype: "M" },
  { id: 4, title: "Paradise 2", ctype: "M" },
  { id: 5, title: "Orchid", ctype: "M" },
  { id: 6, title: "Marina Bay", ctype: "M" },
  { id: 7, title: "Maple Township", ctype: "M" },
  { id: 8, title: "Pride", ctype: "M" },
];

function formatIndianNumber(value) {
  return parseFloat(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatBookingDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-IN', { month: 'long' });
  const year = date.getFullYear();
  
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export default function CostSheet() {
  const [formData, setFormData] = useState({
    salutation: "Mr.",
    name: "",
    phone: "",
    email: "",
    plotNo: "",
    projectName: "",
    plc: "",
    plotAreaYards: "",
    basePlotPriceYards: 11000,
    plotAreaFeet: "",
    totalPaymentYards: "",
    legalFee: 20000,
    maintenanceRate: 500,
    maintenanceCharge: 0,
    ifmsRate: 100,
    ifms: 0,
    totalCharges: 0,
    plotTotalPayment: 0,
    bookingDate: new Date().toISOString().split('T')[0],
    associateName: "",
    generateForCRM: false,
  });

  const plotPriceWithPLC =
    parseFloat(formData.basePlotPriceYards) + (parseFloat(formData.plc) || 0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    if (formData.plotAreaYards && formData.basePlotPriceYards) {
      const plotPrice = plotPriceWithPLC;
      const totalPayment = formData.plotAreaYards * plotPrice;
      const maintenance = formData.plotAreaYards * formData.maintenanceRate;
      const ifmsCharge = formData.plotAreaYards * formData.ifmsRate;
      const totalCharges =
        maintenance +
        parseFloat(formData.legalFee) +
        ifmsCharge;
      const plotTotalPayment = totalPayment + totalCharges;
      const plotAreaFeet = formData.plotAreaYards * 9;

      setFormData((prevData) => ({
        ...prevData,
        plotAreaFeet,
        totalPaymentYards: totalPayment.toFixed(2),
        maintenanceCharge: maintenance.toFixed(2),
        ifms: ifmsCharge.toFixed(2),
        totalCharges: totalCharges.toFixed(2),
        plotTotalPayment: plotTotalPayment.toFixed(2),
      }));
    }
  }, [
    formData.plotAreaYards,
    formData.basePlotPriceYards,
    formData.plc,
    formData.maintenanceRate,
    formData.ifmsRate,
    formData.legalFee,
  ]);

  const generateMainPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    const {
      salutation,
      name,
      phone,
      email,
      plc,
      plotNo,
      projectName,
      plotAreaYards,
      plotAreaFeet,
      totalPaymentYards,
      maintenanceRate,
      maintenanceCharge,
      ifmsRate,
      ifms,
      legalFee,
      totalCharges,
      plotTotalPayment,
    } = formData;

    let startY = 40;

    const img = new Image();
    img.src = icon.src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      doc.addImage(img, "PNG", 5, 5, 185, 38);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      let pageWidth = doc.internal.pageSize.getWidth();
      const head = projectName ? `${projectName} - Cost Sheet` : "Cost Sheet";
      let text = doc.getTextWidth(head);
      let xPosition = (pageWidth - text) / 2;
      doc.text(head, xPosition, 48);

      startY += 10;

      const formattedplc = formatIndianNumber(plc);
      const formattedPricePerYard = formatIndianNumber(plotPriceWithPLC);
      const formattedTotalPaymentYards = formatIndianNumber(totalPaymentYards);
      const formattedMaintenanceCharge = formatIndianNumber(maintenanceCharge);
      const formattedIfms = formatIndianNumber(ifms);
      const formattedLegalFee = formatIndianNumber(legalFee);
      const formattedTotalCharges = formatIndianNumber(totalCharges);
      const formattedPlotTotalPayment = formatIndianNumber(plotTotalPayment);
      const fullName = `${salutation} ${name}`.trim();

      autoTable(doc, {
        startY: startY,
        body: [
          ["Name", fullName],
          ["Phone", phone],
          ["Email", email],
          ["Project Name", projectName],
          ["PlotNo", plotNo],
          ["Plot Area (Sq. Yards)", plotAreaYards],
          ["Plot Area (Sq. Feet)", plotAreaFeet],
          [
            "Plot Price per Sq. Yard",
            `Rs. ${formatIndianNumber(formData.basePlotPriceYards)}`,
          ],
          ["Preferred Location Charges (PLC)", `Rs. ${formattedplc}`],
          ["Final Plot Price per Sq. Yard", `Rs. ${formattedPricePerYard}`],
          ["Total Payment", `Rs. ${formattedTotalPaymentYards}`],
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

      let finalY = doc.lastAutoTable.finalY + 6;

      doc.setFontSize(14);
      doc.text("Additional Charges", pageWidth / 2, finalY, {
        align: "center",
      });

      autoTable(doc, {
        startY: finalY + 4,
        body: [
          [
            `Development Charge (${maintenanceRate} x Size)`,
            `Rs. ${formattedMaintenanceCharge}`,
          ],
          ["Legal Fee (Per Sale Deed)", `Rs. ${formattedLegalFee}`],
          [`IFMS (${ifmsRate} x Size)`, `Rs. ${formattedIfms}`],
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
      doc.text("Terms & Conditions:", 15, finalY + 5);
      doc.setFontSize(9);
      const terms = [
        "1. The booking amount is Rs. 50,000.",
        "2. You can request a refund within 30 days, and the payment will be returned to you within 7 days.",
        "3. The plot price and charges are subject to change without prior notice.",
        "4.  Maintenance Charges, as decided, will be collected separately.",
        "5. Legal fees cover documentation required for registration purposes.",
        "6. The full payment must be completed within the stipulated period, i.e., within 30 days.",
        "7. For registry, stamp duty is 4.9% for females and 5.9% for males.",
        "8. This is a system-generated document and does not require a signature.",
        "9. Late Payment Charges :",
        "a.  Rs. 250/- per sq yard if payment is made after 30 days and within 60 days",
        "b.  Rs. 500/- per sq yard if payment is made after 60 days and within 90 days",
      ];
      terms.forEach((term, index) => {
        const isSubPoint = /^[a-z]\./.test(term.trim());
        const xPos = isSubPoint ? 25 : 15;
        doc.text(term.trim(), xPos, finalY + 12 + index * 5);
      });

      let date = new Date().toLocaleDateString();
      pageWidth = doc.internal.pageSize.getWidth();
      text = `Date of Generation: ${date}`;
      const textWidth = doc.getTextWidth(text);

      doc.setFontSize(9);
      doc.text(
        text,
        pageWidth - textWidth - 15,
        doc.internal.pageSize.height - 5
      );

      doc.save(`${projectName || "Plot"}_Details.pdf`);
    };

    img.onerror = () => {
      console.error("Error loading image.");
    };
  };

  const generateCRMPDF = () => {
    const doc = new jsPDF();
    const {
      salutation,
      name,
      plotNo,
      projectName,
      plotAreaYards,
      plotAreaFeet,
      bookingDate,
      associateName,
      legalFee,
    } = formData;

    // Calculate simplified totals for CRM
    const crmBasePlotPriceYards = parseFloat(formData.basePlotPriceYards) + 
                                   (parseFloat(formData.plc) || 0) + 
                                   parseFloat(formData.maintenanceRate) + 
                                   parseFloat(formData.ifmsRate);
    const totalPayment = formData.plotAreaYards * crmBasePlotPriceYards;
    const plotTotalPayment = totalPayment + parseFloat(formData.legalFee);

    let startY = 40;

    const img = new Image();
    img.src = icon.src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      doc.addImage(img, "PNG", 5, 5, 185, 38);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      let pageWidth = doc.internal.pageSize.getWidth();
      const head = `Cost Estimate - ${projectName || "Project"}`;
      let text = doc.getTextWidth(head);
      let xPosition = (pageWidth - text) / 2;
      doc.text(head, xPosition, 48);

      startY += 15;

      const formattedTotalPayment = formatIndianNumber(totalPayment);
      const formattedLegalFee = formatIndianNumber(legalFee);
      const formattedPlotTotalPayment = formatIndianNumber(plotTotalPayment);
      const formattedBookingDate = formatBookingDate(bookingDate);
      const fullName = `${salutation} ${name}`.trim();

      autoTable(doc, {
        startY: startY,
        body: [
          ["Name", fullName],
          ["Booking Date", formattedBookingDate],
          ["Associate Name", associateName],
          ["Project Name", projectName],
          ["Plot No", plotNo],
          ["Plot Area (Sq. Yards)", plotAreaYards],
          ["Plot Area (Sq. Feet)", plotAreaFeet],
          [
            "Plot Price per Sq. Yard",
            `Rs. ${formatIndianNumber(crmBasePlotPriceYards)}`,
          ],
          ["Total Payment", `Rs. ${formattedTotalPayment}`],
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

      let finalY = doc.lastAutoTable.finalY + 6;

      doc.setFontSize(18);
      doc.text("Additional Charges", pageWidth / 2, finalY, {
        align: "center",
      });

      autoTable(doc, {
        startY: finalY + 4,
        body: [
          ["Legal Fee (Per Sale Deed)", `Rs. ${formattedLegalFee}`],
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

      doc.setFontSize(14);
      doc.text("Terms & Conditions:", 15, finalY + 8);
      doc.setFontSize(9);

      const terms = [
        "1. The booking amount is Rs. 50,000.",
        "2. You can request a refund within 30 days, and the payment will be returned to you within 7 days.",
        "3. The plot price and charges are subject to change without prior notice.",
        "4.  Maintenance Charges, as decided, will be collected separately.",
        "5. Legal fees cover documentation required for registration purposes.",
        "6. The full payment must be completed within the stipulated period, i.e., within 30 days.",
        "7. For registry, stamp duty is 4.9% for females and 5.9% for males.",
        "8. This is a system-generated document and does not require a signature.",
        "9. Late Payment Charges :",
        "a.  Rs. 250/- per sq yard if payment is made after 30 days and within 60 days",
        "b.  Rs. 500/- per sq yard if payment is made after 60 days and within 90 days",
      ];

      terms.forEach((term, index) => {
        const isSubPoint = term.startsWith("a.") || term.startsWith("b.");
        const xPos = isSubPoint ? 25 : 15;
        doc.text(term, xPos, finalY + 18 + index * 5);
      });

      let date = new Date().toLocaleDateString();
      pageWidth = doc.internal.pageSize.getWidth();
      text = `Date of Generation: ${date}`;
      const textWidth = doc.getTextWidth(text);

      doc.setFontSize(9);
      doc.text(
        text,
        pageWidth - textWidth - 15,
        doc.internal.pageSize.height - 5
      );

      doc.save(`${projectName || "Plot"}_CRM_Cost_Estimate.pdf`);
    };

    img.onerror = () => {
      console.error("Error loading image.");
    };
  };

  const handleGeneratePDF = () => {
    // Generate main PDF
    generateMainPDF();
    
    // Generate CRM PDF if option is checked
    if (formData.generateForCRM) {
      // Small delay to ensure both PDFs download properly
      setTimeout(() => {
        generateCRMPDF();
      }, 500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-40 bg-white shadow-xl shadow-gray-500 rounded-lg p-6">
      <p className="text-center text-3xl font-bold text-gray-700 mb-4">
        Plot Price Calculation
      </p>
      <div>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-semibold">Salutation</td>
              <td className="p-2">
                <select
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
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
              <td className="p-2 font-semibold">Name</td>
              <td className="p-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Enter full name"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Phone Number</td>
              <td className="p-2">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Email</td>
              <td className="p-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Booking Date</td>
              <td className="p-2">
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Associate Name</td>
              <td className="p-2">
                <input
                  type="text"
                  name="associateName"
                  value={formData.associateName}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Enter associate name"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Project Name</td>
              <td className="p-2">
                <select
                  name="projectName"
                  id="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                >
                  <option value="">Select Project</option>
                  {PROJECTS.map((project) => (
                    <option key={project.id} value={project.title}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot No</td>
              <td className="p-2">
                <input
                  type="text"
                  name="plotNo"
                  value={formData.plotNo}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">
                Preferred Location Charge (PLC)
              </td>
              <td className="p-2">
                <input
                  type="number"
                  name="plc"
                  value={formData.plc}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Area (Sq. Yards)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="plotAreaYards"
                  value={formData.plotAreaYards}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Area (Sq. Feet)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="plotAreaFeet"
                  value={formData.plotAreaFeet}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">
                Base Plot Price per Sq. Yard
              </td>
              <td className="p-2">
                <input
                  type="number"
                  name="basePlotPriceYards"
                  value={formData.basePlotPriceYards}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">
                Final Plot Price per Sq. Yard (Base + PLC)
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={plotPriceWithPLC.toFixed(2)}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Total Payment</td>
              <td className="p-2">
                <input
                  type="text"
                  name="totalPaymentYards"
                  value={formData.totalPaymentYards}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b bg-gray-100">
              <td colSpan="2" className="p-2 font-bold text-center">
                Additional Charges
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Development Charge Rate</td>
              <td className="p-2">
                <select
                  name="maintenanceRate"
                  value={formData.maintenanceRate}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                >
                  <option value="100">100</option>
                  <option value="500">500</option>
                </select>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">
                Development Charge ({formData.maintenanceRate} x Size)
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.maintenanceCharge}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Legal Fee (Per Sale Deed)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="legalFee"
                  value={formData.legalFee}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">IFMS Rate</td>
              <td className="p-2">
                <input
                  type="number"
                  name="ifmsRate"
                  value={formData.ifmsRate}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">IFMS ({formData.ifmsRate} x Size)</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.ifms}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Total Charges</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.totalCharges}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Total Payment</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.plotTotalPayment}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b bg-blue-50">
              <td className="p-2 font-semibold">Generate for CRM</td>
              <td className="p-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="generateForCRM"
                    checked={formData.generateForCRM}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Generate CRM cost sheet (simplified version)
                  </span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="button"
          onClick={handleGeneratePDF}
          className="bg-blue-600 text-white p-2 mt-6 w-full rounded hover:bg-blue-700 transition-colors"
        >
          {formData.generateForCRM ? 'Generate PDFs (Main + CRM)' : 'Generate PDF'}
        </button>
      </div>
    </div>
  );
}