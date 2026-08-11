import client from "src/lib/sitecore-client";
import { slugify } from "src/lib/slugify";

export interface CardData {
  id: string;
  name: string;

  Title?: {
    jsonValue?: {
      value?: string;
    };
  };

  Description?: {
    jsonValue?: {
      value?: string;
    };
  };

  Copy?: {
    jsonValue?: {
      value?: string;
    };
  };
}

interface CardGridResult {
  datasource: {
    children: {
      results: CardData[];
    };
  };
}

const CARD_GRID_QUERY = `
query CardGridDatasource {
  datasource: item(
    path: "/sitecore/content/demo/test/Data/Card Grid"
    language: "en"
  ) {
    children {
      results {
        id
        name

        Title: field(name: "Title") {
          jsonValue
        }

        Description: field(name: "Description") {
          jsonValue
        }

        Copy: field(name: "Copy") {
          jsonValue
        }
      }
    }
  }
}
`;

export async function getCardBySlug(slug: string): Promise<CardData | null> {
  const result = await client.getData<CardGridResult>(CARD_GRID_QUERY);

  const cards = result?.datasource?.children?.results ?? [];

  const card = cards.find((card) => {
    const title = card.Title?.jsonValue?.value ?? card.name;

    return slugify(title) === slugify(slug);
  });

  return card ?? null;
}
