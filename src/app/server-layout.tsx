import type { Metadata } from "next";

// Export metadata
export const metadata: Metadata = {
  title: "LegalAI",
  description: "My App Description",
};

// Server-side layout, only handles server-side logic
export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
