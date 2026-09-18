import { ComponentProps } from "../../lib/component-props";
import { PromoCardsDefault } from "./PromoCardsDefault.dev";

export const Default = (props: ComponentProps) => {
  return <PromoCardsDefault {...props} variant="2-in-row" />;
};

export const TwoInRow = (props: ComponentProps) => {
  return <PromoCardsDefault {...props} variant="2-in-row" />;
};

export const ThreeInRow = (props: ComponentProps) => {
  return <PromoCardsDefault {...props} variant="3-in-row" />;
};

export const FourInRow = (props: ComponentProps) => {
  return <PromoCardsDefault {...props} variant="4-in-row" />;
};
