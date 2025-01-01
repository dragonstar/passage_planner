import React from 'react';
import { FeaturedPosts } from './FeaturedPosts';

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-6xl text-navy">
          Welcome to Passage Planner
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Chart your course through a sea of stories. Share your adventures, discover new horizons, and join our community of maritime storytellers.
        </p>
      </section>

      <FeaturedPosts />
    </div>
  );
}