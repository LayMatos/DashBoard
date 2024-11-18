import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/EntregaPage';
import EstoquePage from './pages/EstoquePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Mapa from './pages/Mapacomzoom';

function App() {
  return (
    <Router>
      {/* Header - vai aparecer em todas as páginas */}
      <Header />
      
      <main className="flex flex-col min-h-screen">
        <Routes>
          {/* Rotas para diferentes páginas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/estoque" element={<EstoquePage />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
      </main>
      
      {/* Footer - vai aparecer em todas as páginas */}
      <Footer />
    </Router>
  );
}

export default App;
