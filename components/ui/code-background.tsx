'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CodeSnippetProps {
  filename: string;
  content: ReactNode;
}

interface CodeBackgroundProps {
  snippets: CodeSnippetProps[];
}

const CodeSnippet = ({ className, delay = 0, snippet }: { className?: string; delay?: number; snippet: CodeSnippetProps }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    className={`absolute font-mono text-xs leading-relaxed p-4 rounded-xl bg-card/40 border border-border backdrop-blur-sm shadow-2xl select-none pointer-events-none ${className}`}
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

export function CodeBackground({ snippets }: CodeBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

      {/* Glowing Orb */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Floating Code Snippets - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden pointer-events-none">
         {snippets[0] && <CodeSnippet className="top-[10%] -left-10 rotate-6 scale-90 opacity-40" delay={0.2} snippet={snippets[0]} />}
         {snippets[1] && <CodeSnippet className="top-[50%] left-10 -rotate-3 scale-75 opacity-30" delay={0.4} snippet={snippets[1]} />}
      </div>

      {/* Floating Code Snippets - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden pointer-events-none">
         {snippets[2] && <CodeSnippet className="top-[20%] -right-10 -rotate-6 scale-90 opacity-40" delay={0.3} snippet={snippets[2]} />}
         {snippets[3] && <CodeSnippet className="top-[60%] right-10 rotate-3 scale-75 opacity-30" delay={0.5} snippet={snippets[3]} />}
      </div>
    </div>
  );
}
