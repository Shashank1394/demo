import { ComponentProps } from "../../lib/component-props";
import { Field, ImageField, LinkField } from "@sitecore-content-sdk/nextjs";

export type HeroBannerProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: {
        Image?: ImageField;
        Title?: Field<string>;
        Description?: Field<string>;
        CTA?: LinkField;
      };
    };
  };
};
