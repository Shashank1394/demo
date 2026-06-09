import React, { JSX } from "react";
import { Field } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface CardItem {
  id: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
    Description: Field<string>;
  };
}

interface CardsFields {
  items: CardItem[];
}

export type CardsGridProps = ComponentProps & {
  fields: CardsFields;
};

export const Default = (props: CardsGridProps): JSX.Element => {
  const { params, fields } = props;
  const { RenderingIdentifier, styles } = params;

  return (
    <section
      className={`component py-12 px-4 ${styles || ""}`}
      id={RenderingIdentifier}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fields?.items?.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {card.fields.Title?.value}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {card.fields.Description?.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
