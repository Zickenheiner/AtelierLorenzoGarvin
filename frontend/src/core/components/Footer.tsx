export default function Footer() {
  return (
    <footer className="w-full bg-[var(--lga-footer)] py-5">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-2 px-8">
        {/* <div className="flex items-center gap-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] leading-[16.5px] tracking-[0.1em] text-[var(--lga-footer-ink)] uppercase transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] leading-[16.5px] tracking-[0.1em] text-[var(--lga-footer-ink)] uppercase transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            LinkedIn
          </a>
        </div> */}
        <p
          className="text-center text-[10px] leading-[16.5px] tracking-[0.1em] text-[var(--lga-footer-ink)]"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          ©2026 lorenzo garvin architecte. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
