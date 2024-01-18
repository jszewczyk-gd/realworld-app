export const isMobile = () => {
  return Cypress.config("viewportWidth") < Cypress.env("mobileViewportWidthBreakpoint");
};

export function stripNonDigits(data: string): string {
  return data.replace(/\D/g, '');
}