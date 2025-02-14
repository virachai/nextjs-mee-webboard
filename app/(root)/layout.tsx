import Footer from "@/app/components/Footer/Footer";
import Nav from "@/app/components/Nav/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
