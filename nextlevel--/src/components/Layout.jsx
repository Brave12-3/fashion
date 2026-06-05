import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, activePage = "" }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <Header activePage={activePage} />
      <main style={{ flex:1, paddingTop:56 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}