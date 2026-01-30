import { inter } from '@/app/ui/fonts';   

export default async function Page() {
  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      </div>
    </main>
  );
}


