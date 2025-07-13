interface IBookmarkProps {
  bookmark: string;
}

export default function Bookmark({ bookmark }: IBookmarkProps) {
  return <p className="py-4 rounded text-xl">{bookmark}</p>;
}
