import { Image, Text } from "@sitecore-content-sdk/nextjs";
import type { IconCardsProps } from "./icon-cards.props";

export const IconCardsDefault = (props: IconCardsProps) => {
  const { fields } = props;

  const icon = fields?.Icon;
  const title = fields?.Title;

  return (
    <div className="icon-card">
      <div className="icon-card__icon">{icon && <Image field={icon} />}</div>

      <div className="icon-card__title">{title && <Text field={title} />}</div>
    </div>
  );
};
