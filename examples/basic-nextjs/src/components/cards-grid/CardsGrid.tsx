import { JSX } from "react";
import Link from "next/link";
import { ComponentProps } from "lib/component-props";

type Card = {
  id: string;
  name: string;
  path: string;
  title?: {
    jsonValue?: {
      value?: string;
    };
  };
  description?: {
    jsonValue?: {
      value?: string;
    };
  };
  image?: {
    jsonValue?: {
      value?: {
        src?: string;
        alt?: string;
      };
    };
  };
  category?: {
    jsonValue?: {
      name?: string;
    } | null;
  };
};

export type CardsGridProps = ComponentProps & {
  fields?: {
    data?: {
      currentPage?: {
        name?: string;
      };
      cards?: {
        results?: Card[];
      };
    };
  };
};

export const Default = (props: CardsGridProps): JSX.Element => {
  const routeName =
    props.fields?.data?.currentPage?.name?.toLowerCase() || "home";

  const allCards =
    props.fields?.data?.cards?.results?.filter(
      (card) => card.name !== "__Standard Values" && card.category?.jsonValue,
    ) || [];

  let cards = allCards;

  if (routeName === "basic" || routeName === "premium") {
    cards = allCards.filter(
      (card) => card.category?.jsonValue?.name?.toLowerCase() === routeName,
    );
  }

  return (
    <section className="component py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.id} href={`/cards/${card.name}`} className="group">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {card.image?.jsonValue?.value?.src && (
                  <img
                    src={card.image.jsonValue.value.src}
                    alt={card.image.jsonValue.value.alt || ""}
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    {card.title?.jsonValue?.value}
                  </h3>

                  <p className="text-gray-600">
                    {card.description?.jsonValue?.value}
                  </p>

                  <div className="mt-4 text-sm font-medium text-blue-600">
                    Read more →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
