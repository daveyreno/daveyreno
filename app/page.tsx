import Hero from "@/components/common/Hero";
import HomeAbilities from "@/components/common/HomeAbilities";
import HomeExperience from "@/components/common/HomeExperience";
import ConvincedYet from "@/components/common/ConvincedYet";

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8">
      <Hero />
      <HomeAbilities />
      <HomeExperience />
      <div className="max-w-7xl mx-auto w-full">
        <ConvincedYet
          secondaryButtonText="View Abilities"
          secondaryButtonHref="/abilities"
        />
      </div>
    </div>
  );
}
