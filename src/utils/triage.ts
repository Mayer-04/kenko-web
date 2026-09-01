export interface TriageLevel {
  level: string;
  title: string;
  subtitle: string;
  symptoms: string[];
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
    .replace(/\n+/g, " ")
    .trim();

const getTriageSection = (markdown: string): string => {
  const lines = markdown.split(/\r?\n/);
  const startIndex = lines.findIndex((line) =>
    /^##\s*Triage\s*$/i.test(line.trim()),
  );

  if (startIndex === -1) {
    return "";
  }

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex && /^##\s*Preguntas frecuentes\s*$/i.test(line.trim()),
  );

  return lines
    .slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex)
    .join("\n")
    .trim();
};

export function getTriageIntro(markdown: string): string {
  const triageSection = getTriageSection(markdown);

  if (!triageSection) {
    return "";
  }

  const introBlock = triageSection
    .split(/^###\s*Triage\s+\d+/im)[0]
    .replace(/^\*\*¿Qué es el triage\?\*\*\s*/i, "")
    .replace(/^\*La clasificación se realiza de la siguiente manera:\*\s*/i, "")
    .trim();

  return normalizeWhitespace(stripMarkdownFormatting(introBlock));
}

export function parseTriageDefinitions(markdown: string): TriageLevel[] {
  const triageSection = getTriageSection(markdown);

  if (!triageSection) {
    return [];
  }

  const lines = triageSection.split(/\r?\n/);
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

    for (const line of block.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || /^###\s*Triage\s+\d+:/i.test(trimmed)) {
        continue;
      }

      if (/^[_*]*Tiempo de espera:[_*]*\s*$/i.test(trimmed)) {
        collectingSubtitle = true;
        collectingSymptoms = false;
        continue;
      }

      if (/^[_*]*Síntomas?[_*]*\s*$/i.test(trimmed)) {
        collectingSubtitle = false;
        collectingSymptoms = true;
        continue;
      }

      if (collectingSubtitle) {
        if (!trimmed) {
          continue;
        }

        subtitleLines.push(trimmed);
        continue;
      }

      if (collectingSymptoms) {
        const bulletMatch = trimmed.match(/^[-*]\s*(.+)$/);

        if (bulletMatch) {
          const symptom = normalizeWhitespace(
            stripMarkdownFormatting(bulletMatch[1]),
          );

          if (symptom) {
            symptoms.push(symptom);
          }
        }
      }
    }

    const subtitle = normalizeWhitespace(
      stripMarkdownFormatting(subtitleLines.join("\n")),
    );

    levels.push({
      level: currentLevel,
      title: `Triage ${currentLevel}: ${currentTitle}`,
      subtitle,
      symptoms,
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^###\s*Triage\s+(\d+):\s*(.+?)\s*$/i);

    if (headingMatch) {
      flushCurrent();
      currentLevel = headingMatch[1];
      currentTitle = headingMatch[2].trim();
      current = [line];
      continue;
    }

    if (currentLevel) {
      current.push(line);
    }
  }

  flushCurrent();

  return levels;
}
