import React, { JSX } from "react";
import { Field, Image, ImageField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface CardFields {
  Title: Field<string>;
  Description: Field<string>;
  Image: ImageField;
}

export type CardProps = ComponentProps & {
  fields: CardFields;
};

export const Default = (props: CardProps): JSX.Element => {
  const { params, fields } = props;
  const { RenderingIdentifier, styles } = params;

  return (
    <section
      className={`component py-16 px-4 ${styles || ""}`}
      id={RenderingIdentifier}
    >
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {fields?.Image && (
            <Image field={fields.Image} className="h-100 w-full object-cover" />
          )}

          <div className="p-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {fields?.Title?.value}
            </h1>

            <p className="text-lg leading-relaxed text-gray-700">
              {fields?.Description?.value}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
