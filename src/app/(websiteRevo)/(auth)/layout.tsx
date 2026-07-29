import Providers from "@/components/providers/Providers";
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <Providers> {children}</Providers>
    </div>
  );
}
