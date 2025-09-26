import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST() {
  if (!process.env.STRIPE_PRICE_ID_MONTHLY) {
    return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID_MONTHLY' }, { status: 500 });
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID_MONTHLY, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=true`,
  });
  return NextResponse.json({ url: session.url });
}

