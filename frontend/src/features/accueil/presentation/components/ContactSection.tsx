export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-[var(--lga-bg)] px-8 py-24">
      <div className="mx-auto flex max-w-[1216px] flex-col items-center gap-12">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://www.lorenzogarvin.eu/assets/lgalogo.png"
            alt="LGA — Lorenzo Garvin"
            className="my-2 h-70 w-auto object-contain"
          />
        </div>

        <div className="flex flex-col items-center">
          <a
            href="mailto:jj@lorenzogarvin.eu"
            className="text-[20px] leading-7 text-[var(--lga-ink)] transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            jj@lorenzogarvin.eu
          </a>
          <a
            href="https://www.lorenzogarvin.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[20px] leading-7 text-[var(--lga-ink)] transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            www.lorenzogarvin.eu
          </a>
        </div>
      </div>
    </section>
  );
}
