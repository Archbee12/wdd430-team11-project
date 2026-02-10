import { getArtisanById } from '@/app/lib/actions';
import { inter } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';

type Props = { params: { id: string } };

export default async function ArtisanDetailPage({ params }: Props) {
  const { id } = await params;
  const artisan = await getArtisanById(id);

  if (!artisan) return notFound();

  return (
    <main className={`${inter.className} artisan-detail-page`}>
      <div className="artisan-card-detail">
        {/* Left Side - Image */}
        <div className="artisan-image">
          <img src={artisan.image_url} alt={artisan.name} />
        </div>

        {/* Right Side - Details */}
        <div className="artisan-info">
          <h1 className="artisan-name">{artisan.name}</h1>
          {artisan.bio && (
            <p className="artisan-bio">
              <strong>Bio:</strong> {artisan.bio}
            </p>
          )}
          {artisan.location && (
            <p className="artisan-location">
              <strong>Location:</strong> {artisan.location}
            </p>
          )}
          <button className="artisan-contact-btn">Contact Artisan</button>
        </div>
      </div>
    </main>
  );
}
