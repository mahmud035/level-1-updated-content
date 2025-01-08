import useSearchAndFilter from '../../hooks/search/useSearch';

export default function NoDataFound({ message }: { message: string }) {
  const { searchQuery } = useSearchAndFilter();

  return (
    <div className="py-10 text-2xl font-medium text-center">
      {message}&nbsp;
      {searchQuery && (
        <span className="text-violet-500">For &quot;{searchQuery}&quot;</span>
      )}
    </div>
  );
}
