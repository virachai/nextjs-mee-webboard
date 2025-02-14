// import Footer from "@/app/components/Footer/Footer";
import Nav from "@/app/components/Nav/Nav";
import SideNav from "@/app/components/ui/homepage/sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="flex md:flex-row flex-col -mt-[56px] md:-mt-[64px] pt-[56px] md:pt-[64px] h-screen md:overflow-hidden">
        <div className="flex-none w-full md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow md:p-6 px-4 py-12 md:overflow-y-auto">
          {children}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
