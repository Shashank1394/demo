import type { Field } from "@sitecore-content-sdk/nextjs";
import type { ComponentProps } from "../../lib/component-props";

export type ContentProps = ComponentProps & {
  fields?: {
    Title?: Field<string>;
    Description?: Field<string>;
  };
};
