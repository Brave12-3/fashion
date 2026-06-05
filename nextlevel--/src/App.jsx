import { useEffect, useState } from "react";
import { AuthProvider } from "./lib/AuthContext";

// Public pages
import CollectionsPage from "./pages/CollectionsPage";
import BespokePage     from "./pages/BespokePage";
import AboutPage       from "./pages/AboutPage";
import ContactPage     from "./pages/ContactPage";

// Admin pages
import AdminLoginPage       from "./admin/pages/AdminLoginPage";
import AdminDashboardPage   from "./admin/pages/AdminDashboardPage";
import AdminProductsPage    from "./admin/pages/AdminProductsPage";
import AdminAddProductPage  from "./admin/pages/AdminAddProductPage";
import AdminEditProductPage from "./admin/pages/AdminEditProductPage";

// ─────────────────────────────────────────────
//  HOW ROUTING WORKS
//
//  Public storefront  →  http://localhost:5173/
//  Collections        →  /#collections
//  Bespoke            →  /#bespoke
//  About              →  /#about
//  Contact            →  /#contact
//
//  Admin login        →  /#admin/login
//  Admin dashboard    →  /#admin
//  Admin products     →  /#admin/products
//  Add product        →  /#admin/products/new
//  Edit product       →  /#admin/products/:id/edit
// ─────────────────────────────────────────────

function parseRoute() {
  const raw  = window.location.hash;          // e.g. "#about"
  const hash = raw.replace("#", "").toLowerCase().trim();

  // ── Admin routes (must start with "admin") ──
  if (hash === "admin/login")        return { page: "admin-login" };
  if (hash === "admin")              return { page: "admin-dashboard" };

  const editMatch = hash.match(/^admin\/products\/(.+)\/edit$/);
  if (editMatch)                     return { page: "admin-edit", id: editMatch[1] };
  if (hash === "admin/products/new") return { page: "admin-add" };
  if (hash === "admin/products")     return { page: "admin-products" };

  // ── Public routes ──
  // Empty hash OR "#collections" → storefront home
  if (hash === "" || hash === "collections") return { page: "collections" };
  if (hash === "bespoke")            return { page: "bespoke" };
  if (hash === "about")              return { page: "about" };
  if (hash === "contact")            return { page: "contact" };

  // Fallback → storefront home
  return { page: "collections" };
}

function Router() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  switch (route.page) {
    // ── Admin ──
    case "admin-login":     return <AdminLoginPage />;
    case "admin-dashboard": return <AdminDashboardPage />;
    case "admin-products":  return <AdminProductsPage />;
    case "admin-add":       return <AdminAddProductPage />;
    case "admin-edit":      return <AdminEditProductPage productId={route.id} />;

    // ── Public ──
    case "bespoke":         return <BespokePage />;
    case "about":           return <AboutPage />;
    case "contact":         return <ContactPage />;
    default:                return <CollectionsPage />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}