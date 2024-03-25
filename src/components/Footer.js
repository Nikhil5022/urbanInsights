import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2">
            <form className="flex w-full max-w-sm">
              <input
                type="email"
                className="bg-gray-900 text-white border border-gray-700 rounded-l-full py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 md:flex md:items-center">
            <p className="text-center text-gray-400">&copy; 2024 Urban Insights. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
