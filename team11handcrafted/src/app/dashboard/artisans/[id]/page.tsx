import { getArtisanById } from "@/app/lib/actions";
import { inter } from "@/app/ui/fonts";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = { params: Promise<{ id: string }> };

export default async function ArtisanDetailPage({ params }: Props) {
  const { id } = await params;
  const artisan = await getArtisanById(id);

  if (!artisan) return notFound();

  return (
    <main className={`${inter.className} artisan-detail-page`}>
      <section className="hero-detail">
        {/* Image */}
        <div className="hero-image">
          <Image
            src={artisan.image_url ?? "/images/artisans/default-artisan.png"}
            alt={artisan.name ?? "Artisan"}
            width={400}
            height={400}
            className="image-rounded"
          />
        </div>

        {/* Info */}
        <div className="hero-info">
          <h1 className="hero-name">{artisan.name}</h1>
          {artisan.bio && <p className="hero-bio">{artisan.bio}</p>}
          {artisan.location && <p className="hero-location">{artisan.location}</p>}

          <div className="hero-actions">
            <button className="contact-btn">Contact Artisan</button>
            <button className="view-products-btn">View Products</button>
          </div>
        </div>
      </section>
    </main>
  );
}
