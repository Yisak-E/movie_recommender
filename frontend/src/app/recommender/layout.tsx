

export default function RecommenderLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container-fluid px-4 py-8 min-h-screen bg-gray-500">
            {children}
        </main>
    )
}