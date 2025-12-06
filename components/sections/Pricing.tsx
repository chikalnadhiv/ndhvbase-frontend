'use client';

import { useEffect, useState } from 'react';
import { PricingCarousel } from './PricingCarousel';

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch pricing plans
    async function fetchPlans() {
      try {
        const response = await fetch('/api/pricing', {
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        }
      } catch (error) {
        console.error('Failed to fetch pricing:', error);
      }
    }
    fetchPlans();

    // Scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('pricing');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="min-h-[100svh] flex flex-col justify-center items-center py-24 pb-32 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600 animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Pricing Plans</span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899]">
              Pricing
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your project. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div 
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <PricingCarousel plans={plans} />
        </div>
      </div>
    </section>
  );
}
