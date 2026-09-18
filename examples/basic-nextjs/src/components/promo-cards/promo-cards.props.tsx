import type {
  Field,
  ImageField,
  LinkField,
} from "@sitecore-content-sdk/nextjs";

import type { ComponentProps } from "../../lib/component-props";

export type PromoCardItem = {
  id: string;
  name?: string;
  Image?: ImageField;
  Title?: Field<string>;
  Description?: Field<string>;
  CTA?: LinkField;
};

export type PromoCardsData = {
  datasource?: {
    id?: string;
    name?: string;

    ListTitle?: Field<string>;

    children?: {
      results?: PromoCardItem[];
    };
  };
};

export type PromoCardsProps = ComponentProps & {
  fields?: {
    data?: PromoCardsData;
  };

  variant?: "2-in-row" | "3-in-row" | "4-in-row";
};
