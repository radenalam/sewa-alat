import Sidebar from "@/components/sideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    </section>
  );
}
