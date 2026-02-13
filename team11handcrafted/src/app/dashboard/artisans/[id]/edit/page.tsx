import ArtisanForm from "@/app/ui/artisans/artisan-form";
import { getArtisanById } from "@/app/lib/actions";

type Props = { params: { id: string } };

export default async function EditArtisanPage({ params }: Props) {
  const { id } = await params;
  const artisan = await getArtisanById(id);
  if (!artisan) return <p>Artisan not found</p>;

  return <ArtisanForm artisan={artisan} />;
}
