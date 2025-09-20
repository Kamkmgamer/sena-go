import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Sana Go',
  description: "Learn about Sana Go's story, mission, vision and team led by founder Reem.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}