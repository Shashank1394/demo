import React, { JSX } from "react";
import {
  Field,
  Text as ContentSdkText,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  Image: Field<any>;
  Title: Field<string>;
  CTA: Field<any>;
}

export type DataProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields }: DataProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div
      className={`component media-banner ${styles}`}
      id={RenderingIdentifier}
    >
      <div className="component-content">
        {fields ? (
          <div className="media-banner">
            <div className="media-banner__image">
              <ContentSdkImage field={fields.Image} />
            </div>

            <div className="media-banner__content">
              <ContentSdkText
                field={fields.Title}
                tag="h2"
                className="media-banner__title"
              />

              <div className="media-banner__cta">
                <ContentSdkLink field={fields.CTA} />
              </div>
            </div>
          </div>
        ) : (
          <span className="is-empty-hint">Media Banner</span>
        )}
      </div>
    </div>
  );
};
