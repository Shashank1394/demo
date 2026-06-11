import React, { JSX } from "react";
import { Image } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { CardData } from "lib/card-service";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type CardProps = ComponentProps & {
  params: {
    RenderingIdentifier?: string;
    styles?: string;
  };
  // Sitecore context is passed through ComponentProps via the SDK.
  // page.tsx injects cardData and cardSlug into
  // page.layout.sitecore.context before this component renders.
  page?: {
    layout?: {
      sitecore?: {
        context?: {
          cardData?: CardData;
          cardSlug?: string;
        };
      };
    };
    mode?: {
      isEditing?: boolean;
    };
  };
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Card component — reads data injected into Sitecore context by page.tsx.
 *
 * No GraphQL fetch happens here. page.tsx already:
 *   1. Detects /cards/[slug] routes
 *   2. Calls getCardBySlug(slug) once
 *   3. Injects the result into page.layout.sitecore.context.cardData
 *
 * This component just reads props.page.layout.sitecore.context.cardData.
 */
export const Default = (props: CardProps): JSX.Element => {
  const { params, page } = props;
  const { RenderingIdentifier, styles } = params;

  const isEditing = page?.mode?.isEditing;
  const card = page?.layout?.sitecore?.context?.cardData;

  // ── Editing mode placeholder ───────────────────────────────────────────────
  // In the Pages editor, context.cardData won't be set because the editor
  // loads card-details directly (not via /cards/[slug]). Show a placeholder
  // so the component is visible and selectable in the editor.
  if (isEditing && !card) {
    return (
      <section
        className={`component py-16 px-4 ${styles || ""}`}
        id={RenderingIdentifier}
      >
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-400">
            <p className="text-lg font-medium">Card Preview</p>
            <p className="text-sm mt-1">
              Card data is available at runtime via the /cards/[slug] route.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Runtime: no card data found ───────────────────────────────────────────
  if (!card) {
    return (
      <div className="py-10 text-center text-gray-400">
        Card data not found.
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      className={`component py-16 px-4 ${styles || ""}`}
      id={RenderingIdentifier}
    >
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {card.image?.jsonValue?.value?.src && (
            <Image
              field={card.image.jsonValue}
              className="h-100 w-full object-cover"
            />
          )}

          <div className="p-8">
            {card.title?.jsonValue?.value && (
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                {card.title.jsonValue.value}
              </h1>
            )}

            {card.description?.jsonValue?.value && (
              <p className="text-lg leading-relaxed text-gray-700">
                {card.description.jsonValue.value}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
