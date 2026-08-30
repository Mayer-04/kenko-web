import { expect, test } from "@playwright/test";

test("la página de inicio muestra su contenido principal", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Kenko EPS - Inicio");
  await expect(
    page.getByRole("heading", { name: "Bienvenido a Kenko EPS" }),
  ).toBeVisible();
  await expect(
    page.getByText("Esta es la página de inicio de Kenko EPS."),
  ).toBeVisible();
});
