import Breadcrumbs from './Breadcrumbs';
import TableOfContents from './TableOfContents';
import ArticleBody, { extractHeadings } from './ArticleBody';
import CtaSection from './CtaSection';

export default function LegalContent({
  title,
  href,
  lastUpdated,
  content,
}: {
  title: string;
  href: string;
  lastUpdated: string;
  content: string;
}) {
  const tocHeadings = extractHeadings(content);

  return (
    <div className="relative min-h-screen">
      <section className="relative px-[6vw] pt-[160px] pb-[50px] z-10">
        <div className="max-w-[860px] mx-auto">
          <Breadcrumbs items={[{ label: title, href }]} />
          <h1 className="text-[clamp(32px,5vw,52px)] font-[var(--font-display)] font-bold leading-[1.05] text-[var(--ink)]">
            {title}
          </h1>
          <p className="mt-[14px] mono text-[12.5px] text-[var(--muted)]">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="max-w-[860px] mx-auto">
          {tocHeadings.length > 0 && <TableOfContents items={tocHeadings} />}
          <ArticleBody content={content} />
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
