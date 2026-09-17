import { ComponentProps } from "../../lib/component-props";
import { RichTextField } from "@sitecore-content-sdk/nextjs";

export type ContentProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: {
        Description: RichTextField;
      };
    };
  };
};
