import client from "src/lib/sitecore-client";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

/**
 * Full card data shape — used in:
 *   - card-service return type
 *   - page.tsx context injection (context.cardData)
 *   - Card.tsx props (props.page.layout.sitecore.context.cardData)
 */
export interface CardData {
  id: string;
  name: string;
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
        width?: string;
        height?: string;
      };
    };
  };
}

// Lightweight shape — id + title only, used for the slug→ID lookup
interface CardTitleIndex {
  id: string;
  name: string;
  title?: {
    jsonValue?: {
      value?: string;
    };
  };
}

interface CardTitleIndexResult {
  cards: {
    results: CardTitleIndex[];
  };
}

interface SingleCardByIdResult {
  card: CardData | null;
}

// ─────────────────────────────────────────────
// Template ID
// ─────────────────────────────────────────────

const CARD_TEMPLATE_ID = "B2891E8E59E943D49E11A79D4AA92FF6";

// ─────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────

/**
 * Step 1 — cheap index: fetch id + title only for all cards.
 * Used purely to resolve title.toLowerCase() slug → item ID.
 */
const CARD_TITLE_INDEX_QUERY = `
  query CardTitleIndex($language: String!) {
    cards: search(
      where: {
        AND: [
          {
            name: "_templates"
            value: "${CARD_TEMPLATE_ID}"
          }
          {
            name: "_language"
            value: $language
          }
        ]
      }
    ) {
      results {
        id
        name
        title: field(name: "Title") { jsonValue }
      }
    }
  }
`;

/**
 * Step 2 — full fetch: get all card fields for one item by ID.
 * Only runs after slug→ID is resolved from step 1.
 */
const CARD_BY_ID_QUERY = `
  query CardById($id: String!, $language: String!) {
    card: item(path: $id, language: $language) {
      id
      name
      title: field(name: "Title") { jsonValue }
      description: field(name: "Description") { jsonValue }
      image: field(name: "Image") { jsonValue }
    }
  }
`;

/**
 * Lightweight paths query — id + title only.
 * Used by generateStaticParams in page.tsx.
 */
const ALL_CARD_PATHS_QUERY = `
  query AllCardPaths($language: String!) {
    cards: search(
      where: {
        AND: [
          {
            name: "_templates"
            value: "${CARD_TEMPLATE_ID}"
          }
          {
            name: "_language"
            value: $language
          }
        ]
      }
    ) {
      results {
        id
        name
        title: field(name: "Title") { jsonValue }
      }
    }
  }
`;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function excludeStandardValues<T extends { name: string }>(items: T[]): T[] {
  return items.filter((item) => item.name !== "__Standard Values");
}

function titleToSlug(title: string): string {
  return title.toLowerCase().trim();
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Fetches a single card whose Title field, when lowercased, matches the slug.
 *
 * Called by page.tsx when it detects a /cards/[slug] route.
 * The result is injected into page.layout.sitecore.context.cardData
 * and read by Card.tsx — no second fetch happens in the component.
 *
 * Two-query strategy:
 *   1. Fetch id + title for all cards (cheap, no images/descriptions)
 *   2. Match title.toLowerCase() === slug → resolve item ID
 *   3. Fetch full card data by ID only for the matched item
 *
 * @param slug     - Lowercased card title from the URL. e.g. "card1"
 * @param language - Sitecore language code, defaults to "en"
 */
export async function getCardBySlug(
  slug: string,
  language = "en",
): Promise<CardData | null> {
  if (!slug) {
    console.warn("[card-service] getCardBySlug called with empty slug");
    return null;
  }

  // ── Step 1: resolve slug → item ID ────────────────────────────────────────
  let matchedId: string | null = null;

  try {
    const indexResult = await client.getData<CardTitleIndexResult>(
      CARD_TITLE_INDEX_QUERY,
      { language },
    );

    const allCards = excludeStandardValues(indexResult?.cards?.results ?? []);

    const match = allCards.find(
      (card) =>
        titleToSlug(card.title?.jsonValue?.value ?? "") === slug.toLowerCase(),
    );

    if (!match) {
      console.warn(
        `[card-service] No card title matches slug: "${slug}". ` +
          `Available: [${allCards
            .map((c) => c.title?.jsonValue?.value)
            .filter(Boolean)
            .join(", ")}]`,
      );
      return null;
    }

    matchedId = match.id;
  } catch (error) {
    console.error("[card-service] Error in title index query:", error);
    return null;
  }

  // ── Step 2: fetch full card data by ID ────────────────────────────────────
  try {
    const cardResult = await client.getData<SingleCardByIdResult>(
      CARD_BY_ID_QUERY,
      { id: matchedId, language },
    );

    if (!cardResult?.card) {
      console.warn(
        `[card-service] item() returned null for id: "${matchedId}"`,
      );
      return null;
    }

    return cardResult.card;
  } catch (error) {
    console.error(
      `[card-service] Error fetching card by id "${matchedId}":`,
      error,
    );
    return null;
  }
}

/**
 * Returns id + title for every card.
 * Used by generateStaticParams in page.tsx to pre-render /cards/[slug] routes.
 *
 * @example
 *   const cards = await getAllCardPaths();
 *   return cards.map((card) => ({
 *     path: ["cards", card.title?.jsonValue?.value?.toLowerCase() ?? ""],
 *   }));
 */
export async function getAllCardPaths(
  language = "en",
): Promise<CardTitleIndex[]> {
  try {
    const result = await client.getData<CardTitleIndexResult>(
      ALL_CARD_PATHS_QUERY,
      { language },
    );

    return excludeStandardValues(result?.cards?.results ?? []);
  } catch (error) {
    console.error("[card-service] Error fetching card paths:", error);
    return [];
  }
}
