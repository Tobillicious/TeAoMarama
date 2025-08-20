import React from 'react'

const Footer: React.FC = () => (
  <footer className="mt-auto py-6 px-4 border-t border-brand-muted/20 bg-brand-surface/50">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-brand-muted">
        <div className="flex items-center space-x-1">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-medium text-brand-text">Te Ao Mārama</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>Built with</span>
          <span className="text-red-500">♥</span>
          <span>for Mangakōtukutuku College</span>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
