import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className="text-3xl font-bold mb-6">Bienvenue 🎉</h2>
        <p className="text-lg mb-4">
          Ceci est la page d'accueil de notre front-end Next.js.
        </p>
        <p className="text-base mb-6">
          Utilisez la navigation ci-dessus pour explorer la liste des écoles et des étudiants.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/schools"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Voir les écoles
          </Link>
          <Link
            href="/students"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Voir les étudiants
          </Link>
        </div>
      </main>
    </div>
  );
}
