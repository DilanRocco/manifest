import { Fest, GetFestQuery, GetFestQueryVariables, GetHistoryQuery, GetHistoryQueryVariables, GetUsersQuery, GetUsersQueryVariables, History, User } from '@/generated/graphql';
import { getFest } from '@/graphql/fest';
import { getHistory } from '@/graphql/history';
import { getUser } from '@/graphql/user';
import { RefetchQueriesFunction, useQuery, useSubscription } from '@apollo/client';
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery';
import React, { createContext, useContext } from 'react';

interface FestContextType {
  fest: Fest | undefined;
  history: History | undefined;
  user: User | undefined;
  loading: boolean;
  error: any;
  refresh: () => void;
}


const FestContext = createContext<FestContextType | undefined>(undefined);

export const FestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading: festLoading, error: festError, data: festData, refetch: festRefetch } = useQuery<GetFestQuery, GetFestQueryVariables>(getFest);
  const { loading: historyLoading, error: historyError, data: historyData, refetch: historyRefetch } = useQuery<GetHistoryQuery, GetHistoryQueryVariables>(getHistory);
  const { loading: userLoading, error: userError, data: userData, refetch: userRefetch } = useQuery<GetUsersQuery, GetUsersQueryVariables>(getUser);

  const refresh = () => {
    festRefetch();
    historyRefetch();
    userRefetch();
  };

  return (
    <FestContext.Provider 
      value={{ 
        fest: festData?.festCollection?.edges[0].node as Fest,
        history: historyData?.historyCollection?.edges[0].node as History,
        user: userData?.userCollection?.edges[0].node as User,
        loading: (festLoading || historyLoading || userLoading), 
        error: festError ?? historyError ?? userError,
        refresh: refresh,
      }}
    >
      {children}
    </FestContext.Provider>
  );
};


export const useDatabase = () => {
  const context = useContext(FestContext);
  if (!context) {
    throw new Error('useFest must be used within a FestProvider');
  }
  return context;
};