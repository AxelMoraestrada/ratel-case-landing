import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import Hero from './components/sections/Hero';
import SobreNosotros from './components/sections/SobreNosotros';
import Productos from './components/sections/Productos';
import Beneficios from './components/sections/Beneficios';
import BuscadorSedes from './components/sections/BuscadorSedes';
import MapaSedes from './components/sections/MapaSedes';
import Testimonios from './components/sections/Testimonios';
import FAQ from './components/sections/FAQ';
import Contacto from './components/sections/Contacto';

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SobreNosotros />
        <Productos />
        <Beneficios />
        <BuscadorSedes />
        <MapaSedes />
        <Testimonios />
        <FAQ />
        <Contacto />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
