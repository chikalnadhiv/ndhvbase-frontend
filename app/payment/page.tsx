'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function PaymentContent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Custom Plan';
  const price = searchParams.get('price') || 'Contact for pricing';

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <span className="text-sm text-muted-foreground">Back to Pricing</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Complete your purchase</CardTitle>
          <CardDescription className="text-muted-foreground">
            You are subscribing to the <span className="font-semibold text-primary">{planName}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-secondary border border-border flex justify-between items-center">
            <div>
              <p className="font-medium text-foreground">{planName}</p>
              <p className="text-sm text-muted-foreground">Monthly subscription</p>
            </div>
            <div className="text-xl font-bold text-foreground">{price}</div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="card">Card details</Label>
              <div className="relative">
                <Input id="card" placeholder="0000 0000 0000 0000" className="pl-10" />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Pay {price}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
