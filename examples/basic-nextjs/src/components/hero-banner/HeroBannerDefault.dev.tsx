import { Image, RichText, Text, Link } from "@sitecore-content-sdk/nextjs";
import { HeroBannerProps } from "./hero-banner.props";

export const HeroBannerDefault = (props: HeroBannerProps) => {
  const { fields } = props;
  const datasource = fields?.data?.datasource;

  const image = datasource?.Image;
  const title = datasource?.Title;
  const description = datasource?.Description;
  const cta = datasource?.CTA;

  return (
    <div className="hero">
      <div className="hero__background">
        <Image field={image} />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          <Text field={title} />
        </h1>

        <div className="hero__description">
          <RichText field={description} />
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
