

export default function RecommenderLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container-fluid px-4 py-8 min-h-screen bg-linear-to-b from-black via-transparent to-black">
            {children}
        </main>
    )
}