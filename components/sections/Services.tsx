'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBackground } from '@/components/ui/code-background';
import { useContact } from '@/components/contact-provider';

const services = [
  {
    title: 'Web Development',
    description: 'High-performance websites built with Next.js and modern technologies.',
    image: '/assets/web-dev.png',
    message: "Hi, I'm interested in Web Development services. I'd like to discuss building a high-performance website."
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and beautiful interfaces that users love to interact with.',
    image: '/assets/ui-ux.png',
    message: "Hi, I'm interested in UI/UX Design services. I'd like to discuss creating beautiful interfaces for my project."
  },
  {
    title: 'Consulting',
    description: 'Expert advice on technical strategy and digital transformation.',
    image: '/assets/consulting.png',
    message: "Hi, I'm interested in Consulting services. I'd like to get expert advice on my technical strategy."
  },
];

const snippets = [
  {
    filename: 'service.ts',
    content: (
      <>
        <div className="flex">
          <span className="text-pink-500/80">interface</span>
          <span className="text-yellow-300/80 ml-2">Service</span> {'{'}
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">id</span>: <span className="text-green-300/80">string</span>;
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">deploy</span>: () <span className="text-pink-500/80">=&gt;</span> <span className="text-green-300/80">void</span>;
        </div>
        <div>{'}'}</div>
      </>
    )
  },
  {
    filename: 'deploy.sh',
    content: (
      <>
        <div className="flex">
          <span className="text-gray-500/80"># Production Build</span>
        </div>
        <div className="flex">
          <span className="text-yellow-300/80">npm</span>
          <span className="text-blue-300/80 ml-2">run</span>
          <span className="text-green-300/80 ml-2">build</span>
        </div>
        <div className="flex">
          <span className="text-yellow-300/80">docker</span>
          <span className="text-blue-300/80 ml-2">push</span>
          <span className="text-green-300/80 ml-2">latest</span>
        </div>
      </>
    )
  },
  {
    filename: 'analytics.py',
    content: (
      <>
        <div className="flex">
          <span className="text-pink-500/80">def</span>
          <span className="text-yellow-300/80 ml-2">track_growth</span>(data):
        </div>
        <div className="pl-4">
          <span className="text-purple-400/80">return</span> data.
          <span className="text-blue-300/80">analyze</span>()
        </div>
      </>
    )
  },
  {
    filename: 'design.css',
    content: (
      <>
        <div className="flex">
          <span className="text-yellow-300/80">.interface</span> {'{'}
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">beauty</span>: <span className="text-orange-300/80">100%</span>;
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">user-love</span>: <span className="text-orange-300/80">true</span>;
        </div>
        <div>{'}'}</div>
      </>
    )
  }
];

export function Services() {
  const { openContact } = useContact();

  return (
    <section id="services" className="min-h-[100svh] flex flex-col justify-center items-center py-24 relative overflow-hidden">
      <CodeBackground snippets={snippets} />
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600 animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Our Services</span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
              What We
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899]">
              Offer
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We provide comprehensive solutions to help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openContact(service.message)}
              className="cursor-pointer"
            >
              <div className="group relative h-full">
                {/* Subtle gradient border - visible but not overwhelming */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899] rounded-[24px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <Card className="relative h-full bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl border border-border/50 hover:border-transparent transition-all duration-500 overflow-hidden rounded-3xl shadow-lg hover:shadow-xl hover:shadow-primary/5">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10">
                    {/* Image container with better styling */}
                    <div className="relative h-52 w-full mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 w-full h-full p-6">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-2xl"
                        />
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent blur-2xl" />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="leading-relaxed text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  
                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
