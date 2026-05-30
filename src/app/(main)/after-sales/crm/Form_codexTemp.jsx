import { React } from "react";

export default function Form() {
  return (
    <>
      <div className="min-h-screen bg-[#151f28] px-6 py-12">
        <div className="max-w-3xl mx-auto pt-20 mb-12">
          <p className="text-[#debe6b] text-xs uppercase tracking-widest mb-2">
            After Sales
          </p>
          <h1 className="text-[#fbfbfb] text-4xl font-bold">CRM Portal</h1>
          <div className="mt-3 h-px w-16 bg-[#debe6b]" />
        </div>

        <section>
          <form action="" className="max-w-3xl mx-auto bg-[#1a2733] p-6 rounded-2xl space-y-6">
            <p className="text-lg font-medium text-gray-300">Client Details</p>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                rows={4}
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <p className="text-lg font-medium text-gray-300">Plot Booking Details</p>

            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-300"
              >
                Project Name
              </label>
              <select
                name="projectName"
                id="projectName"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a project</option>
                <option value="WestWyn Estates">WestWYn Estates</option>
                <option value="WestWyn Residency">WestWYn Residency</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="plotNumber"
                className="block text-sm font-medium text-gray-300"
              >
                Plot Number
              </label>
              <input
                type="text"
                name="plotNumber"
                id="plotNumber"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="plotArea" className="block text-sm font-medium text-gray-300">
                Plot Area (sq yd)
              </label>
              <input
                type="number"
                name="plotArea"
                id="plotArea"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="bookingDate"
                className="block text-sm font-medium text-gray-300"
              >
                Booking Date
              </label>
              <input
                type="date"
                name="bookingDate"
                id="bookingDate"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="bookingAmount"
                className="block text-sm font-medium text-gray-300"
              >
                Booking Amount
              </label>
              <input
                type="number"
                name="bookingAmount"
                id="bookingAmount"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="projectAdvisor"
                className="block text-sm font-medium text-gray-300"
              >
                Project Advisor
              </label>
              <input
                type="text"
                name="projectAdvisor"
                id="projectAdvisor"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="radio"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                select
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
