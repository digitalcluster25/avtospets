import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { tr } from "@/components/site/i18n";
import { SITE_LANGUAGE_COOKIE_KEY } from "@/components/site/site-language";
import { PageView } from "@/components/site/page-view";
import { getAllRouteParams, getPageBySegments } from "@/lib/site/page-service";

export const revalidate = 300;

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateStaticParams() {
  return getAllRouteParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await getPageBySegments(resolvedParams.slug ?? []);

  if (!page) {
    return {};
  }

  const cookieStore = await cookies();
  const language =
    cookieStore.get(SITE_LANGUAGE_COOKIE_KEY)?.value === "en" ? "en" : "ua";

  return {
    title: tr(language, page.metaTitle ?? page.title),
    description: page.description
      ? tr(language, page.description)
      : undefined,
  };
}

export default async function MarketingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const page = await getPageBySegments(resolvedParams.slug ?? []);

  if (!page) {
    notFound();
  }

  return <PageView page={page} />;
}
