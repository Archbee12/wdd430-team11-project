import ArtisanForm from "@/app/ui/artisans/artisan-form";
import { getArtisanById } from "@/app/lib/actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArtisanPage({ params }: Props) {
  const { id } = await params;
  const initialArtisan = await getArtisanById(id);
  if (!initialArtisan) return <p>Artisan not found</p>;

  const artisan = await getArtisanById(id);
  if (!artisan) return <p>Artisan not found</p>;

  return <ArtisanForm artisan={initialArtisan} />;
}
