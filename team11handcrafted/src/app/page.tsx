// import { poppins, inter } from '@/app/ui/fonts';
// import '@/app/globals.css';

// export default function Page() {
//   return (
//     <main className={inter.className}>
//       {/* Header */}
//       <header>
//         <h1 className={poppins.className}>Handcrafted Haven</h1>
//         <nav>
//           {/* <a href="#products">Products</a>
//           <a href="#artisans">Artisans</a>
//           <a href="#about">About</a> */}
//           <a href="#signup">Sign In</a>
//         </nav>
//       </header>

//       {/* Hero */}
//       <section className="hero">
//         <h2 className={poppins.className}>Discover Unique Handcrafted Treasures</h2>
//         <p>Explore our curated collection of handmade items from talented artisans around the world.</p>
//         <a href="#signup" className="cta-button">Get Started</a>
//       </section>

//       {/* Features */}
//       <section className="features" id="features">
//         <h3 className={poppins.className}>Why Choose Handcrafted Haven?</h3>
//         <div className="features-grid">
//           <div className="feature-card">
//             <h4>Support Local Artisans</h4>
//             <p>Connect with talented creators and help their craft thrive.</p>
//           </div>
//           <div className="feature-card">
//             <h4>Unique Handcrafted Items</h4>
//             <p>Each item is carefully made, offering one-of-a-kind treasures.</p>
//           </div>
//           <div className="feature-card">
//             <h4>Sustainable & Ethical</h4>
//             <p>Enjoy products that are environmentally friendly and responsibly made.</p>
//           </div>
//         </div>
//       </section>

//       {/* About */}
//       <section className="about" id="about">
//         <h3 className={poppins.className}>About Handcrafted Haven</h3>
//         <p>
//           Handcrafted Haven is a platform for artisans to showcase and sell their creations. We aim to foster a community
//           of creators and conscious consumers, making unique and high-quality handmade items accessible to everyone.
//         </p>
//       </section>

//       {/* Call to Action */}
//       <section className="cta" id="signup">
//         <h3 className={poppins.className}>Ready to Explore?</h3>
//         <a href="/signup" className="cta-button">Sign Up Now</a>
//       </section>

//       {/* Footer */}
//       <footer>
//         <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
//       </footer>
//     </main>
//   );
// }

// src/app/page.tsx
import styles from './page.module.css';
import { poppins, inter } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className={`${styles.page} ${inter.className}`}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={`${styles.logo} ${poppins.className}`}>
          Handcrafted Haven
        </h1>
        <nav className={styles.nav}>
          <a href="#signup" className={styles.navLink}>Sign In</a>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <h2 className={`${styles.heroTitle} ${poppins.className}`}>
          Discover Unique Handcrafted Treasures
        </h2>
        <p className={styles.heroText}>
          Explore our curated collection of handmade items from talented artisans
          around the world.
        </p>
        <a href="#signup" className={styles.ctaButton}>
          Get Started
        </a>
      </section>

      {/* Features */}
      <section className={styles.features} id="features">
        <h3 className={`${styles.featuresTitle} ${poppins.className}`}>
          Why Choose Handcrafted Haven?
        </h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4 className={styles.featureTitle}>Support Local Artisans</h4>
            <p className={styles.featureText}>Connect with talented creators and help their craft thrive.</p>
          </div>

          <div className={styles.featureCard}>
            <h4 className={styles.featureTitle}>Unique Handcrafted Items</h4>
            <p className={styles.featureText}>Each item is carefully made, offering one-of-a-kind treasures.</p>
          </div>

          <div className={styles.featureCard}>
            <h4 className={styles.featureTitle}>Sustainable & Ethical</h4>
            <p className={styles.featureText} >Enjoy products that are environmentally friendly and responsibly made.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.about} id="about">
        <h3 className={`${styles.aboutTitle} ${poppins.className}`}>About Handcrafted Haven</h3>
        <p className={styles.aboutText}>
          Handcrafted Haven is a platform for artisans to showcase and sell their
          creations. We foster a community of creators and conscious consumers.
        </p>
      </section>

      {/* CTA */}
      <section className={styles.cta} id="signup">
        <h3 className={`${styles.featuresTitle} ${poppins.className}`}>Ready to Explore?</h3>
        <a href="/signup" className={styles.ctaButton}>
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

