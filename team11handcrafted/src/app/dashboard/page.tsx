import { inter } from '@/app/ui/fonts';   

export default async function Page() {
  return (
    <main>
      <div className={`${inter.className} p-4`}>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard! Here you can find an overview of your activities and statistics.</p>
      </div>
    </main>
  );
}


