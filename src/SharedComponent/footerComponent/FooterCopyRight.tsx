export function FooterCopyright() {
  return (
    <div className="px-4 md:px-16 py-8 border-t border-white/10 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
      {/* Dynamic Legal Statement */}
      <div className="text-white/50 text-base text-center md:text-left">
        © {new Date().getFullYear()} STRIDE STYLE. Crafted for relaxed
        exclusivity.
      </div>
    </div>
  );
}
