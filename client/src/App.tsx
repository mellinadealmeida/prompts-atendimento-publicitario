import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SelfAssessment from "./pages/SelfAssessment";
import Biblioteca from "./pages/Biblioteca";
import Cursos from "./pages/Cursos";
import Mentoria from "./pages/Mentoria";
import Videos from "./pages/Videos";
import Agencias from "./pages/Agencias";
import Cases from "./pages/Cases";
import Sobre from "./pages/Sobre";
import MinhaArea from "./pages/MinhaArea";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      {/* Public pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/biblioteca"} component={Biblioteca} />
      <Route path={"/cursos"} component={Cursos} />
      <Route path={"/mentoria"} component={Mentoria} />
      <Route path={"/videos"} component={Videos} />
      <Route path={"/agencias"} component={Agencias} />
      <Route path={"/cases"} component={Cases} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/assessment"} component={SelfAssessment} />

      {/* Authenticated pages */}
      <Route path={"/minha-area"} component={MinhaArea} />

      {/* Admin dashboard */}
      <Route path={"/dashboard"} component={AdminDashboard} />

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
