import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("puntos de atención page", () => {
  it("renders the expected page title and route components", () => {
    const pagePath = resolve(
      process.cwd(),
      "src/pages/afiliados/puntos-de-atencion.astro",
    );
    const contentPath = resolve(
      process.cwd(),
      "src/components/members/LocationsContent.astro",
    );
    const page = readFileSync(pagePath, "utf8");
    const content = readFileSync(contentPath, "utf8");

    expect(page).toContain("Puntos de Atención");
    expect(page).toContain("LocationsContent");
    expect(content).toContain("LocationsMap");
  });

  it("uses google maps embed for location display", () => {
    const mapComponentPath = resolve(
      process.cwd(),
      "src/components/members/LocationsMap.astro",
    );
    const mapComponent = readFileSync(mapComponentPath, "utf8");

    expect(mapComponent).toContain("google.com/maps/embed");
    expect(mapComponent).toContain("iframe");
  });
});
