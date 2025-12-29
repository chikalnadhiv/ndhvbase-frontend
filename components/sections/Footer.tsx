'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Facebook, LucideIcon, icons } from 'lucide-react';

interface SocialLink {
  id: number;
  name: string;
  icon: string;
  url: string;
}

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/social-links')
      .then(res => res.json())
      .then(data => setSocialLinks(data))
      .catch(err => console.error('Failed to fetch social links:', err));
  }, []);

  return (
    <footer className="relative border-t border-border bg-card/30 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="group">
              <span className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-300 font-anton tracking-wider">
                Ndhvbase
              </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs leading-relaxed">
              Premium website development with modern design and high performance for future-ready businesses.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-center space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Navigation</h4>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              <Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Services</Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Work</Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Pricing</Link>
            </nav>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Follow Us</h4>
            <div className="flex items-center gap-4">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  const Icon = (icons as any)[link.icon] || icons.Link;
                  return (
                    <Link 
                      key={link.id} 
                      href={link.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                      title={link.name}
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform" />
                    </Link>
                  );
                })
              ) : (
                <>
                  <Link href="https://instagram.com" className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary transition-all"><Instagram size={18} /></Link>
                  <Link href="https://facebook.com" className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary transition-all"><Facebook size={18} /></Link>
                  <Link href="https://github.com" className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary transition-all"><Github size={18} /></Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} Ndhvbase Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
