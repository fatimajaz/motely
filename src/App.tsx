import React, { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSearchResults(null);

    try {
      // Simulated API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      const mockResults = {
        domain: { 
          available: Math.random() > 0.5, 
          price: '$12.99/year'
        },
        social: {
          instagram: Math.random() > 0.5,
          twitter: Math.random() > 0.5,
          tiktok: Math.random() > 0.5,
          snapchat: Math.random() > 0.5
        }
      };

      setSearchResults(mockResults);
    } catch (err) {
      setError('An error occurred while fetching the data. Please try again.');
      console.error('Error in handleSearch:', err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <header className="bg-purple-900 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">motely</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Secure Your Online Identity</h2>
          <p className="text-xl mb-8">Find the perfect domain and social media handles in one search</p>
          <form onSubmit={handleSearch} className="flex justify-center mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your brand name"
                className="py-3 px-4 pr-12 rounded-full w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition" disabled={isLoading}>
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {isLoading && <p>Searching...</p>}
          {error && <p className="text-red-300">{error}</p>}

          {searchResults && (
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Domain Availability</h4>
                  <p className="flex items-center">
                    {searchResults.domain.available ? (
                      <><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Available</>
                    ) : (
                      <><XCircle className="w-5 h-5 text-red-500 mr-2" /> Unavailable</>
                    )}
                  </p>
                  {searchResults.domain.available && (
                    <p className="text-sm text-gray-600 mt-1">Price: {searchResults.domain.price}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Social Media Handles</h4>
                  <ul className="space-y-1">
                    {Object.entries(searchResults.social).map(([platform, available]) => (
                      <li key={platform} className="flex items-center">
                        {available ? (
                          <><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {platform}</>
                        ) : (
                          <><XCircle className="w-4 h-4 text-red-500 mr-2" /> {platform}</>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-purple-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 motely. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;