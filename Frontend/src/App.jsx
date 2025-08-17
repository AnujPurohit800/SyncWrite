import { Toaster } from "sonner";
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider>
          <AuthContextProvider>
            <AppRoutes />
          </AuthContextProvider>
        </SocketContextProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
