'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface PricingCarouselProps {
  plans: PricingPlan[];
}

export function PricingCarousel({ plans }: PricingCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    duration: 25, // Smooth transition
    containScroll: 'trimSnaps',
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit);
  }, [emblaApi, onInit, onSelect]);

  // If 3 or fewer plans, show grid layout
  if (plans.length <= 3) {
    return (
      <div 
        className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pt-8 pb-12 px-6 -mx-6 md:mx-0 md:px-0 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {plans.map((plan) => (
          <div key={plan.id} className="snap-center flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
    );
  }

  // If more than 3 plans, show carousel with 3 cards visible on desktop
  return (
    <div className="relative pt-8 pb-12">
      <div className="overflow-hidden px-4 -mx-4" ref={emblaRef}>
        <div className="flex gap-6 will-change-transform [backface-visibility:hidden] [transform:translate3d(0,0,0)]">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex-[0_0_85%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 
                     w-12 h-12 rounded-full 
                     bg-gradient-to-br from-card to-background
                     border border-border
                     hover:border-primary hover:shadow-lg hover:shadow-primary/25
                     transition-all duration-300 
                     items-center justify-center
                     group/btn cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 
                     w-12 h-12 rounded-full 
                     bg-gradient-to-br from-card to-background
                     border border-border
                     hover:border-primary hover:shadow-lg hover:shadow-primary/25
                     transition-all duration-300 
                     items-center justify-center
                     group/btn cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
        </button>
      )}

      {/* Dots Indicator */}
      {plans.length > 3 && (
        <div className="flex justify-center gap-2 mt-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === selectedIndex 
                  ? 'w-8 bg-gradient-to-r from-primary to-purple-600' 
                  : 'w-2 bg-border hover:bg-muted-foreground'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="relative h-full group pt-8 pb-2">
      {/* Most Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] rounded-full blur opacity-75" />
            <span className="relative px-3 py-1 bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] text-white text-xs font-semibold rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
              <span>⭐</span> Most Popular
            </span>
          </div>
        </div>
      )}
      
      {/* Card Wrapper with Gradient Border */}
      <div className="relative h-full rounded-xl">
        {/* Gradient border - always visible for popular, on hover for others */}
        <div className={`absolute -inset-[1px] bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] rounded-xl transition-all duration-500 ${
          plan.popular 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'
        }`} />
        
        <Card
          className={`relative h-full flex flex-col overflow-hidden rounded-xl border-0 transition-all duration-300 ${
            plan.popular
              ? 'bg-gradient-to-br from-card to-background shadow-2xl shadow-primary/20'
              : 'bg-card border border-border/50 hover:border-transparent shadow-lg hover:shadow-xl hover:shadow-primary/5'
          }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl -z-0" />
          
          <CardHeader className="relative z-10 pb-4 px-5 pt-6">
            <CardTitle className="text-lg font-semibold text-foreground mb-1">{plan.name}</CardTitle>
            <div className="flex items-baseline gap-1.5 mt-3">
              <span className="text-3xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                {plan.price}
              </span>
              {plan.price !== 'Custom' && (
                <span className="text-muted-foreground text-xs font-medium">/project</span>
              )}
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {plan.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pb-4 px-5 flex-1">
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
            
            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li 
                  key={feature} 
                  className="flex items-start gap-2 text-xs text-muted-foreground group/item"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50 group-hover/item:opacity-100 transition-opacity" />
                      <Check className="relative w-3.5 h-3.5 text-primary stroke-[3]" />
                    </div>
                  </div>
                  <span className="leading-relaxed group-hover/item:text-foreground transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-4 px-5 pb-5 mt-auto">
            <Link
              href={`/payment?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}
              className={`
                w-full py-2.5 px-5 rounded-lg font-semibold text-xs block text-center
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                ${plan.popular 
                  ? 'bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40' 
                  : 'bg-secondary text-secondary-foreground border border-border hover:bg-gradient-to-r hover:from-[#5e6ad2] hover:via-[#a855f7] hover:to-[#ec4899] hover:text-white hover:border-transparent'
                }
              `}
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
