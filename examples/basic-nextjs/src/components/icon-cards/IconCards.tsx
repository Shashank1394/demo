import { ComponentProps } from "../../lib/component-props";
import { IconCardsDefault } from "./IconCardsDefault.dev";
import { IconCardsImageDown } from "./IconCardsImageDown.dev";

export const Default = (props: ComponentProps) => {
  return <IconCardsDefault {...props} />;
};

export const ImageDown = (props: ComponentProps) => {
  return <IconCardsImageDown {...props} />;
};
