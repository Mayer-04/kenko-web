import { expect, test } from "@playwright/test";

test("la página de inicio muestra el carrusel principal", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Kenko EPS - Inicio");
  const carousel = page.getByRole("region", {
    name: "Destacados de Kenko EPS",
  });

  await expect(carousel).toBeVisible();
  await expect(
    carousel.getByRole("heading", { name: "Nuestros puntos de atención" }),
  ).toBeVisible();
  await expect(
    carousel.getByRole("link", { name: "Ver sedes" }),
  ).toHaveAttribute("href", "/afiliados/puntos-de-atencion");

  await carousel
    .getByRole("button", { name: "Mostrar diapositiva siguiente" })
    .click();

  await expect(
    carousel.getByRole("group", {
      name: "Diapositiva 2 de 3: Líderes en atención inclusiva",
    }),
  ).toHaveAttribute("aria-hidden", "false");
  await expect(
    carousel.getByRole("button", {
      name: "Mostrar diapositiva 2: Líderes en atención inclusiva",
    }),
  ).toHaveAttribute("aria-current", "true");

  await carousel.focus();
  await page.keyboard.press("ArrowRight");

  await expect(
    carousel.getByRole("group", {
      name: "Diapositiva 3 de 3: La segunda EPS preferida por los colombianos",
    }),
  ).toHaveAttribute("aria-hidden", "false");

  const services = page.getByRole("region", { name: "Servicios para ti" });
  await expect(services).toBeVisible();
  await expect(
    services.getByRole("link", { name: /Puntos de atención/ }),
  ).toHaveAttribute("href", "/afiliados/puntos-de-atencion");
  await expect(
    services.getByRole("link", {
      name: /Descubre nuestras rutas de atención/,
    }),
  ).toHaveAttribute("href", "/afiliados/rutas-integrales-de-atencion-en-salud");

  const team = page.getByRole("region", {
    name: "Contamos con los mejores especialistas",
  });
  await expect(team).toBeVisible();
  await expect(
    team.getByRole("link", { name: "Conoce nuestro organigrama" }),
  ).toHaveAttribute("href", "/nosotros/organigrama");

  const stats = page.getByRole("region", {
    name: "Indicadores de confianza de Kenko EPS",
  });
  await expect(stats).toBeVisible();
  await expect(stats.getByText("15+", { exact: true })).toBeVisible();
  await expect(stats.getByRole("heading", { name: "Afiliados" })).toBeVisible();
});
