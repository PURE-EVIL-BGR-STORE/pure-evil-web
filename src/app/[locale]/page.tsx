import {
  HeroSection,
  FeaturedProducts,
  BrandPhilosophy,
  CollectionShowcase,
  SocialSection,
  Footer,
} from "@/components/home";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      <FeaturedProducts />
      <BrandPhilosophy />
      <CollectionShowcase />
      <SocialSection />
      <Footer />
    </main>
  );
}
