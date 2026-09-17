import type { Field, ImageField } from "@sitecore-content-sdk/nextjs";
import type { ComponentProps } from "../../lib/component-props";

export type IconCardsProps = ComponentProps & {
  fields?: {
    Icon?: ImageField;
    Title?: Field<string>;
  };
};
