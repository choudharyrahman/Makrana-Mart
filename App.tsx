import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import ProductsPage from "@/pages/products";
import ProductDetailPage from "@/pages/product-detail";
import CategoriesPage from "@/pages/categories";
import CategoryDetailPage from "@/pages/category-detail";
import SellersPage from "@/pages/sellers";
import SellerProfilePage from "@/pages/seller-profile";
import LoginPage from "@/pages/login";
import RegisterBuyerPage from "@/pages/register-buyer";
import RegisterSellerPage from "@/pages/register-seller";
import SellerDashboardPage from "@/pages/seller-dashboard";
import SellerProductsPage from "@/pages/seller-products";
import NewProductPage from "@/pages/seller-products-new";
import SellerSubscriptionPage from "@/pages/seller-subscription";
import SubscriptionSuccessPage from "@/pages/seller-subscription-success";
import SellerInquiriesPage from "@/pages/seller-inquiries";
import BuyerDashboardPage from "@/pages/buyer-dashboard";
import BuyerOrdersPage from "@/pages/buyer-orders";
import BuyerWishlistPage from "@/pages/buyer-wishlist";
import CheckoutPage from "@/pages/checkout";
import OrderSuccessPage from "@/pages/order-success";
import NotificationsPage from "@/pages/notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

const FULL_SCREEN_ROUTES = ["/login", "/register/buyer", "/register/seller", "/seller/subscription/success", "/orders/:orderId/success"];

function isFullScreen(path: string): boolean {
  return FULL_SCREEN_ROUTES.some((r) => {
    const regex = new RegExp("^" + r.replace(/:[^/]+/g, "[^/]+") + "$");
    return regex.test(path);
  });
}

function AppShell() {
  return (
    <Switch>
      {/* Full-screen pages (no navbar/footer) */}
      <Route path="/login" component={LoginPage} />
      <Route path="/register/buyer" component={RegisterBuyerPage} />
      <Route path="/register/seller" component={RegisterSellerPage} />
      <Route path="/seller/subscription/success" component={SubscriptionSuccessPage} />
      <Route path="/orders/:orderId/success" component={OrderSuccessPage} />

      {/* Layout pages */}
      <Route>
        {() => (
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/products" component={ProductsPage} />
                <Route path="/products/:id" component={ProductDetailPage} />
                <Route path="/categories" component={CategoriesPage} />
                <Route path="/categories/:slug" component={CategoryDetailPage} />
                <Route path="/sellers" component={SellersPage} />
                <Route path="/sellers/:id" component={SellerProfilePage} />
                <Route path="/seller/dashboard" component={SellerDashboardPage} />
                <Route path="/seller/products" component={SellerProductsPage} />
                <Route path="/seller/products/new" component={NewProductPage} />
                <Route path="/seller/subscription" component={SellerSubscriptionPage} />
                <Route path="/seller/inquiries" component={SellerInquiriesPage} />
                <Route path="/buyer/dashboard" component={BuyerDashboardPage} />
                <Route path="/buyer/orders" component={BuyerOrdersPage} />
                <Route path="/buyer/wishlist" component={BuyerWishlistPage} />
                <Route path="/checkout/:productId" component={CheckoutPage} />
                <Route path="/notifications" component={NotificationsPage} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
            <BottomNav />
          </div>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AppShell />
            </WouterRouter>
            <Toaster />
          </AppProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
