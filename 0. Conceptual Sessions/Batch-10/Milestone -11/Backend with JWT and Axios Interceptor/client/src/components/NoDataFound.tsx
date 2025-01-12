import useSearch from '../hooks/search/useSearch';

export default function NoDataFound({ message }: { message: string }) {
  const { searchQuery } = useSearch();

  return (
    <div className="w-full col-span-4 text-2xl font-medium text-center min-h-[calc(100vh-306px)]">
      {message}&nbsp;
      {searchQuery && (
        <span className="text-violet-500">For &quot;{searchQuery}&quot;</span>
      )}
    </div>
  );
}
