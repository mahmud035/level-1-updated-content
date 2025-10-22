import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';

export default function useSearch() {
  const searchInfo = useContext(SearchContext);
  if (!searchInfo) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return searchInfo;
}
