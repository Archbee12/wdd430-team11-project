
type ImageCardProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  amount?: number;
};

export function ArtisanCard({
  imageSrc,
  title,
  subtitle,
}: ImageCardProps) {
  return (
    <div className="artisan-card">
      <div className={`artisan-card__image ${imageSrc}`}>
        <img src={imageSrc} alt={title} />
      </div>

      <div className="artisan-card__content">
        <h3>{title}</h3>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ArtisanCardWrapper() {
  return (
    <div className="artisans">
      <ArtisanCard imageSrc="/images/artisans/artisan1.jpeg" title="Gibber Louiz" subtitle="Handcrafted with care"/>
      <ArtisanCard imageSrc="/images/artisans/artisan2.jpeg" title="Karmene Alliah" subtitle="Premium quality"/>
    </div>
  );
}



