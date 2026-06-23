import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LanguageProvider } from "@/react-app/contexts/LanguageContext";
import HomePage from "@/react-app/pages/Home";
import PropertiesPage from "@/react-app/pages/Properties";
import PropertyDetailPage from "@/react-app/pages/PropertyDetail";
import AboutPage from "@/react-app/pages/About";
import ServicesPage from "@/react-app/pages/Services";
import ContactPage from "@/react-app/pages/Contact";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
