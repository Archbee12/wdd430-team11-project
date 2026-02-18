export type Artisan = {
  id: string;
  name: string;
  bio: string;         
  location: string;   
  image_url: string;
};

export type Product = {
  id: string;
  artisan_id: string;
  name: string;
  description: string; 
  price: number;  
  rating: number;
  image_url: string;
  artisan_name?: string;
  average_rating?: number;
  review_count?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "artisan" | "buyer" | "admin";
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user_name?: string;
};

export type ReviewWithUser = Review & {
  user_name: string;
};
