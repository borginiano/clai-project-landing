import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AoreanaSection from './components/AoreanaSection';
import StatusSection from './components/StatusSection';
import CinemaSection from './components/CinemaSection';
import EcosystemSection from './components/EcosystemSection';
import SoftwareSection from './components/SoftwareSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <AoreanaSection />
      <StatusSection />
      <CinemaSection />
      <EcosystemSection />
      <SoftwareSection />
      <Footer />
    </div>
  );
};

export default App;
