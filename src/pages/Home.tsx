import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <h2 className="mb-6">Featured resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Unit plan: Kaitiakitanga" description="A two-week unit on environmental guardianship." />
          <Card title="Lesson: Graphing in Context" description="Bar graphs, first principles, scaffolded tasks." />
          <Card title="Do Now: Quick comprehension" description="Five minute reading starters." />
        </div>
      </section>
    </main>
  );
};

export default Home;
