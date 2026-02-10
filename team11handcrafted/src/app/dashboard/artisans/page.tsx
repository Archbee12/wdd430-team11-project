import { getAllArtisans } from '@/app/lib/actions';
import { inter } from '@/app/ui/fonts';
import Link from 'next/link';

export default async function ArtisansPage() {
  // Fetch artisans data first
  const artisans = await getAllArtisans();

  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Artisans</h1>
      </div>

      <table className="artisan-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Bio</th>
            <th>View Profile</th>
          </tr>
        </thead>
        <tbody>
          {artisans.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.location}</td>
              <td>{a.bio}</td>
              <td>
                <Link href={`/dashboard/artisans/${a.id}`} className="text-blue-500 hover:underline">
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
