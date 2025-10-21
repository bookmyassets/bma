"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import icon from "@/assests/pdfIcon.webp";

// Local projects array
const PROJECTS = [
  { id: 1, title: "WestWyn Estate", ctype:"D" },
  { id: 2, title: "WestWyn County", ctype:"M" },
  { id: 3, title: "Paradise", ctype:"M" },
  { id: 4, title: "Paradise 2", ctype:"M" },
  { id: 5, title: "Orchid", ctype:"M" },
  { id: 6, title: "Marina Bay", ctype:"M" },
  { id: 7, title: "Maple Township", ctype:"M" },
  { id: 8, title: "Pride", ctype:"M" },
];

function formatIndianNumber(value) {
  return parseFloat(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CostSheet() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plotNo: "",
    projectName: "",
    plotAreaYards: "",
    basePlotPriceYards: 6250,
    plotAreaFeet: "",
    totalPayment: "",
    legalFee: 20000,
    plotTotalPayment: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formData.plotAreaYards && formData.basePlotPriceYards) {
      const totalPayment = formData.plotAreaYards * formData.basePlotPriceYards;
      const plotTotalPayment = totalPayment + parseFloat(formData.legalFee);
      const plotAreaFeet = formData.plotAreaYards * 9;

      setFormData((prevData) => ({
        ...prevData,
        plotAreaFeet,
        totalPayment: totalPayment.toFixed(2),
        plotTotalPayment: plotTotalPayment.toFixed(2),
      }));
    }
  }, [formData.plotAreaYards, formData.basePlotPriceYards, formData.legalFee]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const {
      name,
      phone,
      email,
      plotNo,
      projectName,
      plotAreaYards,
      plotAreaFeet,
      totalPayment,
      legalFee,
      plotTotalPayment,
    } = formData;

    // Find the selected project to get its ctype
    const selectedProject = PROJECTS.find(p => p.title === projectName);
    const chargeType = selectedProject?.ctype === "D" ? "Development charges" : "Maintenance charges";

    let startY = 40;

    const img = new Image();
    img.src = icon.src; // Replace with your actual icon path
    img.crossOrigin = "anonymous";

    img.onload = () => {
      doc.addImage(img, "WEBP", 5, 5, 185, 38);

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

      autoTable(doc, {
        startY: startY,
        body: [
          ["Name", name],
          ["Phone", phone],
          ["Email", email],
          ["Project Name", projectName],
          ["Plot No", plotNo],
          ["Plot Area (Sq. Yards)", plotAreaYards],
          ["Plot Area (Sq. Feet)", plotAreaFeet],
          [
            "Plot Price per Sq. Yard",
            `Rs. ${formatIndianNumber(formData.basePlotPriceYards)}`,
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
        /* `4. ${chargeType}, as decided, will be collected separately.`, */
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

      doc.save(`${projectName || "Plot"}_Cost_Estimate.pdf`);
    };

    img.onerror = () => {
      console.error("Error loading image.");
    };
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
              <td className="p-2 font-semibold">Name</td>
              <td className="p-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
                  readOnly
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Price per Sq. Yard</td>
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
              <td className="p-2 font-semibold">Total Payment</td>
              <td className="p-2">
                <input
                  type="text"
                  name="totalPayment"
                  value={formData.totalPayment}
                  className="border p-2 w-full rounded"
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
              <td className="p-2 font-semibold">Plot Total Payment</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.plotTotalPayment}
                  className="border p-2 w-full rounded"
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="button"
          onClick={generatePDF}
          className="bg-blue-600 text-white p-2 mt-6 w-full rounded hover:bg-blue-700 transition-colors"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}