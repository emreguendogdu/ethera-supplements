import { SplitText } from "gsap/SplitText";

export const splitTextElements = (
  selector: string,
  type = "words,chars",
  addFirstChar = false
) => {
  if (typeof document === "undefined") return;
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const splitText = new SplitText(element, {
      type,
      wordsClass: "word",
      charsClass: "char",
    });

    if (type.includes("chars")) {
      splitText.chars.forEach((char, index) => {
        const originalText = char.textContent;
        char.innerHTML = `<span>${originalText}</span>`;

        if (addFirstChar && index === 0) {
          char.classList.add("first-char");
        }
      });
    }
  });
};
