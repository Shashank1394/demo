import { Image, Link, Text } from "@sitecore-content-sdk/nextjs";
import type { MediaBannerProps } from "./media-banner.props";

export const MediaBannerImageDown = (props: MediaBannerProps) => {
  const { fields } = props;

  const image = fields?.Image;
  const title = fields?.Title;
  const cta = fields?.CTA;

  return (
    <div className="media-banner">
      <div className="media-banner__content">
        <h2 className="media-banner__title">
          {title && <Text field={title} />}
        </h2>

        {cta && (
          <div className="media-banner__cta">
            <Link field={cta} />
          </div>
        )}
      </div>

      <div className="media-banner__image">
        {image && <Image field={image} />}
      </div>
    </div>
  );
};
