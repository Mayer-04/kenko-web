import { describe, expect, it } from "vitest";

import { parseFaqSections } from "../../src/utils/faq";

describe("faq parser", () => {
  const markdown = `## Preguntas frecuentes

### Preguntas frecuentes régimen subsidiado

**¿Cuál es el requisito?**

- Uno.
- Dos.

**¿Qué sigue?**

Sí, se puede.

### Preguntas frecuentes Atención al ciudadano

**¿Dónde puedo reclamar?**

Línea 123.`;

  const sections = parseFaqSections(markdown);

  it("extrae las secciones con sus títulos", () => {
    expect(sections).toHaveLength(2);
    expect(sections[0]?.title).toBe("Preguntas frecuentes régimen subsidiado");
  });

  it("extrae las preguntas y respuestas de cada sección", () => {
    expect(sections[0]?.questions[0]?.question).toBe("¿Cuál es el requisito?");
    expect(sections[0]?.questions[0]?.answer).toContain("Uno.");
    expect(sections[0]?.questions[1]?.question).toBe("¿Qué sigue?");
    expect(sections[0]?.questions[1]?.answer).toContain("Sí, se puede.");
    expect(sections[1]?.questions[0]?.question).toBe("¿Dónde puedo reclamar?");
  });
});
