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
    .replaceAll("\r", "")
    .replaceAll("\u00A0", " ")
    .replaceAll(/\s+/gu, " ")
    .trim();

const stripMarkdownFormatting = (value: string): string =>
  value
    .replaceAll(/\*\*(?<bold>.*?)\*\*/gu, "$<bold>")
    .replaceAll(/\*(?<italic>.*?)\*/gu, "$<italic>")
    .replaceAll(/_(?<underline>.*?)_/gu, "$<underline>")
    .replaceAll(/`(?<code>.*?)`/gu, "$<code>")
    .replaceAll(/\[(?<text>.*?)\]\((?<url>.*?)\)/gu, "$<text>")
    .trim();

const cleanAnswer = (value: string): string =>
  value
    .split(/\r?\n/u)
    .map((line) => line.replace(/^\s*[-*]\s*/u, "- ").trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .replaceAll(/\n{3,}/gu, "\n\n")
    .trim();

type FaqLineAction =
  | { kind: "answer"; text: string }
  | { kind: "question"; question: string }
  | { kind: "section"; title: string }
  | { kind: "skip" };

const classifyFaqLine = (line: string): FaqLineAction => {
  const sectionHeadingMatch = line.match(/^###\s+(?<title>.+?)\s*$/u);

  if (sectionHeadingMatch) {
    const { title = "" } = sectionHeadingMatch.groups ?? {};
    return { kind: "section", title: title.trim() };
  }

  if (/^##\s*Preguntas frecuentes\s*$/iu.test(line.trim())) {
    return { kind: "skip" };
  }

  const questionMatch = line.match(/^\*\*(?<question>.+?)\*\*\s*$/u);

  if (questionMatch) {
    const { question = "" } = questionMatch.groups ?? {};
    return { kind: "question", question: question.trim() };
  }

  return { kind: "answer", text: line };
};

export const parseFaqSections = (markdown: string): FaqSection[] => {
  const faqStartIndex = markdown.search(/^##\s*Preguntas frecuentes\s*$/mu);
  const content =
    faqStartIndex === -1 ? markdown : markdown.slice(faqStartIndex);
  const lines = content.split(/\r?\n/u);

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
      stripMarkdownFormatting(currentAnswer.join("\n"))
    );

    if (answer) {
      currentQuestions.push({
        answer,
        question: normalizeWhitespace(currentQuestion),
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
      questions: currentQuestions,
      title: normalizeWhitespace(currentSectionTitle),
    });

    currentSectionTitle = "";
    currentQuestions = [];
  };

  for (const line of lines) {
    const action = classifyFaqLine(line);

    if (action.kind === "section") {
      flushQuestion();
      flushSection();
      currentSectionTitle = action.title;
    } else if (action.kind === "question") {
      flushQuestion();
      currentQuestion = action.question;
    } else if (action.kind === "answer" && currentQuestion) {
      currentAnswer.push(action.text);
    }
  }

  flushQuestion();
  flushSection();

  return sections.filter((section) => section.questions.length > 0);
};
