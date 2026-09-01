import { describe, expect, it } from "vitest";
import { getTriageIntro, parseTriageDefinitions } from "../../src/utils/triage";

describe("triage data parser", () => {
  it("extrae la introducción y los cinco niveles del contenido markdown", () => {
    const markdown = `## Triage

**¿Qué es el triage?**

Es el nombre que recibe la clasificación dada a los síntomas que puede presentar una persona al ingresar a servicios de urgencias.

*La clasificación se realiza de la siguiente manera:*

### Triage 1: rojo

*Tiempo de espera:*

Emergencia, el paciente requiere atención inmediata.

*Síntomas*

* Dificultad para respirar.
* Pérdida del conocimiento.

### Triage 2: amarillo

*Tiempo de espera:*

Urgencia, alrededor de 15 minutos.

*Síntomas*

* Dolor en el pecho.
* Sangrado abundante.

### Triage 3: verde

*Tiempo de espera:*

Atención prioritaria, alrededor de 45 minutos.

*Síntomas*

* Dolor abdominal.
* Fiebre.

### Triage 4: azul

*Tiempo de espera:*

Consulta al día.

*Síntomas*

* Dolor de oído.
* Resfriado común.

### Triage 5: blanco

*Tiempo de espera:*

Consulta general, el paciente debe ser atendido el mismo día.

*Síntomas*

* Síntomas crónicos.
* Malestar sin fiebre.

## Preguntas frecuentes`;

    const intro = getTriageIntro(markdown);
    const levels = parseTriageDefinitions(markdown);

    expect(intro).toContain("Es el nombre que recibe la clasificación");
    expect(levels).toHaveLength(5);
    expect(levels.map((level) => level.level)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
    expect(levels[0]?.title).toBe("Triage 1: rojo");
    expect(levels[0]?.subtitle).toBe(
      "Emergencia, el paciente requiere atención inmediata.",
    );
    expect(levels[0]?.symptoms).toContain("Dificultad para respirar.");
  });

  it("consume el formato real del markdown de triage con guiones y textos en cursiva", () => {
    const markdown = `## Triage

**¿Qué es el triage?**

Es el nombre que recibe la clasificación ...

_La clasificación se realiza de la siguiente manera:_

### Triage 1: rojo

_Tiempo de espera:_

Emergencia, el paciente requiere atención inmediata.

_Síntomas_

- Dificultad para respirar por cualquier causa, sensación de ahogo, agitación o piel morada.
- Pérdida del conocimiento o convulsión.
- Paro cardíaco o respiratorio.
- Heridas, fracturas o golpes múltiples y severos en cualquier parte del cuerpo.

### Triage 2: amarillo

_Tiempo de espera:_

Urgencia, alrededor de 15 minutos.

_Síntomas_

- Dolor en el pecho con signos vitales alterados.
- Sangrado abundante de cualquier origen.

## Preguntas frecuentes`;

    const levels = parseTriageDefinitions(markdown);

    expect(levels).toHaveLength(2);
    expect(levels[0]?.subtitle).toBe(
      "Emergencia, el paciente requiere atención inmediata.",
    );
    expect(levels[0]?.symptoms).toEqual([
      "Dificultad para respirar por cualquier causa, sensación de ahogo, agitación o piel morada.",
      "Pérdida del conocimiento o convulsión.",
      "Paro cardíaco o respiratorio.",
      "Heridas, fracturas o golpes múltiples y severos en cualquier parte del cuerpo.",
    ]);
  });
});
