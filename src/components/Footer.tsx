export default function Footer() {
  return (
    <footer className="relative z-10 py-[70px] px-[6vw] pb-[40px] border-t border-[var(--line)] flex justify-between flex-wrap gap-[30px] text-[13px] text-[var(--muted)]">
      <div>
        <div className="font-[var(--font-display)] font-bold text-[var(--ink)] text-[16px]">Quantyro Technologies</div>
        <div className="mt-[8px]">Engineering the future, one idea at a time.</div>
      </div>
      <div className="flex gap-[20px]">
        <a href="/services" className="hover:text-[var(--ink)] transition-colors">Services</a>
        <a href="/work" className="hover:text-[var(--ink)] transition-colors">Work</a>
        <a href="/about" className="hover:text-[var(--ink)] transition-colors">About</a>
        <a href="/contact" className="hover:text-[var(--ink)] transition-colors">Contact</a>
      </div>
      <div>hello@quantyro.studio</div>
      <div>© 2026 Quantyro Technologies. All rights reserved.</div>
    </footer>
  );
}
