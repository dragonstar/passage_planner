import React from 'react';

type Props = {
  title: string;
  onTitleChange: (title: string) => void;
};

export function JourneyHeader({ title, onTitleChange }: Props) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Journey Title"
        className="w-full px-4 py-2 text-xl font-serif border-b-2 border-navy/20 bg-transparent focus:border-navy focus:outline-none"
        required
      />
    </div>
  );
}