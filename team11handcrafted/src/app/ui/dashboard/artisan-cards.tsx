// ui/dashboard/artisan-card.tsx
import Link from 'next/link';
import Image from 'next/image';

type ArtisanCardProps = {
  id: string;
  imageSrc: string;
  title: string;
  bio?: string | null;
};

export function ArtisanCard({ id, imageSrc, title, bio }: ArtisanCardProps) {
  return (
    <Link href={`/dashboard/artisans/${id}`}>
      <div className="artisan-card cursor-pointer hover:shadow-lg transition">
        <div className="artisan-card__image">
          <Image src={imageSrc} alt={title} width={300} height={200} />
        </div>
        <div className="artisan-card__content">
          <h3>{title}</h3>
          {bio && <p className="subtitle">{bio.slice(0, 50)}...</p>} {/* snippet */}
        </div>
      </div>
    </Link>
  );
}

type ArtisanCardWrapperProps = {
  artisans: {
    id: string;
    name: string;
    bio?: string | null;
    image_url: string;
  }[];
};

export default function ArtisanCardWrapper({ artisans }: ArtisanCardWrapperProps) {
  return (
    <div className="artisans">
      {artisans.map((a) => (
        <ArtisanCard
          key={a.id}
          id={a.id}
          imageSrc={a.image_url}
          title={a.name}
          bio={a.bio}
        />
      ))}
    </div>
  );
}
