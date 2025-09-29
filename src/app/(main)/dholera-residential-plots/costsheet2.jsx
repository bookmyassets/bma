"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import icon from "@/assests/pdfIcon.webp";

// We'll fetch the residential projects data from public folder

function formatIndianNumber(value) {
  return parseFloat(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Project-specific configurations
const projectConfigs = {
  "WestWyn Estate": {
    basePrice: 6250,
    chargeType: "developement",
    chargeRate: 500,
    chargeName: "Development Charge"
  },
  "WestWyn County": {
    basePrice: 9500,
    chargeType: "maintenance",
    chargeRate: 500,
    chargeName: "Maintenance Charge"
  },
  "Orchid": {
    basePrice:6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge"
  },
  "Paradise": {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge"
  },
  "Paradise 2": {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge"
  },
  "Maple Township": {
    basePrice:6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge"
  },
  "Marina bay": {
    basePrice:6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge"
  },
  "Pride": {
    basePrice: 6700,
    chargeType: "maintenance",
    chargeRate: 100,
    chargeName: "Maintenance Charge"
  }
};

export default function CostSheet({ projectSlug = null, showProjectSelector = true }) {
  const [formData, setFormData] = useState({
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
      const response = await fetch('/data/Residential.json');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projects = await response.json();
      setAvailableProjects(projects);
      
      // Set default project if slug is provided
      if (projectSlug) {
        const project = projects.find(p => p.link === projectSlug);
        if (project) {
          setCurrentProject(project);
          const config = projectConfigs[project.projectName];
          
          setFormData(prev => ({
            ...prev,
            projectName: project.projectName,
            basePlotPriceYards: config?.basePrice || 9250,
            chargeRate: config?.chargeRate || 500,
            chargeName: config?.chargeName || "Maintenance Charge",
            chargeType: config?.chargeType || "maintenance"
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjectsError('Failed to load projects');
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
      const selectedProject = availableProjects.find(p => p.projectName === value);
      const config = projectConfigs[value];
      
      if (config) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          basePlotPriceYards: config.basePrice,
          chargeRate: config.chargeRate,
          chargeName: config.chargeName,
          chargeType: config.chargeType
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
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
        chargeAmount + parseFloat(formData.legalFee) + parseFloat(formData.oneTimeMaintenance);
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
    formData.oneTimeMaintenance,
    formData.legalFee,
  ]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const {
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
      oneTimeMaintenance,
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
      const formattedOneTimeMaintenance = formatIndianNumber(oneTimeMaintenance);
      const formattedLegalFee = formatIndianNumber(legalFee);
      const formattedTotalCharges = formatIndianNumber(totalCharges);
      const formattedPlotTotalPayment = formatIndianNumber(plotTotalPayment);

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
            `${chargeName} (${chargeRate} x Size)`,
            `Rs. ${formattedChargeAmount}`,
          ],
          ["Legal Fee (Per Sale Deed)", `Rs. ${formattedLegalFee}`],
          ["Maintenance For 3 years", `Rs. ${formattedOneTimeMaintenance}`],
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
        "3. This is a system-generated document and does not require a signature.",
        "4. The plot price and charges are subject to change without prior notice.",
        "5. Maintenance charges are one-time and non-refundable.",
        "6. Legal fees cover documentation and registration expenses.",
        "7. The final payment must be completed within the stipulated period.",
        "8. Full payment is to be completed within 30 days.",
        "9. For registry, stamp duty is 4.9% for females and 5.9% for males.",
        "10. Preferred Location Charge (PLC) will be added where necessary.",
      ];

      terms.forEach((term, index) => {
        doc.text(term, 15, finalY + 18 + index * 5);
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

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl shadow-gray-500 rounded-lg p-6">
      <p className="text-center text-3xl font-bold text-gray-700 mb-4">
        {currentProject ? `${currentProject.projectName} - Cost Estimate` : 'Cost Estimate'}
      </p>

      <form>
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
            
            {showProjectSelector && (
              <tr className="border-b">
                <td className="p-2 font-semibold">Project Name</td>
                <td className="p-2">
                  {projectsLoading ? (
                    <div className="border p-2 w-full rounded bg-gray-100 text-gray-500">
                      Loading projects...
                    </div>
                  ) : projectsError ? (
                    <div className="border p-2 w-full rounded bg-red-100 text-red-500">
                      {projectsError}
                    </div>
                  ) : (
                    <select
                      name="projectName"
                      id="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    >
                      <option value="">Select Project</option>
                      {availableProjects.map((project) => (
                        <option key={project.link} value={project.projectName}>
                          {project.projectName} - {project.location}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            )}
            
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
              <td className="p-2 font-semibold">{formData.chargeName} Rate</td>
              <td className="p-2">
                <input
                  type="number"
                  name="chargeRate"
                  value={formData.chargeRate}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-semibold">
                {formData.chargeName} ({formData.chargeRate} x Size)
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.chargeAmount}
                  className="border p-2 w-full rounded"
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
            {/* <tr className="border-b">
              <td className="p-2 font-semibold">
                One Time Maintenance(for 3 years)
              </td>
              <td className="p-2">
                <input
                  type="number"
                  name="oneTimeMaintenance"
                  value={formData.oneTimeMaintenance}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr> */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Total Charges</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.totalCharges}
                  className="border p-2 w-full rounded"
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
      </form>
    </div>
  );
}