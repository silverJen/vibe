export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <a href="/" className="text-xl font-semibold text-primary hover-elevate rounded-lg px-3 py-1.5 transition-colors" data-testid="link-home">
          vibe writing
        </a>
      </div>
    </header>
  );
}
