import { RichText } from "@sitecore-content-sdk/nextjs";
import type { ContentProps } from "./content.props";

export const ContentBulkContent = (props: ContentProps) => {
  const { fields } = props;
  const description = fields?.Description;

  return (
    <div>
      <div className="content__description">
        {description && <RichText field={description} />}
      </div>

      <br />

      <div className="content__description">
        {description && <RichText field={description} />}
      </div>
    </div>
  );
};
