import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return {
    title: page.metaTitle ?? page.title,
    description: page.description,
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
