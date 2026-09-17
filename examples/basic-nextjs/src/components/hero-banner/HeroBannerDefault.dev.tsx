import { Image, Link, RichText, Text } from "@sitecore-content-sdk/nextjs";
import type { HeroBannerProps } from "./hero-banner.props";

export const HeroBannerDefault = (props: HeroBannerProps) => {
  const { fields } = props;

  const image = fields?.Image;
  const title = fields?.Title;
  const description = fields?.Description;
  const cta = fields?.CTA;

  return (
    <div className="hero">
      <div className="hero__background">{image && <Image field={image} />}</div>

      <div className="hero__content">
        <h1 className="hero__title">{title && <Text field={title} />}</h1>

        <div className="hero__description">
          {description && <RichText field={description} />}
        </div>

        {cta && (
          <div className="hero__cta">
            <Link field={cta} />
          </div>
        )}
      </div>
    </div>
  );
};
