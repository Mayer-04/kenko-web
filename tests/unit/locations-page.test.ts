import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("puntos de atención page", () => {
  it("renders the expected page title and route components", () => {
    const pagePath = path.resolve(
      process.cwd(),
      "src/pages/afiliados/puntos-de-atencion.astro"
    );
    const contentPath = path.resolve(
      process.cwd(),
      "src/components/members/LocationsContent.astro"
    );
    const page = readFileSync(pagePath, "utf-8");
    const content = readFileSync(contentPath, "utf-8");

    expect(page).toContain("Puntos de Atención");
    expect(page).toContain("LocationsContent");
    expect(content).toContain("LocationsMap");
  });

  it("uses google maps embed for location display", () => {
    const mapComponentPath = path.resolve(
      process.cwd(),
      "src/components/members/LocationsMap.astro"
    );
    const mapComponent = readFileSync(mapComponentPath, "utf-8");

    expect(mapComponent).toContain("google.com/maps/embed");
    expect(mapComponent).toContain("iframe");
  });
});
