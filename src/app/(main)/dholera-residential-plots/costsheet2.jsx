"use client";
import React, { useState, useEffect } from "react";
import icon from "@/assests/pdfIcon.webp";

const SALUTATIONS = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Dr.", label: "Dr." },
  { value: "Master", label: "Master" },
];

function formatIndianNumber(value) {
  return parseFloat(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Project-specific configurations
const projectConfigs = {
  "WestWyn Estates": {
    basePrice: 6500,
    chargeType: "developement",
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
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  Paradise: {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  "Paradise 2": {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  "Maple Township": {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  "Marina bay": {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
  Pride: {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge",
  },
};

export default function CostSheet({
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
    basePlotPriceYards: 9250,
    plotAreaFeet: "",
    totalPaymentYards: "",
    legalFee: 20000,
    chargeRate: 500,
    chargeAmount: 0,
    chargeName: "Maintenance Charge",
    chargeType: "maintenance",
    oneTimeMaintenance: 50000,
    totalCharges: 0,
    plotTotalPayment: 0,
  });

  const [availableProjects, setAvailableProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  const plotPriceWithPLC =
    parseFloat(formData.basePlotPriceYards) + (parseFloat(formData.plc) || 0);

  // Fetch projects from public folder
  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      const response = await fetch("/data/Residential.json");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projects = await response.json();
      setAvailableProjects(projects);

      // Set default project if slug is provided
      if (projectSlug) {
        const project = projects.find((p) => p.link === projectSlug);
        if (project) {
          setCurrentProject(project);
          const config = projectConfigs[project.projectName];

          setFormData((prev) => ({
            ...prev,
            projectName: project.projectName,
            basePlotPriceYards: config?.basePrice || 9250,
            chargeRate: config?.chargeRate || 500,
            chargeName: config?.chargeName || "Maintenance Charge",
            chargeType: config?.chargeType || "maintenance",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjectsError("Failed to load projects");
    } finally {
      setProjectsLoading(false);
    }
  };

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [projectSlug]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      const selectedProject = availableProjects.find(
        (p) => p.projectName === value,
      );
      const config = projectConfigs[value];

      if (config) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          basePlotPriceYards: config.basePrice,
          chargeRate: config.chargeRate,
          chargeName: config.chargeName,
          chargeType: config.chargeType,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      setCurrentProject(selectedProject);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Calculate totals when relevant fields change
  useEffect(() => {
    if (formData.plotAreaYards && formData.basePlotPriceYards) {
      const plotPrice = plotPriceWithPLC;
      const totalPayment = formData.plotAreaYards * plotPrice;
      const chargeAmount = formData.plotAreaYards * formData.chargeRate;
      const totalCharges =
        chargeAmount +
        parseFloat(
          formData.legalFee,
        ); /* + parseFloat(formData.oneTimeMaintenance) */
      const plotTotalPayment = totalPayment + totalCharges;
      const plotAreaFeet = formData.plotAreaYards * 9;

      setFormData((prevData) => ({
        ...prevData,
        plotAreaFeet,
        totalPaymentYards: totalPayment.toFixed(2),
        chargeAmount: chargeAmount.toFixed(2),
        totalCharges: totalCharges.toFixed(2),
        plotTotalPayment: plotTotalPayment.toFixed(2),
      }));
    }
  }, [
    formData.plotAreaYards,
    formData.basePlotPriceYards,
    formData.plc,
    formData.chargeRate,
    /* formData.oneTimeMaintenance, */
    formData.legalFee,
  ]);

  const generatePDF = async () => {
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
      chargeRate,
      chargeAmount,
      chargeName,
      /* oneTimeMaintenance, */
      legalFee,
      totalCharges,
      plotTotalPayment,
    } = formData;

    let startY = 40;

    const img = new Image();
    img.src = icon.src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      doc.addImage(img, "WEBP", 5, 5, 185, 38);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      let pageWidth = doc.internal.pageSize.getWidth();
      const head = `Cost Estimate - ${projectName}`;
      let text = doc.getTextWidth(head);
      let xPosition = (pageWidth - text) / 2;
      doc.text(head, xPosition, 48);

      startY += 10;

      const formattedplc = formatIndianNumber(plc);
      const formattedPricePerYard = formatIndianNumber(plotPriceWithPLC);
      const formattedTotalPaymentYards = formatIndianNumber(totalPaymentYards);
      const formattedChargeAmount = formatIndianNumber(chargeAmount);
      /*  const formattedOneTimeMaintenance = formatIndianNumber(oneTimeMaintenance); */
      const formattedLegalFee = formatIndianNumber(legalFee);
      const formattedTotalCharges = formatIndianNumber(totalCharges);
      const formattedPlotTotalPayment = formatIndianNumber(plotTotalPayment);
      // Combine salutation and name
      const fullName = `${salutation} ${name}`.trim();

      autoTable(doc, {
        startY: startY,
        body: [
          ["Name", name],
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
          ["Preffered Location Charges (PLC)", `Rs. ${formattedplc}`],
          ["Final Plot Price per Sq. Yard", `Rs. ${formattedPricePerYard}`],
          ["Total Payment", `Rs. ${formattedTotalPaymentYards}`],
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
            `${chargeName} (${chargeRate} x Size)`,
            `Rs. ${formattedChargeAmount}`,
          ],
          ["Legal Fee (Per Sale Deed)", `Rs. ${formattedLegalFee}`],
          /* ["Maintenance For 3 years", `Rs. ${formattedOneTimeMaintenance}`], */
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
        // Indent sub-points (a., b., c., etc.)
        const isSubPoint = /^[a-z]\./.test(term.trim());
        const xPos = isSubPoint ? 25 : 15; // add indentation for sub-points
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
        doc.internal.pageSize.height - 5,
      );

      doc.save(`${projectName || "Plot"}_Details.pdf`);
    };

    img.onerror = () => {
      console.error("Error loading image.");
    };
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl shadow-gray-500 rounded-lg p-4">
      <p className="text-center text-xl font-bold text-gray-700 mb-3">
        {currentProject
          ? `${currentProject.projectName} - Cost Estimate`
          : "Cost Estimate"}
      </p>

      <form>
        <div className="grid grid-cols-2 gap-x-4">
          {/* LEFT COLUMN */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold w-2/5 text-gray-600">
                    Salutation
                  </td>
                  <td className="px-2 py-1">
                    <select
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full rounded text-sm"
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
                      className="border px-2 py-1 w-full rounded text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Phone
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full rounded text-sm"
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
                      className="border px-2 py-1 w-full rounded text-sm"
                    />
                  </td>
                </tr>
                {showProjectSelector && (
                  <tr className="border-b">
                    <td className="px-2 py-1 font-semibold text-gray-600">
                      Project
                    </td>
                    <td className="px-2 py-1">
                      {projectsLoading ? (
                        <div className="border px-2 py-1 w-full rounded bg-gray-100 text-gray-500 text-sm">
                          Loading...
                        </div>
                      ) : projectsError ? (
                        <div className="border px-2 py-1 w-full rounded bg-red-100 text-red-500 text-sm">
                          {projectsError}
                        </div>
                      ) : (
                        <select
                          name="projectName"
                          id="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                          className="border px-2 py-1 w-full rounded text-sm"
                        >
                          <option value="">Select Project</option>
                          {availableProjects.map((project) => (
                            <option
                              key={project.link}
                              value={project.projectName}
                            >
                              {project.projectName} - {project.location}
                            </option>
                          ))}
                        </select>
                      )}
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
                      className="border px-2 py-1 w-full rounded text-sm"
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
                      className="border px-2 py-1 w-full rounded text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* RIGHT COLUMN */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold w-2/5 text-gray-600">
                    Area (Sq. Yds)
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="plotAreaYards"
                      value={formData.plotAreaYards}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full rounded text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    Area (Sq. Ft)
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="plotAreaFeet"
                      value={formData.plotAreaFeet}
                      className="border px-2 py-1 w-full rounded text-sm bg-gray-50"
                      readOnly
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
                      className="border px-2 py-1 w-full rounded text-sm"
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
                      value={plotPriceWithPLC.toFixed(2)}
                      className="border px-2 py-1 w-full rounded text-sm bg-gray-50"
                      readOnly
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
                      name="totalPaymentYards"
                      value={formData.totalPaymentYards}
                      className="border px-2 py-1 w-full rounded text-sm bg-gray-50"
                      readOnly
                    />
                  </td>
                </tr>
                <tr className="border-b bg-gray-100">
                  <td
                    colSpan="2"
                    className="px-2 py-1 font-bold text-center text-gray-700"
                  >
                    Additional Charges
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    {formData.chargeName} Rate
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      name="chargeRate"
                      value={formData.chargeRate}
                      onChange={handleChange}
                      className="border px-2 py-1 w-full rounded text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-1 font-semibold text-gray-600">
                    {formData.chargeName} Amount
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={formData.chargeAmount}
                      className="border px-2 py-1 w-full rounded text-sm bg-gray-50"
                      readOnly
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
                      className="border px-2 py-1 w-full rounded text-sm"
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
                      value={formData.totalCharges}
                      className="border px-2 py-1 w-full rounded text-sm bg-gray-50"
                      readOnly
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
                      value={formData.plotTotalPayment}
                      className="border px-2 py-1 w-full rounded text-sm bg-gray-50"
                      readOnly
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
          className="bg-blue-600 text-white py-1.5 px-4 mt-4 w-full rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
}
