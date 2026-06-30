import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/client";
import { pages } from "@/lib/site/page-data";
import type { SitePage, WordPressNodeResponse } from "@/lib/site/types";

const TYPE_C_BASE_URI = "/avtomobili-type-c";
const TYPE_C_BRAND_SLUGS = ["peugeot", "citroen", "ford", "mercedes"] as const;

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

function normalizeUri(input: string) {
  if (!input || input === "/") {
    return "/";
  }

  return `/${input.replace(/^\/+|\/+$/g, "")}`;
}

function findFallbackPage(uri: string) {
  return pages.find((page) => page.uri === uri);
}

function isTypeCBrandUri(uri: string) {
  return TYPE_C_BRAND_SLUGS.some((slug) => uri === `${TYPE_C_BASE_URI}/${slug}`);
}

function findExtendedFallbackPage(uri: string) {
  const directMatch = findFallbackPage(uri);

  if (directMatch) {
    return directMatch;
  }

  if (isTypeCBrandUri(uri)) {
    return findFallbackPage(TYPE_C_BASE_URI) ?? null;
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

export async function getPageByUri(uri: string) {
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
      html: node.content,
    });
  }

  if (node?.uri) {
    page.uri = normalizeUri(node.uri);
  }

  return page;
}

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

  const typeCBrandParams = TYPE_C_BRAND_SLUGS.map((slug) => ({
    slug: ["avtomobili-type-c", slug],
  }));

  return [...pageParams, ...typeCBrandParams];
}
