import { Field } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

export type CardGridProps = ComponentProps & {
  fields: {
    items: CardItem[];
  };
};

export interface CardItem {
  id: string;
  name: string;
  displayName: string;

  fields: {
    Title?: Field<string>;
    Description?: Field<string>;
  };
}
