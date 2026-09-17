import { ComponentProps } from "../../lib/component-props";
import { HeroBannerDefault } from "./HeroBannerDefault.dev";
import { HeroBannerTwoCTA } from "./HeroBannerTwoCTA.dev";

export const Default = (props: ComponentProps) => {
  return <HeroBannerDefault {...props} />;
};

export const TwoCTA = (props: ComponentProps) => {
  return <HeroBannerTwoCTA {...props} />;
};
