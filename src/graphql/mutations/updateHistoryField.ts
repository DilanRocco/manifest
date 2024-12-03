import { useMutation } from '@apollo/client';
import { createUpdateHistoryFieldMutation } from '../history';

export const updateField = async (field: string, userId: string, value: string) => {
  const UPDATE_HISTORY_FIELD = createUpdateHistoryFieldMutation(field, value);

  const [updateHistoryField] = useMutation(UPDATE_HISTORY_FIELD);

  await updateHistoryField({
    variables: {
      userid: userId,
      value: value,
    },
  });
};
