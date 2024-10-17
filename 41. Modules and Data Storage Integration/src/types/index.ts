export interface IWatch {
  id: number;
  brand: string;
  model: string;
  price: number;
  features: string[];
  batteryLife: string;
  availability: boolean;
  releaseYear: number;
}

export interface IBottle {
  id: string;
  category: string;
  name: string;
  seller: string;
  price: number;
  stock: number;
  ratings: number;
  ratingsCount: number;
  img: string;
  shipping: number;
  quantity: number;
}
