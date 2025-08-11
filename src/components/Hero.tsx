import React from "react";
import Button from "./Button";

const Hero: React.FC = () => (
  <header className="min-h-screen flex items-center">
    <div className="max-w-[960px] mx-auto py-12 px-6">
      <div className="bg-surface rounded-md p-10 shadow-md">
        <h1 className="mb-4">Te Ao Mārama — A teaching resource home</h1>
        <p className="lead mb-6">A calm, consistent place for lessons, unit plans, handouts and interactive resources. Built to scale — beautifully.</p>
        <div className="flex gap-3">
          <Button>Browse Resources</Button>
          <Button variant="muted">Style guide</Button>
        </div>
      </div>
    </div>
  </header>
);

export default Hero;
