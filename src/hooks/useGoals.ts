import { useQuery, useMutation } from '@apollo/client';
import { Goal, Columns, ColumnKey } from '../types/goals';
import { GET_GOALS, CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from '../graphql/goals';

export const useGoals = (userId: string) => {
  const { data, loading, error, refetch } = useQuery(GET_GOALS, {
    variables: { userid: userId },
    fetchPolicy: 'cache-and-network'
  });

  const [createGoalMutation] = useMutation(CREATE_GOAL);
  const [updateGoalMutation] = useMutation(UPDATE_GOAL);
  const [deleteGoalMutation] = useMutation(DELETE_GOAL);

  const organizeGoalsByColumn = (goals: Goal[]): Columns => {
    return goals.reduce((acc: Columns, goal) => {
      const column = goal.type;
      acc[column].push(goal);
      return acc;
    }, {
      shortTerm: [],
      mediumTerm: [],
      longTerm: []
    });
  };

  const createGoal = async (text: string, tags: string[], color: String, type: ColumnKey) => {
    try {
      await createGoalMutation({
        variables: {
          userid: userId,
          text:   text,
          type:   type,
          tags:   tags,
          color:  color,
        }
      });
      refetch();
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    try {
      await updateGoalMutation({
        variables: {
          id: goalId,
          userid: userId,
          ...updates
        }
      });
      refetch();
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      await deleteGoalMutation({
        variables: {
          id: goalId,
          userid: userId
        }
      });
      refetch();
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  };
  const goals = data?.goalsCollection?.edges?.map((edge: { node: any; }) => edge.node) ?? [];
  const columns = organizeGoalsByColumn(goals);

  return {
    columns,
    loading,
    error,
    createGoal,
    updateGoal,
    deleteGoal
  };
};
