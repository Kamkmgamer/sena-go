import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | SalaGo',
  description: "Learn about SalaGo's story, mission, vision and team led by founder Reem.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}