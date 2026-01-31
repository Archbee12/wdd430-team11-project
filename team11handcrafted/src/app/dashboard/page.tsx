import { inter } from '@/app/ui/fonts';   
import '@/app/globals.css'
import CardWrapper from '@/app/ui/dashboard/cards';
import React from 'react';
import ProductCardWrapper from '@/app/ui/dashboard/product-cards';

export default async function Page() {
  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <CardWrapper />
        <ProductCardWrapper />
      </div>
    </main>
  );
}


