export const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vertical lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--grid-color)) 1px, transparent 1px)`,
        backgroundSize: '120px 120px'
      }} />
      
      {/* Horizontal lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to bottom, hsl(var(--grid-color)) 1px, transparent 1px)`,
        backgroundSize: '120px 120px'
      }} />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
    </div>
  );
};
