import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export const dynamic = "force-dynamic";
