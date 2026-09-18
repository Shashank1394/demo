import type { ComponentProps } from "../../lib/component-props";

export type PromoCardItem = {
  id?: string;
  fields?: Record<string, unknown>;
};

export type PromoCardsProps = ComponentProps & {
  variant?: "2-in-row" | "3-in-row" | "4-in-row";
};
