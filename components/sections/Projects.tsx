'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  link: string | null;
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative h-full">
      {/* Subtle gradient border - visible but not overwhelming */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] rounded-[20px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <Card className="relative h-full bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl border border-border/50 overflow-hidden rounded-2xl hover:border-transparent transition-all duration-500 flex flex-col shadow-lg hover:shadow-xl hover:shadow-primary/5">
        {/* Image with overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          {project.imageUrl ? (
            <>
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80" />
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-primary/60" />
                </div>
                <span className="text-muted-foreground text-sm">Preview Coming Soon</span>
              </div>
            </div>
          )}
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
        </div>

        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
            {project.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 relative z-10">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors">
            {project.description}
          </p>
        </CardContent>

        <CardFooter className="pt-4 mt-auto relative z-10">
          {project.link ? (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group/btn relative overflow-hidden rounded-xl"
            >
              {/* Button gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              
              {/* Button content */}
              <div className="relative inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold text-sm group-hover/btn:bg-transparent group-hover/btn:text-white group-hover/btn:border-transparent transition-all duration-300">
                <span>View Project</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </div>
            </a>
          ) : (
            <div className="w-full text-center px-5 py-3 rounded-xl bg-muted/50 border border-border/50">
              <span className="text-sm text-muted-foreground">Coming Soon</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Embla Carousel setup with optimized settings
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: false,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      duration: 30, // Slightly longer for smoother transition
      containScroll: 'trimSnaps',
      slidesToScroll: 1, // Scroll one at a time for smoother experience
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

  useEffect(() => {
    // Fetch projects
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects', {
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched projects:', data);
          setProjects(data);
        } else {
          console.error('Failed to fetch projects, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();

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

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const shouldUseCarousel = projects.length > 3;

  return (
    <section id="projects" className="min-h-[100svh] flex flex-col justify-center items-center py-24 relative overflow-hidden dark:bg-black/20 bg-secondary/5">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600 animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Our Portfolio</span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
              Featured
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899]">
              Projects
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Explore some of our recent work and see how we help businesses grow.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-400">
            No projects available yet.
          </div>
        ) : shouldUseCarousel ? (
          // Carousel for more than 3 projects
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative">
              {/* Carousel Container with padding to prevent border clipping */}
              <div className="overflow-hidden px-[2px] py-[2px] -mx-[2px] -my-[2px]" ref={emblaRef}>
                <div className="flex flex-row gap-4 md:gap-6 will-change-transform [backface-visibility:hidden] [transform:translate3d(0,0,0)]">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="flex-[0_0_85%] min-w-0 md:flex-[0_0_85%] lg:flex-[0_0_85%]"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {canScrollPrev && (
                <button
                  onClick={scrollPrev}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-card/80 border border-border items-center justify-center text-foreground hover:bg-card hover:border-primary/50 transition-all duration-300 group shadow-lg cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              )}
              {canScrollNext && (
                <button
                  onClick={scrollNext}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-card/80 border border-border items-center justify-center text-foreground hover:bg-card hover:border-primary/50 transition-all duration-300 group shadow-lg cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-12">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    index === selectedIndex
                      ? 'w-8 bg-gradient-to-r from-primary to-purple-600'
                      : 'w-2 bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Horizontal list for 3 or fewer projects (consistent with user request for horizontal)
          <div 
            className={`flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 md:mx-0 md:px-0 md:gap-6 scrollbar-hide transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              scrollbarWidth: 'none',  /* Firefox */
              msOverflowStyle: 'none'  /* IE and Edge */
            }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id}
                style={{ transitionDelay: `${index * 100}ms` }}
                className="snap-center flex-shrink-0 w-[85vw] md:w-[85vw] lg:w-[85vw]"
              >
                <div className="h-full">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
