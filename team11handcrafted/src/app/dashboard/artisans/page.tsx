import Image from "next/image";
import { artisans } from "@/app/lib/mockData";

export default function ArtisansPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Meet Our Artisans</h1>
      <p>Discover skilled craftspeople from around the world.</p>

      {/* ARTISANS GRID */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 24,
          marginTop: 24,
        }}
      >
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Image
              src={artisan.image}
              alt={artisan.name}
              width={200}
              height={200}
              style={{ borderRadius: 8 }}
            />

            <h3>{artisan.name}</h3>
            <p>{artisan.craft}</p>
            <small>{artisan.location}</small>
          </div>
        ))}
      </section>

      {/* SIGN UP FORM */}
      <section style={{ marginTop: 64 }}>
        <h2>Join as an Artisan</h2>
        <p>Sign up to showcase your craft.</p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <input type="text" placeholder="Full name" required />
          <input type="email" placeholder="Email address" required />
          <input type="text" placeholder="Craft type" required />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
  );
}
