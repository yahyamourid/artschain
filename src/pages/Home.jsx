import Welcome from "../components/Welcome";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Register from "../components/Register";
import WeTheBest from "../components/WeTheBest";
import HowItsWorks from "../components/HowItsWorks"
import ArtWorkSearch from "../components/ArtWorkSearch";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <Features />
      <WeTheBest/>
      <HowItsWorks/>
    </div>
  );
}
