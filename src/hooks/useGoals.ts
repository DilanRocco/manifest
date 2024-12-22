import { useQuery, useMutation } from '@apollo/client';
import { Goal, Columns, ColumnKey } from '../types/goals';
import { GET_GOALS, CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from '../graphql/goals';
import { useAuth } from '@/provider/authProvider';

export const useGoals = () => {
  const authId = useAuth().user?.id
  const { data, loading, error, refetch } = useQuery(GET_GOALS, {
    variables: { userid: authId },
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
    console.log(authId)
    console.log(tags)
    try {
      await createGoalMutation({
        variables: {
          userid: authId,
          text:   text,
          type:   type,
          tags:   JSON.stringify(tags),
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
          userid: authId,
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
          userid: authId
        }
      });
      refetch();
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  };

  var goals = data?.goalsCollection?.edges?.map((edge: { node: any; }) => edge.node) ?? [];
  var newGoals = goals;
  
  if (goals.length > 0) {
    newGoals = goals.map((g: Goal) => {
      try {
        return {
          ...g,
          tags: typeof g.tags === 'string' ? JSON.parse(g.tags) : g.tags
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
  
  
  
  const columns = organizeGoalsByColumn(newGoals);

  return {
    columns,
    loading,
    error,
    createGoal,
    updateGoal,
    deleteGoal
  };
};
