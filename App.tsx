import Router from "./src/navigation/Router";
import AuthenticatedUserProvider from "./src/provider/ContextProvider";

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <Router />
    </AuthenticatedUserProvider>
  );
}
