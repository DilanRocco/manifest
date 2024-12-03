import { GetFestQuery, GetFestQueryVariables, GetHistoryQuery, GetHistoryQueryVariables, GetUsersQuery } from '@/generated/graphql';
import { getFest } from '@/graphql/fest';
import { getHistory } from '@/graphql/history';
import { getUser } from '@/graphql/user';
import { useQuery } from '@apollo/client';
import React, { createContext, useContext } from 'react';

interface FestContextType {
  fest: GetFestQuery | undefined;
  history: GetHistoryQuery | undefined;
  user: GetUsersQuery | undefined;
  loading: boolean;
  error: any;
}

const FestContext = createContext<FestContextType | undefined>(undefined);

export const FestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading: festLoading, error: festError, data: festData } = useQuery<GetFestQuery, GetFestQueryVariables>(getFest);
  const { loading: historyLoading, error: historyError, data: historyData } = useQuery<GetHistoryQuery, GetHistoryQueryVariables>(getHistory);
  const { loading: userLoading, error: userError, data: userData } = useQuery<GetFestQuery, GetFestQueryVariables>(getUser);

  return (
    <FestContext.Provider 
      value={{ 
        fest: festData, 
        history: historyData,
        user: userData,
        loading: (festLoading || historyLoading || userLoading), 
        error: festError ?? historyError ?? userError
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