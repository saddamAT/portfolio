export default function AntigravityLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google Antigravity Logo"
    >
      {/* Left facet - Google Blue */}
      <path
        d="M12 2.5L3.5 19.5H8.2L12 11.5L15.8 19.5H20.5L12 2.5Z"
        fill="#4285F4"
      />
      {/* Top Apex facet - Google Red */}
      <path
        d="M12 2.5L7.8 11.2L12 15L16.2 11.2L12 2.5Z"
        fill="#EA4335"
      />
      {/* Right facet - Google Yellow */}
      <path
        d="M12 11.5L15.8 19.5H20.5L12 2.5V11.5Z"
        fill="#FBBC05"
      />
      {/* Bottom Crossbar / Cyan Green facet */}
      <path
        d="M6.5 15.5H17.5L15.8 19.5H8.2L6.5 15.5Z"
        fill="#34A853"
      />
      {/* Center inner light fold */}
      <path
        d="M12 7L9.5 13H14.5L12 7Z"
        fill="#24C1E0"
        opacity="0.9"
      />
    </svg>
  );
}
