import { expect, test } from "@playwright/test";

test.describe("footer", () => {
  test("muestra la navegación institucional, las marcas y el texto legal", async ({
    page,
  }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");

    await expect(footer).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Afiliados" })
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Explorar" })
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Contacto" })
    ).toBeVisible();
    await expect(
      footer.getByRole("link", {
        name: "Rutas integrales de atención en salud",
      })
    ).toHaveAttribute(
      "href",
      "/afiliados/rutas-integrales-de-atencion-en-salud"
    );
    await expect(footer.getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      footer.getByRole("link", { name: "Nosotros" })
    ).toHaveAttribute("href", "/nosotros");
    await expect(
      footer.getByText("@2026 Kenko EPS. Todos los derechos reservados")
    ).toBeVisible();
    await expect(
      footer.getByRole("img", {
        name: "Ministerio de Salud y Protección Social",
      })
    ).toBeVisible();
    await expect(
      footer.getByRole("img", {
        name: "Vigilado Superintendencia Nacional de Salud",
      })
    ).toBeVisible();
  });

  test("se adapta a una vista móvil sin desbordamiento horizontal", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 812, width: 375 });
    await page.goto("/");

    await expect(page.locator("body")).toHaveCSS("overflow-x", "visible");
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator("body")).toHaveJSProperty("scrollWidth", 375);
  });
});
