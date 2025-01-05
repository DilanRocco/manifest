import { useQuery, useMutation } from '@apollo/client';
import { Goal, Columns, ColumnKey, LabelKey } from '../types/goals';
import { GET_GOALS, CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL, UPDATE_GOAL_ORDER } from '../graphql/goals';
import { useAuth } from '@/provider/authProvider';

interface GoalsQueryResult {
  goalsCollection: {
    edges: Array<{
      node: Goal;
    }>;
  };
}

interface UpdateGoalMutationResult {
  updategoalsCollection: {
    __typename: string;
    affectedCount: number;
  };
}


export const useGoals = () => {
  const authId = useAuth().user?.id;
  const { data, loading, error, refetch } = useQuery<GoalsQueryResult>(GET_GOALS, {
    variables: { userid: authId },
    fetchPolicy: 'cache-and-network'
  });

  const [createGoalMutation] = useMutation(CREATE_GOAL);
  const [updateGoalOrderMutation] = useMutation(CREATE_GOAL);
  const [updateGoalMutation] = useMutation<UpdateGoalMutationResult>(UPDATE_GOAL, {
    update(cache, { data: mutationData }) {
      if (!mutationData?.updategoalsCollection) {
        console.error('Unexpected mutation result structure:', mutationData);
        return;
      }
  
      const { affectedCount } = mutationData.updategoalsCollection;
  
      if (affectedCount === 0) {
        console.warn('No goals were updated');
        return;
      }
  
      // Since we don't have the updated goal data in the mutation result,
      // we need to refetch the goals to ensure the cache is up-to-date
      cache.evict({ fieldName: 'goalsCollection' });
      cache.gc();
    }
  });
  
  
  const [deleteGoalMutation] = useMutation(DELETE_GOAL);

  const organizeGoalsByColumn = (goals: Goal[]): Columns => {
    return goals.reduce((acc: Columns, goal) => {
      const column = goal.type;
      acc[column].push(goal);
      return acc;
    }, {
      shortTerm: [],
      longTerm: []
    });
  };

  const createGoal = async (text: string, tags: string[], color: String, type: ColumnKey) => {
    try {
      await createGoalMutation({
        variables: {
          userid: authId,
          text: text,
          type: type,
          tags: JSON.stringify(tags),
          color: color,
        }
      });
      refetch();
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>, newIndex?: number) => {
  console.log(goalId)
  console.log(updates)
  console.log(newIndex)
  try {
    await updateGoalMutation({
      variables: {
        id: goalId,
        userid: authId,
        ...updates
      }
    });
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

  const updateGoalOrder = async (columnId: ColumnKey, goalIds: string[]) => {
    try {
      await updateGoalOrderMutation({
        variables: {
          columnId,
          goalIds
        }
      });
    } catch (error) {
      console.error('Error updating goal order:', error);
      throw error;
    }
  };
  

  const deleteGoal = async (goalId: string) => {
    try {
      await deleteGoalMutation({
        variables: {
          id: goalId,
          userid: authId
        }
      });
      refetch();
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  };

  let goals = data?.goalsCollection?.edges?.map((edge) => edge.node) ?? [];
  if (goals.length > 0) {
    goals = goals.map((g: Goal) => {
      try {
        return {
          ...g,
        };
      } catch (error) {
        console.error(`Error parsing tags for goal:`, error);
        return {
          ...g,
          tags: []
        };
      }
    });
  }

  const columns = organizeGoalsByColumn(goals);

  return {
    goals,
    columns,
    loading,
    error,
    createGoal,
    updateGoal,
    deleteGoal,
    updateGoalOrder
  };
};

