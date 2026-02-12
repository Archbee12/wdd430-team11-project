import ArtisanForm from "@/app/ui/artisans/artisan-form";
import { getArtisanById } from "@/app/lib/actions";

type Props = { params: { id: string } };

export default async function EditArtisanPage({ params }: Props) {
  const artisan = await getArtisanById(params.id);
  if (!artisan) return <p>Artisan not found</p>;

  return <ArtisanForm artisan={artisan} />;
}
