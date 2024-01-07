import { Navbars } from "../../../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbars />
      {children}
    </>
  );
}
