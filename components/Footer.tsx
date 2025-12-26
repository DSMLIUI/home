import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-dark-gray mt-24 bg-rich-black">
      <div className="container mx-auto px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-mono font-medium text-off-white mb-4 uppercase tracking-wider">About</h3>
            <div className="space-y-2">
              <a href="/people" className="block text-sm text-mid-gray hover:text-off-white transition-colors font-mono">Meet our Board</a>
              <a href="https://forms.gle/MRg5a7RArwJVCNcu5" target="_blank" rel="noopener noreferrer" className="block text-sm text-mid-gray hover:text-off-white transition-colors font-mono">Join Us</a>
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex flex-col items-center justify-center">
            <img src="logo.svg" alt="DSML IUI" className="w-20 h-20 mb-3" />
            <p className="text-xs text-mid-gray font-mono text-center">Made by the DSML IUI Board</p>
          </div>

          {/* Contact Section */}
          <div className="md:text-right">
            <h3 className="text-sm font-mono font-medium text-off-white mb-4 uppercase tracking-wider">Contact</h3>
            <div className="space-y-3 flex flex-col md:items-end">
              <a href="https://github.com/DSMLIUI" target="_blank" rel="noopener noreferrer" className="text-sm text-mid-gray hover:text-off-white transition-colors font-mono">GitHub</a>
              <a href="https://www.youtube.com/@DSMLIUI/videos" target="_blank" rel="noopener noreferrer" className="text-sm text-mid-gray hover:text-off-white transition-colors font-mono">YouTube</a>
              <a href="https://www.instagram.com/dsmliui/" target="_blank" rel="noopener noreferrer" className="text-sm text-mid-gray hover:text-off-white transition-colors font-mono">Instagram</a>
              <a href="https://www.linkedin.com/company/dsmliui/" target="_blank" rel="noopener noreferrer" className="text-sm text-mid-gray hover:text-off-white transition-colors font-mono">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
