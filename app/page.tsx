import { Button } from "@/components/ui/button";
import {
  BookMarkedIcon,
  CombineIcon,
  FolderIcon,
  LockIcon,
  ReplyIcon,
  UploadIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    id: 1,
    title: "Easy Upload",
    description: "Seamlessly upload your PDFs to the DocTalk platform.",
    icon: UploadIcon,
  },
  {
    id: 2,
    title: "Collaborative Discussion",
    description: "Engage in real-time discussions around your documents.",
    icon: ReplyIcon,
  },
  {
    id: 3,
    title: "Seamless Organization",
    description: "Keep your documents organized and easily accessible.",
    icon: FolderIcon,
  },
  {
    id: 4,
    title: "Intuitive Annotation",
    description: "Annotate your PDFs with ease, adding comments and insights.",
    icon: BookMarkedIcon,
  },
  {
    id: 5,
    title: "Secure Sharing",
    description: "Share your PDFs securely with your team or clients.",
    icon: LockIcon,
  },
  {
    id: 6,
    title: "Seamless Integration",
    description: "Integrate DocTalk with your existing workflows and tools.",
    icon: CombineIcon,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <article className="flex-1">
        <Hero />
        <Features />
        <CTA />
      </article>
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 container px-4 md:px-6 grid gap-6 lg:gap-12">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Talk with your PDFs
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          DocTalk is the easiest way to communicate with your uploaded PDFs.
          Simply upload your document and start chatting.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button size="lg" asChild>
            <Link href="/dashboard" prefetch={false}>
              Get Started
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features" prefetch={false}>
              Learn More
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src="https://i.imgur.com/VciRSTI.jpeg"
        width={2432}
        height={1442}
        alt="Hero"
        className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 lg:max-w-5xl mx-auto"
      />
    </section>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 bg-muted container px-4 md:px-6"
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">
        Features that Empower Your Workflow
      </h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
        {FEATURES.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center justify-center gap-2"
          >
            <feature.icon className="size-12 text-primary" />
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="text-muted-foreground text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="w-full py-12 md:py-24 border-t container grid items-center justify-items-center gap-4 px-4 text-center md:px-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Experience the power of DocTalk
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Start communicating with your PDFs today and see how it can transform
          your workflow.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Button size="lg" asChild>
          <Link href="/dashboard" prefetch={false}>
            Get Started
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#features" prefetch={false}>
            Learn More
          </Link>
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} DocTalk. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#"
          className="hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
