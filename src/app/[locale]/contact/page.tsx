import { mainPageMetadata } from "@/lib/seo/metadata";
import { ContentPage } from "@/components/content-page";

export const generateMetadata = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => mainPageMetadata(params, "contact");

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <ContentPage page="contact" params={params} />;
}
