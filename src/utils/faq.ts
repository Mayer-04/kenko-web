export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  questions: FaqQuestion[];
}

const normalizeWhitespace = (value: string): string =>
  value
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const stripMarkdownFormatting = (value: string): string =>
  value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .trim();

const cleanAnswer = (value: string): string =>
  value
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-*]\s*/, "- ").trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export function parseFaqSections(markdown: string): FaqSection[] {
  const faqStartIndex = markdown.search(/^##\s*Preguntas frecuentes\s*$/m);
  const content =
    faqStartIndex === -1 ? markdown : markdown.slice(faqStartIndex);
  const lines = content.split(/\r?\n/);

  const sections: FaqSection[] = [];
  let currentSectionTitle = "";
  let currentQuestions: FaqQuestion[] = [];
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  const flushQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    const answer = cleanAnswer(
      stripMarkdownFormatting(currentAnswer.join("\n")),
    );

    if (answer) {
      currentQuestions.push({
        question: normalizeWhitespace(currentQuestion),
        answer,
      });
    }

    currentQuestion = "";
    currentAnswer = [];
  };

  const flushSection = () => {
    if (!currentSectionTitle || currentQuestions.length === 0) {
      return;
    }

    sections.push({
      title: normalizeWhitespace(currentSectionTitle),
      questions: currentQuestions,
    });

    currentSectionTitle = "";
    currentQuestions = [];
  };

  for (const line of lines) {
    const sectionHeadingMatch = line.match(/^###\s+(.+?)\s*$/);
    if (sectionHeadingMatch) {
      flushQuestion();
      flushSection();
      currentSectionTitle = sectionHeadingMatch[1].trim();
      continue;
    }

    if (/^##\s*Preguntas frecuentes\s*$/i.test(line.trim())) {
      continue;
    }

    const questionMatch = line.match(/^\*\*(.+?)\*\*\s*$/);

    if (questionMatch) {
      flushQuestion();
      currentQuestion = questionMatch[1].trim();
      continue;
    }

    if (currentQuestion) {
      currentAnswer.push(line);
    }
  }

  flushQuestion();
  flushSection();

  return sections.filter((section) => section.questions.length > 0);
}
