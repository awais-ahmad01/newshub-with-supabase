
import Header from "../../components/header";
export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mt-16">{children}</main>
    </>
  );
}
