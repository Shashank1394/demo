import React, { JSX } from "react";
import Link from "next/link";
import { Field } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface CardItem {
  id: string;
  name: string;
  displayName: string;
  url?: string;
  fields: {
    Title: Field<string>;
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
            <Link
              key={card.id}
              href={card.url || `/cards/${card.name.toLowerCase()}`}
              className="group"
            >
              <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {card.fields.Title?.value}
                </h3>

                <div className="mt-4 text-sm font-medium text-blue-600">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
