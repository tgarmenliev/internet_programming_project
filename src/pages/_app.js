import { ClerkProvider } from '@clerk/nextjs'
import '@/styles/globals.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
