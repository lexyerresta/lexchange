import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarketTable from "@/components/MarketTable";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <Hero />
      <MarketTable />

      {/* Feature Section Placeholder to make it fuller */}
      <section className="container" style={{ padding: '4rem 1.5rem', margin: '0 auto', maxWidth: '1280px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#a78bfa' }}>Secure Storage</h3>
            <p style={{ color: '#94a3b8' }}>Your assets are protected by industry-leading security protocols and cold storage.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#22d3ee' }}>Lightning Fast</h3>
            <p style={{ color: '#94a3b8' }}>Zero-latency trading engine capable of handling millions of transactions per second.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#f472b6' }}>24/7 Support</h3>
            <p style={{ color: '#94a3b8' }}>Our dedicated support team is available around the clock to assist you.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
