import Navbar from "@/components/custom/Navbar";
import Header from "@/components/custom/Navbar";

export default function layout({
  children
}: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
    </>
  );
}