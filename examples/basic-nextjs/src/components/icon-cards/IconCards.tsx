import React, { JSX } from "react";
import {
  Field,
  Text as ContentSdkText,
  Image as ContentSdkImage,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  Icon: Field<any>;
  Title: Field<string>;
}

export type DataProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields }: DataProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component icon-card ${styles}`} id={RenderingIdentifier}>
      <div className="component-content">
        {fields ? (
          <div className="icon-card">
            <div className="icon-card__icon">
              <ContentSdkImage field={fields.Icon} />
            </div>

            <ContentSdkText
              field={fields.Title}
              tag="div"
              className="icon-card__title"
            />
          </div>
        ) : (
          <span className="is-empty-hint">Icon Card</span>
        )}
      </div>
    </div>
  );
};
