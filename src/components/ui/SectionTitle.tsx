type Props = {
  eyebrow?: string;
  title: string;
  center?: boolean;
};

export function SectionTitle({ eyebrow, title, center = false }: Props) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <div className={`section-title ${center ? "section-title-center" : ""}`}>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{words.join(" ")} <strong>{last}</strong></h2>
    </div>
  );
}
