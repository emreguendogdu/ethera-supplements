import { FlipText } from "./FlipTextOnHover";

const preloaderTexts = [
  "Ethera Supplements",
  "Essentials only.",
  "For maximum growth.",
];

export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-2 bg-background px-8 py-24 text-foreground">
      {preloaderTexts.map((text, index) => (
        <FlipText href="#" index={index + 1} key={index}>
          {text}
        </FlipText>
      ))}
    </section>
  );
};
