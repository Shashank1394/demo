import { Image, Link, RichText, Text } from "@sitecore-content-sdk/nextjs";

import type { PromoCardItem, PromoCardsProps } from "./promo-cards.props";

type PromoCardContentProps = {
  item: PromoCardItem;
  columnClass: string;
};

const PromoCardContent = ({ item, columnClass }: PromoCardContentProps) => {
  return (
    <div className={columnClass}>
      <div className="promo-card">
        {item.Image && (
          <div className="promo-card__image">
            <Image field={item.Image} />
          </div>
        )}

        <div className="promo-card__content">
          {item.Title && (
            <h3 className="promo-card__title">
              <Text field={item.Title} />
            </h3>
          )}

          {item.Description && (
            <div className="promo-card__description">
              <RichText field={item.Description} />
            </div>
          )}

          {item.CTA && (
            <div className="promo-card__cta">
              <Link field={item.CTA} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PromoCardsDefault = (props: PromoCardsProps) => {
  const datasource = props.fields?.data?.datasource;

  const listTitle = datasource?.ListTitle;

  const cards = datasource?.children?.results ?? [];

  const columnClass = {
    "2-in-row": "col-12 col-md-6",
    "3-in-row": "col-12 col-md-6 col-lg-4",
    "4-in-row": "col-12 col-md-6 col-lg-3",
  }[props.variant ?? "3-in-row"];

  return (
    <div className="promo-cards">
      <div className="component-content">
        <div className="container">
          {listTitle && (
            <div className="row">
              <div className="col-12">
                <h2 className="promo-cards__title">
                  <Text field={listTitle} />
                </h2>
              </div>
            </div>
          )}

          <div className="row">
            {cards.map((item) => (
              <PromoCardContent
                key={item.id}
                item={item}
                columnClass={columnClass}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
