interface IFeatureProps {
  icon: string;
}

export default function Feature({ icon }: IFeatureProps) {
  return (
    <div className="space-y-3">
      <img src={icon} alt="" className="size-16" />
      <h4 className="text-3xl">Awesome Aroma</h4>
      <p>You will definitely be a fan of the design & aroma of your coffee</p>
    </div>
  );
}
