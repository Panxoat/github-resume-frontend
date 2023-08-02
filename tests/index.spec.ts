import { expect, test } from "@playwright/test";

test("test input user id", async ({ page }) => {
  await page.goto("https://github-resume.consistent.kr/");
  await page.getByPlaceholder("GitHub ID 입력").click();
  await page.getByPlaceholder("GitHub ID 입력").fill("panxoat");
  await page.getByPlaceholder("GitHub ID 입력").press("Enter");

  const mostUseLanguage = page.getByRole("heading", { name: "최다 사용 언어" });

  await expect(mostUseLanguage).toHaveText("최다 사용 언어");
});
