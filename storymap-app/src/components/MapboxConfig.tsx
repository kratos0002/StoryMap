import { useState } from 'react';

interface MapboxConfigProps {
  onApiKeySet: (apiKey: string) => void;
}

const MapboxConfig: React.FC<MapboxConfigProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter a Mapbox API key');
      return;
    }
    
    setIsValidating(true);
    setError(null);
    
    try {
      // Simple validation - check if the key format looks reasonable
      if (apiKey.length < 20) {
        throw new Error('API key appears to be too short');
      }
      
      // Store the API key in local storage
      localStorage.setItem('mapbox_api_key', apiKey);
      
      // Notify parent component
      onApiKeySet(apiKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate API key');
      setIsValidating(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-serif font-bold">Welcome to StoryMap</h2>
          <p className="mt-2 text-blue-100">Explore short stories from around the world</p>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mapbox Configuration</h3>
          
          <p className="text-gray-600 mb-6">
            StoryMap uses Mapbox to display an interactive world map. Please enter your Mapbox API key to continue.
            Your key will be stored locally on your device and is never sent to our servers.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                Mapbox API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="pk.eyJ1IjoieW91..."
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isValidating}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {isValidating ? 'Validating...' : 'Continue to StoryMap'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have a Mapbox API key?{' '}
              <a 
                href="https://account.mapbox.com/auth/signup/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapboxConfig;
