import { expect, test } from "@playwright/test";

test.describe("header móvil", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("abre el menú y actualiza el control de cierre", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Abrir menú" });
    const navigation = page.getByRole("navigation", {
      name: "Navegación principal",
    });
    const header = page.getByRole("banner", { name: "Encabezado principal" });
    const iconContainer = toggle.locator("[data-menu-control-icon]");

    await expect(header).toHaveCSS("position", "sticky");
    await expect(header).toHaveCSS("width", "375px");
    await expect(header).toHaveCSS("border-top-width", "0px");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle.getByText("Cerrar")).toBeHidden();
    await expect(toggle).toHaveCSS("cursor", "pointer");
    await expect(iconContainer).toHaveCSS(
      "border-top-color",
      "rgba(0, 0, 0, 0)",
    );
    await expect(
      page.getByText("Ingresa a nuestro portal virtual"),
    ).toHaveCount(0);
    await expect(navigation).toBeHidden();

    await toggle.click();

    const closeToggle = page.getByRole("button", { name: "Cerrar menú" });

    await expect(closeToggle).toHaveAttribute("aria-expanded", "true");
    await expect(closeToggle.getByText("Cerrar")).toBeVisible();
    await expect(closeToggle).toHaveCSS("cursor", "pointer");
    await expect(closeToggle.locator("[data-menu-open-icon]")).toBeHidden();
    await expect(closeToggle.locator("[data-menu-close-icon]")).toBeVisible();
    await expect(closeToggle.locator("[data-menu-control-icon]")).toHaveCSS(
      "border-top-color",
      "rgb(33, 73, 106)",
    );
    await expect(navigation).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Inicio", exact: true }),
    ).toHaveAttribute("href", "/");

    await closeToggle.click();

    const openToggle = page.getByRole("button", { name: "Abrir menú" });
    await expect(openToggle).toHaveAttribute("aria-expanded", "false");
    await expect(openToggle.getByText("Cerrar")).toBeHidden();
    await expect(openToggle.locator("[data-menu-open-icon]")).toBeVisible();
    await expect(openToggle.locator("[data-menu-close-icon]")).toBeHidden();
    await expect(navigation).toBeHidden();
  });

  test("expande Afiliados y Nosotros con sus rutas", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú" }).click();

    const afiliados = page.getByRole("button", { name: "Afiliados" });
    await expect(afiliados).toHaveCSS("cursor", "pointer");
    await afiliados.click();

    await expect(afiliados).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("link", { name: "Rutas integrales de atención en salud" }),
    ).toHaveAttribute(
      "href",
      "/afiliados/rutas-integrales-de-atencion-en-salud",
    );
    await expect(
      page.getByRole("link", { name: "Rutas integrales de atención en salud" }),
    ).toHaveCSS("cursor", "pointer");
    const affiliateRoute = page.getByRole("link", {
      name: "Rutas integrales de atención en salud",
    });
    await affiliateRoute.hover();
    await expect
      .poll(() =>
        affiliateRoute.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      )
      .not.toBe("rgba(0, 0, 0, 0)");
    await expect(page.locator("#afiliados-submenu")).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );

    const nosotros = page.getByRole("button", { name: "Nosotros" });
    await expect(nosotros).toHaveCSS("cursor", "pointer");
    await nosotros.click();

    await expect(afiliados).toHaveAttribute("aria-expanded", "false");
    await expect(nosotros).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("link", { name: "Organigrama" }),
    ).toHaveAttribute("href", "/nosotros/organigrama");
    await expect(
      page.getByRole("link", {
        name: "Plan de modernización y saneamiento financiero",
      }),
    ).toHaveAttribute(
      "href",
      "/nosotros/plan-de-modernizacion-y-saneamiento-financiero",
    );
    await expect(
      page.getByRole("link", {
        name: "Plan de modernización y saneamiento financiero",
      }),
    ).toHaveCSS("cursor", "pointer");

    await page.getByRole("button", { name: "Cerrar menú" }).click();
    await page.getByRole("button", { name: "Abrir menú" }).click();

    await expect(afiliados).toHaveAttribute("aria-expanded", "false");
    await expect(nosotros).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("link", { name: "Organigrama" })).toBeHidden();
  });
});

test("el header móvil se oculta desde 768 px", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/");

  await expect(
    page.getByRole("banner", { name: "Encabezado principal" }),
  ).toBeHidden();
});
