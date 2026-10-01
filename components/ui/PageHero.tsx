import { CoordinatesHUD } from "@/components/layout/CoordinatesHUD";
type Props = {
  tag: string;
  title: string;
  italic?: string;
  description?: string;
  align?: "left" | "center";
};
export function PageHero({ tag, title, italic, description, align = "left" }: Props) {
  return (
    <section className={`page-hero page-hero-${align}`}>
      <div className="page-hero-orbits" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="shell">
        <span className="eyebrow">
          <span className="status-dot" /> {tag} / Zawwar Sami
        </span>
        <h1>
          {title}
          {italic && <em>{italic}</em>}
        </h1>
        {description && <p>{description}</p>}
        <div className="page-hero-meta">
          <CoordinatesHUD compact />
          <span className="eyebrow">Anteroom Studio</span>
        </div>
      </div>
    </section>
  );
}
