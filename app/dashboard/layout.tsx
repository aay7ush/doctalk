import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { PlusIcon, ScrollText } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
            prefetch={false}
          >
            <ScrollText className="size-6" />
            <span>DocTalk</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Documents</Link>
          </Button>
          <Button variant="outline" size="sm">
            Pricing
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" className="rounded-full" asChild>
            <Link href="/dashboard/upload">
              <PlusIcon className="size-5" />
            </Link>
          </Button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-10 rounded-full ring-2 ring-white",
              },
            }}
          />
        </div>
      </header>
      {children}
    </main>
  );
}
