import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  className?: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // For now, show all supported languages
    // In a real implementation, you might want to check which languages
    // actually have translations available
    setAvailableLanguages(SUPPORTED_LANGUAGES);
  }, []);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
    
    // Store preference in localStorage
    localStorage.setItem('preferred_language', languageCode);
  };

  if (!currentLang) return null;

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLang.name}</span>
        <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="py-1 max-h-60 overflow-y-auto">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    language.code === currentLanguage ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="flex-1 text-sm font-medium">{language.name}</span>
                  {language.code === currentLanguage && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
              <p className="text-xs text-gray-500">
                Translations powered by LibreTranslate
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector; 