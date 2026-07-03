import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { TopNav } from "@/components/TopNav";
import { FloatingBackground } from "@/components/FloatingBackground";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center shadow-soft">
        <div className="text-7xl">🧭</div>
        <h1 className="mt-4 text-3xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Бұл бет табылмады</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center shadow-soft">
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Düniyetanu — Interactive World Studies for Kids" },
      {
        name: "description",
        content:
          "Interactive trilingual primary school platform for Düniyetanu: 34 lessons across 8 chapters with quizzes, games and progress tracking.",
      },
      { property: "og:title", content: "Düniyetanu — Interactive World Studies for Kids" },
      {
        property: "og:description",
        content:
          "Interactive trilingual primary school platform for Düniyetanu: 34 lessons across 8 chapters with quizzes, games and progress tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Düniyetanu — Interactive World Studies for Kids" },
      {
        name: "twitter:description",
        content:
          "Interactive trilingual primary school platform for Düniyetanu: 34 lessons across 8 chapters with quizzes, games and progress tracking.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f3c2895f-c3c5-4d57-9bab-6600b77b70c4/id-preview-a24ac857--95e5a1aa-7263-4164-9532-f0d03d85fe96.lovable.app-1778521945976.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f3c2895f-c3c5-4d57-9bab-6600b77b70c4/id-preview-a24ac857--95e5a1aa-7263-4164-9532-f0d03d85fe96.lovable.app-1778521945976.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <FloatingBackground />
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
