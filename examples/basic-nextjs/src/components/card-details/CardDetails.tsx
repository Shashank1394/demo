import React from "react";
import { RichText, Text } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { getCardBySlug } from "lib/card-details";

type CardDetailsProps = ComponentProps & {
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

const CardDetails = async (
  props: CardDetailsProps,
): Promise<React.JSX.Element> => {
  const slug = props.page?.layout?.sitecore?.context?.cardSlug;

  console.log("================================");
  console.log("CARD DETAILS COMPONENT");
  console.log("SLUG FROM CONTEXT:", slug);
  console.log("================================");

  if (!slug) {
    console.log("NO SLUG FOUND IN PAGE CONTEXT");

    return (
      <section className="container py-5">
        <h2>No card slug found.</h2>
      </section>
    );
  }

  const card = await getCardBySlug(slug);

  console.log("================================");
  console.log("CARD FETCH RESULT");
  console.log(card);
  console.log("================================");

  if (!card) {
    console.log("CARD NOT FOUND FOR:", slug);

    return (
      <section className="container py-5">
        <h2>Card not found.</h2>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {card.Title?.jsonValue && (
                <Text
                  tag="h1"
                  field={card.Title.jsonValue}
                  className="card-title mb-4"
                />
              )}

              {card.Description?.jsonValue && (
                <Text
                  tag="p"
                  field={card.Description.jsonValue}
                  className="mb-3"
                />
              )}

              {card.Copy?.jsonValue && (
                <RichText field={card.Copy.jsonValue} className="card-text" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDetails;
