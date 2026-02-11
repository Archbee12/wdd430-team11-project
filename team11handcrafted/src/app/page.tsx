import styles from './page.module.css';
import { poppins, inter } from '@/app/ui/fonts';
import Link from 'next/link';

export default function Page() {
  return (
    <main className={`${styles.page} ${inter.className}`}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={`${styles.logo} ${poppins.className}`}>
          Handcrafted Haven
        </h1>
        <nav className={styles.nav}>
          <Link href="/auth/login" className={styles.navLink}>Sign In</Link>
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
        <Link href="/auth/signup" className={styles.ctaButton}>
          Get Started
        </Link>
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

