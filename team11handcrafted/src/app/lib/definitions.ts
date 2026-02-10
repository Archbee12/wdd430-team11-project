export type Artisan = {
  id: string;
  name: string;
  bio: string | null;
  location: string | null;
  image_url: string | null;
};

export type Product = {
  id: string;
  artisan_id: string;
  name: string;
  description: string | null;
  price: number | null;
  rating: number | null;
  image_url: string | null;
};
