type IconProps = {
  name?: string;
  className?: string;
};

export function Icon({ name = "leaf", className = "" }: IconProps) {
  const common = {
    className: `icon-line ${className}`,
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };

  if (name === "shield") {
    return (
      <svg {...common}><path d="M12 3l7 3v5c0 4.5-2.9 8.5-7 10-4.1-1.5-7-5.5-7-10V6l7-3z"/><path d="M8.5 12l2.2 2.2 4.8-5"/></svg>
    );
  }
  if (name === "box") {
    return (
      <svg {...common}><path d="M3 7.5L12 3l9 4.5-9 4.5L3 7.5z"/><path d="M3 7.5v9l9 4.5 9-4.5v-9"/><path d="M12 12v9"/></svg>
    );
  }
  if (name === "truck") {
    return (
      <svg {...common}><path d="M3 7h11v8H3z"/><path d="M14 10h3l4 4v1h-7z"/><path d="M7 18a2 2 0 100-4 2 2 0 000 4z"/><path d="M18 18a2 2 0 100-4 2 2 0 000 4z"/></svg>
    );
  }
  if (name === "check") {
    return <svg {...common}><path d="M20 6L9 17l-5-5"/></svg>;
  }
  if (name === "phone") return <svg {...common}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006.4 6.4l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg>;
  if (name === "mail") return <svg {...common}><path d="M4 4h16v16H4z"/><path d="M4 7l8 6 8-6"/></svg>;
  if (name === "pin") return <svg {...common}><path d="M12 21s7-5.2 7-12a7 7 0 10-14 0c0 6.8 7 12 7 12z"/><path d="M12 11a2 2 0 100-4 2 2 0 000 4z"/></svg>;
  return (
    <svg {...common}><path d="M12 21V11"/><path d="M7 12c-3-1-4-4-3-8 4 0 7 2 8 6"/><path d="M12 13c1-5 4-8 9-8 0 5-3 8-9 8z"/></svg>
  );
}
