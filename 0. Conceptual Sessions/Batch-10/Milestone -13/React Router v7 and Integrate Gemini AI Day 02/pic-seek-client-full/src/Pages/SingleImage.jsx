import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PageTitle from '../components/shared/PageTitle';
import { placeholderImage } from '../utils';

export default function SingleImage() {
  const { id } = useParams();
  const [image, setImage] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, [id]);

  return (
    <>
      <PageTitle>{image?.prompt ?? ''}</PageTitle>

      <div className="w-11/12 mx-auto">
        <figure className="my-5 p-1 flex justify-center">
          <img
            src={image.original_img ?? placeholderImage}
            alt="Generated Image"
            className="rounded-md"
          />
        </figure>
      </div>
    </>
  );
}
