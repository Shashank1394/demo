import React, { JSX } from "react";
import {
  Field,
  RichText as ContentSdkRichText,
  Image as ContentSdkImage,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Image: Field<any>;
}

export type DataProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields }: DataProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component data ${styles}`} id={RenderingIdentifier}>
      <div className="component-content">
        {fields ? (
          <>
            <h2>{fields.Title?.value}</h2>

            <ContentSdkRichText field={fields.Description} />

            <ContentSdkImage field={fields.Image} />
          </>
        ) : (
          <span className="is-empty-hint">Data</span>
        )}
      </div>
    </div>
  );
};
