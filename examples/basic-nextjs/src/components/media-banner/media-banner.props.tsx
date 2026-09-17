import type {
  Field,
  ImageField,
  LinkField,
} from "@sitecore-content-sdk/nextjs";
import type { ComponentProps } from "../../lib/component-props";

export type MediaBannerProps = ComponentProps & {
  fields?: {
    Image?: ImageField;
    Title?: Field<string>;
    CTA?: LinkField;
  };
};
