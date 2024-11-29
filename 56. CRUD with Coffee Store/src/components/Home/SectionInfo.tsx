interface ISectionInfoProps {
  title: string;
  text: string;
}

export default function SectionInfo({ title, text }: ISectionInfoProps) {
  return (
    <>
      <p className="text-xl">{text}</p>
      <h2 className="pt-2 pb-4 text-5xl">{title}</h2>
    </>
  );
}
