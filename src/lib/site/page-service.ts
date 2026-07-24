import { gql } from "@apollo/client";
import { cache } from "react";
import sanitizeHtml from "sanitize-html";
import { getClient } from "@/lib/apollo/client";
import { pages } from "@/lib/site/page-data";
import type { SitePage, WordPressNodeResponse } from "@/lib/site/types";

const BRAND_ROUTES: Record<string, readonly string[]> = {
  "/avtomobili-type-c": ["peugeot", "citroen", "ford", "mercedes"],
  "/avtomobili-type-social": ["citroen"],
};

const PAGE_BY_URI_QUERY = gql`
  query PageByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on ContentNode {
        uri
        title
        content
      }
    }
  }
`;

const CMS_HTML_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "a",
    "blockquote",
    "br",
    "em",
    "h2",
    "h3",
    "h4",
    "li",
    "ol",
    "p",
    "strong",
    "ul",
  ],
  allowedAttributes: {
    a: ["href", "rel", "target", "title"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer",
      target: "_blank",
    }),
  },
};

function normalizeUri(input: string) {
  if (!input || input === "/") {
    return "/";
  }

  return `/${input.replace(/^\/+|\/+$/g, "")}`;
}

function findFallbackPage(uri: string) {
  return pages.find((page) => page.uri === uri);
}

function findBrandBaseUri(uri: string) {
  return Object.keys(BRAND_ROUTES).find((baseUri) =>
    BRAND_ROUTES[baseUri].some((slug) => uri === `${baseUri}/${slug}`),
  );
}

function findExtendedFallbackPage(uri: string) {
  const directMatch = findFallbackPage(uri);

  if (directMatch) {
    return directMatch;
  }

  const brandBaseUri = findBrandBaseUri(uri);

  if (brandBaseUri) {
    return findFallbackPage(brandBaseUri) ?? null;
  }

  return null;
}

function clonePage(page: SitePage): SitePage {
  return JSON.parse(JSON.stringify(page)) as SitePage;
}

async function loadWordPressNode(uri: string) {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    return null;
  }

  try {
    const client = getClient();
    const { data } = await client.query<WordPressNodeResponse>({
      query: PAGE_BY_URI_QUERY,
      variables: { uri },
    });

    return data?.nodeByUri ?? null;
  } catch {
    return null;
  }
}

export const getPageByUri = cache(async function getPageByUri(uri: string) {
  const normalizedUri = normalizeUri(uri);
  const fallback = findExtendedFallbackPage(normalizedUri);

  if (!fallback) {
    return null;
  }

  const page = clonePage(fallback);
  page.uri = normalizedUri;
  const node = await loadWordPressNode(normalizedUri);

  if (node?.title) {
    page.title = node.title;
  }

  if (node?.content) {
    page.sections.unshift({
      type: "richText",
      id: "wordpress-content",
      eyebrow: "WordPress",
      title: "Контент из CMS",
      description:
        "Этот блок уже рендерится из WPGraphQL и может заменить локальные демо-данные по мере настройки схемы.",
      html: sanitizeHtml(node.content, CMS_HTML_SANITIZE_OPTIONS),
    });
  }

  if (node?.uri) {
    page.uri = normalizeUri(node.uri);
  }

  return page;
});

export async function getPageBySegments(segments: string[]) {
  const uri = segments.length ? `/${segments.join("/")}` : "/";
  return getPageByUri(uri);
}

export function getAllRouteParams() {
  const pageParams = pages.map((page) => {
    if (page.uri === "/") {
      return { slug: [] };
    }

    return {
      slug: page.uri.replace(/^\/|\/$/g, "").split("/"),
    };
  });

  const brandParams = Object.entries(BRAND_ROUTES).flatMap(([baseUri, slugs]) =>
    slugs.map((slug) => ({
      slug: [...baseUri.replace(/^\/|\/$/g, "").split("/"), slug],
    })),
  );

  return [...pageParams, ...brandParams];
}
