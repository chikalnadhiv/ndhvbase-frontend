'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Code2, Cpu, Sparkles } from 'lucide-react';
import { useContact } from '@/components/contact-provider';
import Link from 'next/link';

const snippets = [
  {
    filename: 'component.tsx',
    content: (
      <>
        <div className="flex">
          <span className="text-pink-500/80">export</span>
          <span className="text-blue-400/80 ml-2">default</span>
          <span className="text-purple-400/80 ml-2">function</span>
          <span className="text-yellow-300/80 ml-2">Future</span>() {'{'}
        </div>
        <div className="pl-4">
          <span className="text-purple-400/80">return</span> (
        </div>
        <div className="pl-8">
          <span className="text-blue-300/80">&lt;div</span>
          <span className="text-green-300/80 ml-2">className</span>=
          <span className="text-orange-300/80">"next-gen"</span>&gt;
        </div>
        <div className="pl-12">
          <span className="text-blue-300/80">&lt;Experience</span>
          <span className="text-green-300/80 ml-2">quality</span>=
          <span className="text-blue-400/80">{'{'}100{'}'}</span> /&gt;
        </div>
        <div className="pl-8">
          <span className="text-blue-300/80">&lt;/div&gt;</span>
        </div>
        <div className="pl-4">);</div>
        <div>{'}'}</div>
      </>
    )
  },
  {
    filename: 'config.ts',
    content: (
      <>
        <div className="flex">
          <span className="text-pink-500/80">export</span>
          <span className="text-pink-500/80 ml-2">const</span>
          <span className="text-blue-400/80 ml-2">config</span> = {'{'}
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">theme</span>: <span className="text-orange-300/80">"dark"</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">version</span>: <span className="text-blue-400/80">2.0</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">features</span>: [
          <span className="text-orange-300/80">"speed"</span>, 
          <span className="text-orange-300/80">"scale"</span>]
        </div>
        <div>{'}'};</div>
      </>
    )
  },
  {
    filename: 'api.ts',
    content: (
      <>
        <div className="flex">
          <span className="text-pink-500/80">async</span>
          <span className="text-purple-400/80 ml-2">function</span>
          <span className="text-yellow-300/80 ml-2">bootstrap</span>() {'{'}
        </div>
        <div className="pl-4">
          <span className="text-pink-500/80">const</span>
          <span className="text-blue-400/80 ml-2">data</span> = 
          <span className="text-purple-400/80 ml-2">await</span> fetch(
        </div>
        <div className="pl-8">
          <span className="text-orange-300/80">"/api/growth"</span>
        </div>
        <div className="pl-4">);</div>
        <div className="pl-4">
          <span className="text-purple-400/80">return</span> data.
          <span className="text-yellow-300/80">json</span>();
        </div>
        <div>{'}'}</div>
      </>
    )
  },
  {
    filename: 'styles.css',
    content: (
      <>
        <div className="flex">
          <span className="text-yellow-300/80">.hero-section</span> {'{'}
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">display</span>: <span className="text-orange-300/80">flex</span>;
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">align-items</span>: <span className="text-orange-300/80">center</span>;
        </div>
        <div className="pl-4">
          <span className="text-blue-300/80">backdrop-filter</span>: <span className="text-orange-300/80">blur(10px)</span>;
        </div>
        <div>{'}'}</div>
      </>
    )
  }
];

const CodeSnippet = ({ className, delay = 0, snippet }: { className?: string; delay?: number; snippet: typeof snippets[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    className={`absolute font-mono text-xs leading-relaxed p-4 rounded-xl bg-card/90 border border-border backdrop-blur-sm shadow-2xl select-none pointer-events-none ${className}`}
  >
    <div className="flex items-center gap-2 mb-3 border-b border-border pb-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
      </div>
      <span className="text-muted-foreground/50 text-[10px]">{snippet.filename}</span>
    </div>
    <div className="space-y-1 opacity-80">
      {snippet.content}
    </div>
  </motion.div>
);

const FloatingIcon = ({ icon: Icon, className, delay = 0 }: { icon: any; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute p-3 rounded-2xl bg-card/50 border border-border backdrop-blur-md shadow-xl ${className}`}
  >
    <Icon className="w-6 h-6 text-primary/60" />
  </motion.div>
);

export function Hero() {
  const { openContact } = useContact();

  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-20 sm:pb-0 -mt-16 sm:-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

        {/* Glowing Orb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
        />

        {/* Floating Code Snippets - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden pointer-events-none">
           <CodeSnippet className="top-[20%] -left-10 rotate-6 scale-90 opacity-40" delay={0.2} snippet={snippets[0]} />
           <CodeSnippet className="top-[60%] left-10 -rotate-3 scale-75 opacity-30" delay={0.4} snippet={snippets[1]} />
        </div>

        {/* Floating Code Snippets - Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden pointer-events-none">
           <CodeSnippet className="top-[30%] -right-10 -rotate-6 scale-90 opacity-40" delay={0.3} snippet={snippets[2]} />
           <CodeSnippet className="top-[70%] right-10 rotate-3 scale-75 opacity-30" delay={0.5} snippet={snippets[3]} />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingIcon icon={Terminal} className="top-[15%] left-[20%] rotate-[-10deg]" delay={0.6} />
            <FloatingIcon icon={Code2} className="bottom-[20%] right-[20%] rotate-[10deg]" delay={0.7} />
            <FloatingIcon icon={Cpu} className="top-[25%] right-[15%] rotate-[-5deg]" delay={0.8} />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-secondary border border-border text-xs sm:text-sm font-medium text-primary mb-6 sm:mb-8 backdrop-blur-sm hover:bg-secondary/80 transition-colors cursor-default"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Elevate your digital presence</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
              Crafting Digital
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899]">
              Experiences
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
            ndhvbase specializes in building high-performance websites and applications
            that drive growth. We blend cutting-edge technology with premium design.
          </p>

          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex-1 sm:flex-initial"
            >
              <Button 
                size="lg" 
                className="group/cta relative h-12 sm:h-14 px-4 sm:px-10 text-xs sm:text-base rounded-full overflow-hidden border-0 shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105 w-full sm:w-auto"
                onClick={() => openContact()}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5e6ad2] via-[#a855f7] to-[#ec4899]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#5e6ad2] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-white font-semibold whitespace-nowrap">
                  Start <span className="hidden sm:inline">your</span> project
                  <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover/cta:translate-x-1" />
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000" />
                </div>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex-1 sm:flex-initial"
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="group/secondary relative h-12 sm:h-14 px-4 sm:px-10 text-xs sm:text-base rounded-full border-2 border-foreground/30 bg-background/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#5e6ad2] hover:via-[#a855f7] hover:to-[#ec4899] hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto" 
                asChild
              >
                <Link href="#projects" className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="font-semibold whitespace-nowrap"><span className="hidden sm:inline">View</span> our work</span>
                  <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full border-2 border-current flex items-center justify-center transition-transform group-hover/secondary:rotate-45">
                    <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3" />
                  </div>
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
