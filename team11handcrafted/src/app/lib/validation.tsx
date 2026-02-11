export function validateProduct(data: {
  name: string;
  price: number;
  image?: File | string;
}) {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (data.price === undefined || data.price <= 0) errors.price = 'Price must be greater than 0';
  if (!data.image) errors.image = 'Image is required';
  return errors;
}
