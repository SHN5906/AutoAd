import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen mesh-bg">
            <Sidebar />
            <main className="lg:pl-[220px] pt-14 lg:pt-0 min-h-screen">
                <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
