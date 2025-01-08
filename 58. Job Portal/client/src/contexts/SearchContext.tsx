import React, { createContext, useState } from 'react';

interface ISearchProviderProps {
  children: React.ReactNode;
}

interface ISearchContext {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<ISearchContext>({
  searchQuery: '',
  setSearchQuery: () => {},
});

export default function SearchProvider({ children }: ISearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchInfo = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <SearchContext.Provider value={searchInfo}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext };
