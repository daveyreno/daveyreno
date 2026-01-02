"use client";

import ConvincedYet from "@/components/common/ConvincedYet";
import PageTitle from "@/components/common/PageTitle";
import SectionTitle from "@/components/common/SectionTitle";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Code,
  Database,
  FlaskConical,
  Handshake,
  MessageSquare,
  Package,
  Palette,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AbilitiesPage() {
  const [productProgress, setProductProgress] = useState(0);
  const [designProgress, setDesignProgress] = useState(0);
  const [engineeringProgress, setEngineeringProgress] = useState(0);

  useEffect(() => {
    // Animate progress bars on mount
    const timer = setTimeout(() => {
      setProductProgress(98);
      setDesignProgress(85);
      setEngineeringProgress(75);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <PageTitle title="Abilities" />

      <div className="space-y-4">
        <SectionTitle title="Disciplines" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Briefcase className="w-10 h-10 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">Product</p>
            </div>
            <Progress value={productProgress} className="mb-3" />
            <p className="text-xs text-muted-foreground uppercase mb-6">
              Master
            </p>
            <div className="space-y-6">
              <p>
                With 15 years experience in product management, working with
                teams from startups to large enterprises. I've learned that
                shipping fast and learning from real usage beats endless
                planning every time.
              </p>
              <p>
                I focus on solving real customer problems rather than building
                features for their own sake. If something doesn't move metrics
                or improve user experience, it's not worth building. I've
                cancelled more projects than I've shipped. Knowing when to stop
                is as important as knowing when to start.
              </p>
              <p>
                I've shipped products used by customer bases in the millions,
                and I've also built things that didn't work. Both experiences
                were valuable. The key is staying honest about what's working,
                measuring impact, and being willing to pivot when the data tells
                you to.
              </p>
            </div>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Palette className="w-10 h-10 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">Design</p>
            </div>
            <Progress value={designProgress} className="mb-3" />
            <p className="text-xs text-muted-foreground uppercase mb-6">
              Advanced
            </p>
            <div className="space-y-6">
              <p>
                I started designing with Photoshop, then transitioned to Figma
                and now create fully working react prototypes at speed. I've
                designed entire applications, always thinking about how they'll
                actually work, not just how they'll look.
              </p>
              <p>
                When I was the only PM and designer at a startup, I had to think
                about both sides at once. Every design choice had to make
                business sense, not just look good. That experience changed how
                I approach design. I always consider the product and business
                context, not just the visuals.
              </p>
              <p>
                Working across both product and design means fewer handoffs and
                faster iteration. I can consider the entire experience at once,
                which leads to better solutions and fewer meetings. The result
                is designs that solve problems, not just look good.
              </p>
            </div>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Code className="w-10 h-10 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">Engineering</p>
            </div>
            <Progress value={engineeringProgress} className="mb-3" />
            <p className="text-xs text-muted-foreground uppercase mb-6">
              Proficient
            </p>
            <div className="space-y-6">
              <p>
                I code in my spare time. Next.js and Supabase are my preferred
                stack. I enjoy tinkering with the full stack and building
                things. Being able to actually code makes me a better product
                person.
              </p>
              <p>
                Having technical knowledge changes how I collaborate with
                engineers. I can read code, understand implementation
                challenges, and have meaningful conversations about technical
                trade-offs. We speak the same language, which reduces
                miscommunication and speeds up delivery.
              </p>
              <p>
                I understand what's actually difficult to build versus what's
                straightforward, and I can assess whether something is worth the
                engineering effort. That context helps me make better product
                decisions and work more effectively with engineering teams.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-12">
        <SectionTitle title="Playbook" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Users className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Customer Focus
              </p>
            </div>
            <p>
              Start with the customer. Understand their problems, needs, and
              what they're trying to achieve. Talk to them, watch them work,
              figure out what they actually need, not what they say they want.
              Everything else follows from understanding the customer.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Database className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Deep Analysis
              </p>
            </div>
            <p>
              Understand the problem before you solve it. Dive into the data,
              talk to users, examine the details. Good analysis turns
              information into insights you can actually use. Most product
              mistakes happen because we didn't understand the problem well
              enough.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <FlaskConical className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Experimentation
              </p>
            </div>
            <p>
              Test your assumptions before you commit. Run experiments, validate
              ideas, learn fast. Not everything needs to be a full build.
              Sometimes a prototype or a simple test tells you everything you
              need to know. Fail cheap, learn expensive.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Trophy className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Objectives & Metrics
              </p>
            </div>
            <p>
              Define what success looks like before you start. Set clear
              objectives and track metrics that matter. This lets you see if
              you're heading in the right direction and adjust course when
              needed. Vague goals lead to vague results.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Target className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Ruthless Prioritisation
              </p>
            </div>
            <p>
              You can't build everything. Even good ideas need to wait. Cut
              features that don't move the needle. Say no to stakeholders, say
              no to your own ideas. If it's not the most important thing, it
              doesn't ship. Deciding what to cut is more important than deciding
              what to build.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <MessageSquare className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Communication
              </p>
            </div>
            <p>
              Be clear, be direct, be honest. Explain the why, not just the
              what. Keep teams aligned, stakeholders informed, and users in the
              loop. Good communication prevents most problems. Bad communication
              creates them.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Handshake className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Stakeholder Journeys
              </p>
            </div>
            <p>
              Involve stakeholders from the start. Bring them into the process
              early so their input actually shapes decisions. Don't just ask for
              feedback and ignore it. When people feel heard and see their
              suggestions implemented, they become advocates, not blockers.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Zap className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Keep it simple, stupid
              </p>
            </div>
            <p>
              Simplicity isn't hard. Complex systems should feel simple to use.
              If users need training to understand your product, you've
              overcomplicated it. Make sophisticated processes easy. The best
              products hide complexity, not flaunt it.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <Package className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">Delivery</p>
            </div>
            <p>
              Waterfall releases suck. Avoid them. Discovery and ideation should
              happen in small, rapid cycles. Break big initiatives into phases
              you can actually monitor. If something isn't working, pivot. Don't
              wait until the end to find out you built the wrong thing.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <div className="mb-4">
              <TrendingUp className="w-6 h-6 mb-3" />
              <p className="text-2xl font-bold tracking-tighter">
                Strive For Better
              </p>
            </div>
            <p>
              Never settle. Even when things are working, push for better. The
              products that last are the ones that evolve. What works today
              might not work tomorrow. Keep improving, keep learning, keep
              moving forward.
            </p>
          </div>
        </div>
      </div>

      <ConvincedYet
        secondaryButtonText="View Experience"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
