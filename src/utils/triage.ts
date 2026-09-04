export interface TriageLevel {
  level: string;
  title: string;
  subtitle: string;
  symptoms: string[];
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
    .replaceAll(/\n+/gu, " ")
    .trim();

const getTriageSection = (markdown: string): string => {
  const lines = markdown.split(/\r?\n/u);
  const startIndex = lines.findIndex((line) =>
    /^##\s*Triage\s*$/iu.test(line.trim())
  );

  if (startIndex === -1) {
    return "";
  }

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex && /^##\s*Preguntas frecuentes\s*$/iu.test(line.trim())
  );

  return lines
    .slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex)
    .join("\n")
    .trim();
};

export const getTriageIntro = (markdown: string): string => {
  const triageSection = getTriageSection(markdown);

  if (!triageSection) {
    return "";
  }

  const introBlock = triageSection
    .split(/^###\s*Triage\s+\d+/imu)[0]
    .replace(/^\*\*¿Qué es el triage\?\*\*\s*/iu, "")
    .replace(
      /^\*La clasificación se realiza de la siguiente manera:\*\s*/iu,
      ""
    )
    .trim();

  return normalizeWhitespace(stripMarkdownFormatting(introBlock));
};

type TriageLineAction =
  | { kind: "content"; text: string }
  | { kind: "subtitle-header" }
  | { kind: "symptoms-header" }
  | { kind: "skip" };

const classifyTriageLine = (trimmed: string): TriageLineAction => {
  if (!trimmed || /^###\s*Triage\s+\d+:/iu.test(trimmed)) {
    return { kind: "skip" };
  }

  if (/^[_*]*Tiempo de espera:[_*]*\s*$/iu.test(trimmed)) {
    return { kind: "subtitle-header" };
  }

  if (/^[_*]*Síntomas?[_*]*\s*$/iu.test(trimmed)) {
    return { kind: "symptoms-header" };
  }

  return { kind: "content", text: trimmed };
};

const parseSymptomLine = (trimmed: string): string | null => {
  const bulletMatch = trimmed.match(/^[-*]\s*(?<content>.+)$/iu);

  if (!bulletMatch) {
    return null;
  }

  const { content = "" } = bulletMatch.groups ?? {};
  const symptom = normalizeWhitespace(stripMarkdownFormatting(content));

  return symptom === "" ? null : symptom;
};

export const parseTriageDefinitions = (markdown: string): TriageLevel[] => {
  const triageSection = getTriageSection(markdown);

  if (!triageSection) {
    return [];
  }

  const lines = triageSection.split(/\r?\n/u);
  const levels: TriageLevel[] = [];
  let current: string[] = [];
  let currentLevel = "";
  let currentTitle = "";

  const flushCurrent = () => {
    if (!current.length || !currentLevel) {
      return;
    }

    const block = current.join("\n");
    const subtitleLines: string[] = [];
    const symptoms: string[] = [];
    let collectingSubtitle = false;
    let collectingSymptoms = false;

    for (const line of block.split(/\r?\n/u)) {
      const action = classifyTriageLine(line.trim());

      if (action.kind === "subtitle-header") {
        collectingSubtitle = true;
        collectingSymptoms = false;
      } else if (action.kind === "symptoms-header") {
        collectingSubtitle = false;
        collectingSymptoms = true;
      } else if (action.kind === "content") {
        if (collectingSubtitle) {
          subtitleLines.push(action.text);
        } else if (collectingSymptoms) {
          const symptom = parseSymptomLine(action.text);

          if (symptom) {
            symptoms.push(symptom);
          }
        }
      }
    }

    const subtitle = normalizeWhitespace(
      stripMarkdownFormatting(subtitleLines.join("\n"))
    );

    levels.push({
      level: currentLevel,
      subtitle,
      symptoms,
      title: `Triage ${currentLevel}: ${currentTitle}`,
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(
      /^###\s*Triage\s+(?<level>\d+):\s*(?<title>.+?)\s*$/iu
    );

    if (headingMatch) {
      flushCurrent();
      const { level = "", title = "" } = headingMatch.groups ?? {};
      currentLevel = level;
      currentTitle = title.trim();
      current = [line];
      continue;
    }

    if (currentLevel) {
      current.push(line);
    }
  }

  flushCurrent();

  return levels;
};
