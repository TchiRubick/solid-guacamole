import { currentSession } from "@/actions/auth/current-session";

import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: () => currentSession()
  })

  return session;
};
