import PageTitle from "@/components/common/PageTitle";
import SectionTitle from "@/components/common/SectionTitle";
import { HireMeButton } from "@/components/common/HireMeButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <PageTitle title="Experience" />

      <div className="space-y-4">
        <SectionTitle title="Greatest Hits" />

        <div className="space-y-8">
          {/* Soar */}
          <div className="flex flex-col lg:flex-row gap-6 border rounded-2xl p-4 sm:p-6">
            <div className="lg:w-1/2 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-600 flex items-center justify-center aspect-[4/3] relative">
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs"
                >
                  FinTech
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs"
                >
                  2025
                </Badge>
              </div>
              <Image
                src="/soar-inc-logo.svg"
                alt="Soar Logo"
                width={160}
                height={60}
                className="object-contain h-auto w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] brightness-0 invert"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">
                  Soar
                </h2>
                <p className="text-base text-muted-foreground mb-3">
                  Head of Product
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">FinTech</Badge>
                  <Badge variant="outline">Retail Mortgages</Badge>
                  <Badge variant="outline">Enterprise</Badge>
                </div>
              </div>
              <p>
                Leading 4 cross-functional squads as Head of Product. Prototyped
                the majority of the platform, making significant contributions
                to the build that impressed the engineering team. Built and
                scaled the product organisation, establishing Agile processes,
                stakeholder management frameworks, and delivery standards that
                increased team velocity by 40% within 6 months.
              </p>
              <p>
                Led strategic pivot from commercial loans to retail mortgages,
                identifying a $2B+ opportunity through market analysis and user
                research. Architected and delivered the decision engine roadmap,
                reducing mortgage approval times from weeks to seconds.
                Introduced the concept of investment pools for funding home
                loans, allowing automatic investments to occur. Built a
                high-performing team from scratch, recruiting key talent
                including one senior hire from my network.
              </p>
            </div>
          </div>

          {/* Lendi */}
          <div className="flex flex-col lg:flex-row gap-6 border rounded-2xl p-4 sm:p-6">
            <div className="lg:w-1/2 rounded-lg p-4 sm:p-6 bg-gradient-to-br to-sky-950 from-emerald-600 flex items-center justify-center aspect-[4/3] relative">
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs"
                >
                  FinTech
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs"
                >
                  2021 - 2025
                </Badge>
              </div>
              <Image
                src="/lendi-logo.svg"
                alt="Lendi Logo"
                width={300}
                height={200}
                className="object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">
                  Lendi
                </h2>
                <p className="text-base text-muted-foreground mb-3">
                  Senior Product Manager
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Enterprise</Badge>
                  <Badge variant="outline">Home Loans</Badge>
                  <Badge variant="outline">Data Analytics</Badge>
                  <Badge variant="outline">Infosec</Badge>
                </div>
              </div>
              <p>
                Joined Lendi during the acquisition of Aussie Home Loans,
                creating Australia's largest home loan originator with 4M+
                customer records. Led product initiatives across the merged
                entity, managing complex integration of legacy and modern
                microservice architectures through Agile methodologies and
                stakeholder management. Delivered interplatform sync solutions
                that unified customer data, reducing operational overhead by
                30%.
              </p>
              <p>
                Introduced AI-powered live chat to convert users to
                appointments. Created new authentication systems to improve
                security and conversion rates. Delivered an end-to-end referral
                system to reduce cost per acquisition, working with extensive
                customer data to drive product decisions through user research
                and data analytics.
              </p>
            </div>
          </div>

          {/* Cranetime */}
          <div className="flex flex-col lg:flex-row gap-6 border rounded-2xl p-4 sm:p-6">
            <div className="lg:w-1/2 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center aspect-[4/3] relative">
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs"
                >
                  ConTech
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs"
                >
                  2017 - 2021
                </Badge>
              </div>
              <Image
                src="/cranetime-logo.svg"
                alt="Cranetime Logo"
                width={300}
                height={200}
                className="object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">
                  Cranetime
                </h2>
                <p className="text-base text-muted-foreground mb-3">
                  Product Manager
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">ConTech</Badge>
                  <Badge variant="outline">Startup</Badge>
                  <Badge variant="outline">Customer Centric</Badge>
                </div>
              </div>
              <p>
                Built Cranetime from scratch to market-leading product, the
                first construction site crane and delivery scheduling platform.
                Singlehandedly designed the product architecture, developed the
                design system, and established Agile product processes. Grew
                from 0 to 200 active construction sites across $20B+ in projects
                through user research and iterative roadmap delivery.
              </p>
              <p>
                Implemented customer-centric development approach, spending time
                on construction sites to understand real-world workflows. Built
                a product that reduced crane idle time by 35% and improved
                delivery coordination efficiency by 50%. Successfully exited via
                acquisition in 2021 to a port delivery management app based in
                London that wanted to scale into construction.
              </p>
            </div>
          </div>

          {/* LEGALNET */}
          <div className="flex flex-col lg:flex-row gap-6 border rounded-2xl p-4 sm:p-6">
            <div className="lg:w-1/2 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center aspect-[4/3] relative">
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs"
                >
                  LegalTech
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs"
                >
                  2013 - 2017
                </Badge>
              </div>
              <Image
                src="/legalnet-logo.svg"
                alt="LEGALNET Logo"
                width={300}
                height={200}
                className="object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">
                  LEGALNET
                </h2>
                <p className="text-base text-muted-foreground mb-3">
                  Founder & Product Manager
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Law</Badge>
                  <Badge variant="outline">Lead Generation</Badge>
                  <Badge variant="outline">CRM</Badge>
                  <Badge variant="outline">Startup</Badge>
                </div>
              </div>
              <p>
                Co-founded Legalnet in legal lead generation and CRM. Built the
                company from concept to exit, designing the entire product
                experience, customer journey, and bespoke CRM platform. Led
                product development with a lean team of one engineer, managing
                stakeholder relationships and product roadmap. Ran the
                performance marketing campaigns, mastering Google Ads to drive
                lead generation.
              </p>
              <p>
                Built technology for a traditionally tech-averse industry,
                designing intuitive interfaces through extensive user research
                that integrated seamlessly with legal workflows. The platform
                improved operational efficiencies, enabling users to take on
                significantly more cases with a lower ratio of lawyers. This
                efficiency gain enabled users to generate revenue that exceeded
                traditional law firm benchmarks.
              </p>
            </div>
          </div>

          {/* Crazy Domains */}
          <div className="flex flex-col lg:flex-row gap-6 border rounded-2xl p-4 sm:p-6">
            <div className="lg:w-1/2 rounded-lg p-4 sm:p-6 bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center aspect-[4/3] relative">
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs"
                >
                  Infra
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs"
                >
                  2009 - 2016
                </Badge>
              </div>
              <Image
                src="/crazydomains-logo.svg"
                alt="Crazy Domains Logo"
                width={300}
                height={200}
                className="object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">
                  Crazy Domains
                </h2>
                <p className="text-base text-muted-foreground mb-3">
                  Project Manager
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Web Services</Badge>
                  <Badge variant="outline">Growth</Badge>
                  <Badge variant="outline">Startup</Badge>
                </div>
              </div>
              <p>
                Joined Crazy Domains as employee #6, contributing to rapid
                growth from startup to Australia's largest domain and hosting
                provider with 1M+ customers. Recognised for exceptional
                technical and commercial skills. Within 3 months, formed a
                subsidiary agency with the founder focused on talent acquisition
                and development.
              </p>
              <p>
                Founded and scaled the web agency, building 200+ custom websites
                and applications for SMB clients. Established a talent
                development pipeline, hiring and training 15+ junior designers
                and developers who progressed into senior roles at the parent
                company. This unique combination of technical execution, sales,
                and team building provided the foundation for product management
                expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border rounded-2xl p-8 sm:p-12">
          <div className="text-center space-y-6">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                Convinced Yet?
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Let's build something amazing together
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <HireMeButton size="lg" />
              <Button variant="outline" asChild size="lg">
                <Link href="/abilities">Abilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
