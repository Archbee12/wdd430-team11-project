// import ImageCard from '@/app/ui/dashboard/artisan-cards';

// export default function ArtisanCards() {
//   return (
//     <>
//       <ImageCard
//         imageSrc="/images/artisan1.jpg"
//         title="Amina Bello"
//         subtitle="Textile Artisan"
//         meta="12 artisans"
//       />

//       <ImageCard
//         imageSrc="/images/artisan2.jpg"
//         title="Kofi Mensah"
//         subtitle="Wood Crafts"
//         meta="8 artisans"
//       />
//     </>
//   );
// }

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



