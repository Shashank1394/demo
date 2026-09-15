import React, { JSX } from "react";
import {
  Field,
  RichText as ContentSdkRichText,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  Description: Field<string>;
}

export type DataProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields }: DataProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component content ${styles}`} id={RenderingIdentifier}>
      <div className="component-content">
        {fields ? (
          <div>
            <div className="content__description">
              <ContentSdkRichText field={fields.Description} />
            </div>
          </div>
        ) : (
          <span className="is-empty-hint">Content</span>
        )}
      </div>
    </div>
  );
};
