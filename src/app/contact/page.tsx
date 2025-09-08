import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Sana Go',
  description: 'Get in touch with Sana Go via the form or WhatsApp. Our location and contact information.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}