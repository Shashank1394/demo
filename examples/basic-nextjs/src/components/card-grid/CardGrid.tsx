import { RichText, Text } from "@sitecore-content-sdk/nextjs";
import { CardGridProps } from "./card-grid.props";

const CardGrid = (props: CardGridProps) => {
  const cards = props.fields?.items ?? [];

  if (!cards.length) {
    return <div>No cards found.</div>;
  }

  return (
    <section className="component card-grid py-16 px-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {card.fields?.Title && (
                <Text
                  tag="h3"
                  field={card.fields.Title}
                  className="mb-3 text-2xl font-bold"
                />
              )}

              {card.fields?.Description && (
                <Text
                  tag="p"
                  field={card.fields.Description}
                  className="text-gray-600"
                />
              )}

              {card.fields?.Copy && (
                <RichText
                  tag="p"
                  field={card.fields.Copy}
                  className="text-gray-800"
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
