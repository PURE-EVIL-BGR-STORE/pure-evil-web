import {
  Atmosphere,
  RevealController,
  SiteNav,
  Hero,
  Ticker,
  Manifesto,
  Collections,
  FeaturedDrop,
  Lookbook,
  Cult,
  SiteFooter,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <Atmosphere />
      <RevealController />
      <SiteNav />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <Collections />
        <FeaturedDrop />
        <Lookbook />
        <Cult />
      </main>
      <SiteFooter />
    </>
  );
}
