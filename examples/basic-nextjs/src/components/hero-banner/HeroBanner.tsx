import React, { JSX } from "react";
import {
  Field,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Image: Field<any>;
  CTA: Field<any>;
}

export type DataProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields }: DataProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component hero ${styles}`} id={RenderingIdentifier}>
      <div className="component-content">
        {fields ? (
          <div className="hero">
            <div className="hero__background">
              <ContentSdkImage field={fields.Image} />
            </div>

            <div className="hero__content">
              <ContentSdkText field={fields.Title} tag="h1" />

              <div className="hero__description">
                <ContentSdkRichText field={fields.Description} />
              </div>

              <div className="hero__cta">
                <ContentSdkLink field={fields.CTA} />
              </div>
            </div>
          </div>
        ) : (
          <span className="is-empty-hint">Hero</span>
        )}
      </div>
    </div>
  );
};
