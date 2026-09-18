import type {
  Field,
  ImageField,
  LinkField,
} from "@sitecore-content-sdk/nextjs";

import type { ComponentProps } from "../../lib/component-props";

export type PromoCardItem = {
  id: string;
  url?: string;
  name?: string;
  displayName?: string;
  fields?: {
    Details?: Field<string>;
    Tag?: Field<string>;
    Title?: Field<string>;
    MainImage?: ImageField;
    MainMdImage?: ImageField;
    MainSmImage?: ImageField;
    CTALink?: LinkField;
    CTATitle?: Field<string>;
    GaOverrideTagging?: Field<string>;
    ModalTheme?: Field<string> | null;
    OpenInModal?: Field<boolean>;
    MainVideo?: LinkField;
    VideoType?: Field<string> | null;
    VidyardId?: Field<string>;
  };
};

export type PromoCardsFields = {
  items?: PromoCardItem[];
};

export type PromoCardsProps = ComponentProps & {
  fields?: PromoCardsFields;
  variant?: "2-in-row" | "3-in-row" | "4-in-row";
};
