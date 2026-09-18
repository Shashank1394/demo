import { Image, RichText, Text } from "@sitecore-content-sdk/nextjs";

import type { PromoCardItem, PromoCardsProps } from "./promo-cards.props";

type PromoCardContentProps = {
  item: PromoCardItem;
};

const PromoCardContent = ({ item }: PromoCardContentProps) => {
  const fields = item.fields;

  const image = fields?.MainImage;
  const tag = fields?.Tag;
  const title = fields?.Title;
  const details = fields?.Details;
  const ctaLink = fields?.CTALink;
  const ctaTitle = fields?.CTATitle;

  const ctaHref = ctaLink?.value?.href;
  const ctaText = ctaTitle?.value;

  return (
    <div className="promo-card h-full">
      {image?.value?.src && (
        <div className="promo-card__image">
          <Image field={image} />
        </div>
      )}

      <div className="promo-card__content">
        {tag?.value && (
          <div className="promo-card__tag">
            <Text field={tag} />
          </div>
        )}

        {title?.value && (
          <h3 className="promo-card__title">
            <Text field={title} />
          </h3>
        )}

        {details?.value && (
          <div className="promo-card__details">
            <RichText field={details} />
          </div>
        )}

        {ctaHref && (
          <div className="promo-card__cta">
            <a href={ctaHref} className="promo-card__link">
              {ctaText || "Read more"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export const PromoCardsDefault = (props: PromoCardsProps) => {
  const { fields, variant = "2-in-row" } = props;

  const items = fields?.items ?? [];

  const gridClass = {
    "2-in-row": "grid-cols-1 md:grid-cols-2",
    "3-in-row": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4-in-row": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[variant];

  return (
    <div className={`promo-cards promo-cards--${variant}`}>
      <div className="component-content">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className={`grid gap-6 ${gridClass}`}>
            {items.map((item) => (
              <PromoCardContent item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
