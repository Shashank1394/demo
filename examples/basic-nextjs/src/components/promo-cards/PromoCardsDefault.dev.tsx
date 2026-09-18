import type { PromoCardsProps, PromoCardItem } from "./promo-cards.props";
import { Default as PromoCard } from "../PromoCard/PromoCard";

type PromoCardsData = {
  children?: PromoCardItem[];
};

export const PromoCardsDefault = (props: PromoCardsProps) => {
  const { fields, variant = "2-in-row" } = props;

  const promoCardsData = fields as typeof fields & PromoCardsData;

  const children = promoCardsData?.children ?? [];

  const rowClassName = {
    "2-in-row": "promo-cards__row promo-cards__row--2",
    "3-in-row": "promo-cards__row promo-cards__row--3",
    "4-in-row": "promo-cards__row promo-cards__row--4",
  }[variant];

  return (
    <div className={`promo-cards promo-cards--${variant}`}>
      <div className="component-content">
        <div className="container">
          <div className={rowClassName}>
            {children.map((child, index) => (
              <PromoCard key={child.id ?? index} {...child} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
