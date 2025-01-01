import React from 'react';
import { Anchor } from 'lucide-react';

export function FeaturedPosts() {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-xl text-navy">Captain's Pick</h3>
          <Anchor className="h-5 w-5 text-seafoam" />
        </div>
        <div className="mt-4">
          <img
            src="https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2"
            alt="Ocean sunset"
            className="w-full h-48 object-cover rounded-md"
          />
          <h4 className="mt-4 font-serif text-lg">Tales from the Southern Seas</h4>
          <p className="mt-2 text-gray-600 text-sm">
            Join us on an adventure through the pristine waters of the Pacific...
          </p>
        </div>
      </article>
    </section>
  );
}