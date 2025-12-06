import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold text-foreground font-anton tracking-wide">Ndhvbase</span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ndhvbase. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="https://www.instagram.com/chikalarc?igsh=c3NmcWkyc3p3a2lw" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram size={20} />
          </Link>
          <Link href="https://www.facebook.com/share/1aWEKdnJrK/" className="text-muted-foreground hover:text-foreground transition-colors">
            <Facebook size={20} />
          </Link>
          <Link href="https://github.com/chikalnadhiv" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={20} />
          </Link>
          <Link href="https://x.com/nadhiv5?t=AnZSOrVsL7gFQcVV6A19tQ&s=35" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
