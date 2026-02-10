import Image from "next/image";
import { products } from "@/app/lib/mockData";

export default function ProductsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Our Products</h1>
      <p>Handcrafted items made with care.</p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
          marginTop: 24,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={240}
              height={240}
              style={{ borderRadius: 8 }}
            />

            <h3>{product.name}</h3>
            <p>{product.craft}</p>
            <p>${product.price}</p>

            <section>
              <strong>Reviews</strong>
              {product.reviews.map((review, index) => (
                <p key={index}>
                  ⭐ {review.rating}/5 — {review.comment}
                </p>
              ))}
            </section>
          </div>
        ))}
      </section>
    </main>
  );
}
