import React from "react";

const Footer: React.FC = () => (
  <footer className="py-8 mt-12 text-surface" style={{backgroundColor: 'var(--color-dark)'}}>
    <div className="max-w-[1280px] mx-auto px-6 text-sm text-muted">
      <div className="flex justify-between">
        <div>© {new Date().getFullYear()} Te Ao Mārama</div>
        <div>Built with ♥ for Mangakōtukutuku College</div>
      </div>
    </div>
  </footer>
);

export default Footer;
