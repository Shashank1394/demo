import React, { JSX } from "react";
import { Field } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface CardFields {
  Title: Field<string>;
  Description: Field<string>;
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
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            {fields?.Title?.value}
          </h1>

          <div className="text-lg leading-relaxed text-gray-700">
            {fields?.Description?.value}
          </div>
        </div>
      </div>
    </section>
  );
};
