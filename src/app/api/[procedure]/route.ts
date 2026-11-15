import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { controller } from '@/app/web/controller';

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api',
    req,
    router: controller,
    createContext: () => ({}),
  });
}

export { handler as GET, handler as POST };
