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
};

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "artisan" | "seller" | "buyer";
};

