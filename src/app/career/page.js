"use client";
import { useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFileAlt,
  FaBuilding,
  FaChevronLeft,
  FaUpload,
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";

export default function CareerPage() {
  const [currentView, setCurrentView] = useState("jobListings");
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        setStatus({ type: "success", message: "Application submitted successfully!" });
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };
  

  const jobListings = [
    {
      id: 1,
      title: "Portfolio Manager",
      company: "Book My Assets",
      description:
        "Join our team as a Portfolio Manager and help our clients achieve their financial goals through expert asset management.",
      location: "JMD Megapolis, Sector 48, Gurgaon",
      jobType: "Full Time",
      qualifications: "12+",
      experience: "Minimum 1 yr experience",
      salary: "upto 35k",
      workingHours: "10:30 AM - 7:30 PM",
      workingDays: "6 Days",
      contactEmail: "hr@bookmyassets.com",
      contactPhone: "9717671112",
      skills: [
        "Financial analysis",
        "Investment management",
        "Client relations",
        "Market research",
      ],
    },
    {
      id: 2,
      title: "Field Executive (Sales)",
      company: "Book My Assets",
      description:
        "Join our team as a Portfolio Manager and help our clients achieve their financial goals through expert asset management.",
      location: "JMD Megapolis, Sector 48, Gurgaon",
      jobType: "Full Time",
      qualifications: "12+",
      experience: " Minimum 1 yr experience in field sales",
      salary: "upto 30k",
      workingHours: "10:30 AM - 7:30 PM",
      workingDays: "6 Days",
      contactEmail: "hr@bookmyassets.com",
      contactPhone: "9717671112",
      skills: [
        "Rejection Handling",
        "Good Communication",
        "Convincing SkillConvincing Skills",
      ],
    },
    {
      id: 3,
      title: "Video Conferencing Sales Executive",
      company: "Book My Assets",
      description:
        "Join our team as a Portfolio Manager and help our clients achieve their financial goals through expert asset management.",
      location: "JMD Megapolis, Sector 48, Gurgaon",
      jobType: "Full Time",
      qualifications: "12+",
      experience: "Minimum 2 yr experience in Sales",
      salary: "upto 35k",
      workingHours: "10:30 AM - 7:30 PM",
      workingDays: "6 Days",
      contactEmail: "hr@bookmyassets.com",
      contactPhone: "9717671112",
      skills: [
        "Rejection Handling",
        "Good Communication",
        "Convincing SkillConvincing Skills",
      ],
    },
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setCurrentView("applicationForm");
  };

  const handleBackToJobs = () => {
    setCurrentView("jobListings");
    setSelectedJob(null);
    setSubmitSuccess(false);
    setStatus({ type: "", message: "" });
    setFileName("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div
        className="relative h-48 md:h-72 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold">
            Career Opportunities
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {currentView === "jobListings" && (
          <>
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Current Openings
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                    <p className="text-sm text-blue-100 mt-2 flex items-center">
                      <FaBuilding className="inline mr-2" />{" "}
                      {job.company || "Book My Assets"}
                    </p>
                    <p className="text-sm text-blue-100 mt-1 flex items-center">
                      <FaMapMarkerAlt className="inline mr-2" /> {job.location}
                    </p>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 mb-5 text-lg">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div className="flex items-start">
                        <FaFileAlt className="mt-1 mr-2 text-indigo-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">Qualifications:</h4>
                          <p className="text-gray-700">{job.qualifications}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaUser className="mt-1 mr-2 text-indigo-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">Experience:</h4>
                          <p className="text-gray-700">{job.experience}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaDollarSign className="mt-1 mr-2 text-indigo-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">Salary:</h4>
                          <p className="text-gray-700">{job.salary}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaClock className="mt-1 mr-2 text-indigo-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">Working Hours:</h4>
                          <p className="text-gray-700">{job.workingHours}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaCalendarAlt className="mt-1 mr-2 text-indigo-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">Working Days:</h4>
                          <p className="text-gray-700">{job.workingDays}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaEnvelope className="mt-1 mr-2 text-indigo-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">Contact:</h4>
                          <p className="text-gray-700">
                            {job.contactEmail} | {job.contactPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaFileAlt className="mr-2 text-indigo-600" /> Skills
                        Required:
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {job.skills.map((skill, index) => (
                          <li key={index} className="text-gray-700 flex items-center">
                            <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleJobSelect(job)}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-blue-800 transition duration-300 shadow-md flex items-center justify-center"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {currentView === "applicationForm" && !submitSuccess && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-6">
              <div className="flex items-center">
                <button
                  onClick={handleBackToJobs}
                  className="mr-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition"
                >
                  <FaChevronLeft className="text-white" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">
                    Apply for: {selectedJob.title}
                  </h2>
                  <p className="text-blue-100 mt-1 flex items-center">
                    <FaBuilding className="mr-2" /> Book My Assets
                  </p>
                  <p className="text-blue-100 mt-1 flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> {selectedJob.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form
                onSubmit={handleSubmit}
                method="POST"
                encType="multipart/form-data"
                className="space-y-6"
              >
                {/* Hidden field to store job title */}
                <input
                  type="hidden"
                  name="jobTitle"
                  value={selectedJob.title}
                />
                <input type="hidden" name="jobId" value={selectedJob.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 flex items-center"
                    >
                      <FaUser className="mr-2 text-indigo-600" /> First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 flex items-center"
                    >
                      <FaUser className="mr-2 text-indigo-600" /> Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 flex items-center"
                    >
                      <FaEnvelope className="mr-2 text-indigo-600" /> Email
                      Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 flex items-center"
                    >
                      <FaPhoneAlt className="mr-2 text-indigo-600" /> Phone
                      Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="currentCompany"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FaBuilding className="mr-2 text-indigo-600" /> Current
                    Company
                  </label>
                  <input
                    type="text"
                    name="currentCompany"
                    id="currentCompany"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Where are you currently working?"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FaFileAlt className="mr-2 text-indigo-600" /> Years of
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="How many years of relevant experience do you have?"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="currentCTC"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FaFileAlt className="mr-2 text-indigo-600" />
                     Current CTC
                  </label>
                  <input
                    type="text"
                    name="currentCTC"
                    id="currentCTC"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="How many years of relevant experience do you have?"
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FaUpload className="mr-2 text-indigo-600" /> Upload Your
                    Resume
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-lg text-center focus:outline-none focus:border-indigo-500 transition cursor-pointer bg-gray-50 hover:bg-gray-100 file:hidden"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <FaUpload className="text-3xl text-indigo-500 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop your resume here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: PDF, DOC, DOCX
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-bold rounded-lg 
                             hover:from-indigo-700 hover:to-blue-800 transition duration-300 shadow-md flex items-center justify-center"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentView === "applicationForm" && submitSuccess && (
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-10 text-center">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Application Submitted!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your application! We'll review it and get back to
              you soon.
            </p>

            <button
              onClick={handleBackToJobs}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-bold rounded-lg 
                        hover:from-indigo-700 hover:to-blue-800 transition duration-300 shadow-md"
            >
              Back to Job Listings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
