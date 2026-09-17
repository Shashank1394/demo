import { RichText } from "@sitecore-content-sdk/nextjs";
import { ContentProps } from "./content.props";

export const ContentBulkContent = (props: ContentProps) => {
  const { fields } = props;
  const description = fields?.data?.datasource?.Description;

  return (
    <div>
      <div className="content__description">
        <RichText field={description} />
      </div>

      <br />

      <div className="content__description">
        <RichText field={description} />
      </div>
    </div>
  );
};
