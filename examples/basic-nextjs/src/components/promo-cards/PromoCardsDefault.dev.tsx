import type { ComponentProps } from "../../lib/component-props";

export const PromoCardsDefault = (props: ComponentProps) => {
  console.log("PromoCards component loaded");
  console.log("PromoCards props:", props);

  return (
    <div className="promo-cards">
      <div className="component-content">
        <div className="container">
          <div className="row">
            <p>PromoCards component is working.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
