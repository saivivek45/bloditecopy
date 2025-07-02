import Header from "@/components/custom/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Header/>
      <main>{children}</main>
    </div>
  );
}