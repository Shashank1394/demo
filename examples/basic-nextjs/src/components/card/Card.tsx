import React, { JSX } from "react";
import { Image, ImageField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { slugify } from "src/lib/slugify";

interface CardResult {
  id: string;
  name: string;
  title: {
    jsonValue: {
      value: string;
    };
  };
  description: {
    jsonValue: {
      value: string;
    };
  };
  image: {
    jsonValue: ImageField;
  };
}

export type CardProps = ComponentProps & {
  fields?: {
    data?: {
      cards?: {
        results?: CardResult[];
      };
    };
  };
  page?: {
    layout?: {
      sitecore?: {
        context?: {
          cardSlug?: string;
        };
      };
    };
  };
};

export const Default = (props: CardProps): JSX.Element => {
  const { params } = props;
  const { RenderingIdentifier, styles } = params;

  const slug = props.page?.layout?.sitecore?.context?.cardSlug;

  const cards =
    props.fields?.data?.cards?.results?.filter(
      (card) => card.name !== "__Standard Values",
    ) ?? [];

  const isEditing = props.page?.layout?.sitecore?.context?.pageEditing;

  const card = isEditing
    ? cards[0]
    : cards.find((c) => slugify(c.name) === slugify(slug ?? ""));

  if (!card) {
    return <div className="py-10 text-center">Card not found: {slug}</div>;
  }

  console.log("Card Context", {
    isEditing,
    slug,
    cards,
  });

  return (
    <section
      className={`component py-16 px-4 ${styles || ""}`}
      id={RenderingIdentifier}
    >
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {card.image?.jsonValue && (
            <Image
              field={card.image.jsonValue}
              className="h-100 w-full object-cover"
            />
          )}

          <div className="p-8">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {card.title?.jsonValue?.value}
            </h1>

            <p className="text-lg leading-relaxed text-gray-700">
              {card.description?.jsonValue?.value}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
