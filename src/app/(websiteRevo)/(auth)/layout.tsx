import Providers from "@/components/providers/Providers";
import { ResetPasswordProvider } from "@/components/providers/reset-password-provider";
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <Providers>
        <ResetPasswordProvider>
          {children}
        </ResetPasswordProvider>
      </Providers>
    </div>
  );
}
