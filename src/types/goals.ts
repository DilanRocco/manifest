export type ColumnKey = 'shortTerm' | 'mediumTerm' | 'longTerm';
export type LabelKey = 'work' | 'personal' | 'health' | 'finance' | 'education';

export interface Goal {
  id: string;
  text: string;
  labels: LabelKey[];
  user_id: string;  // Added for Supabase
  column_type: ColumnKey;  // Added for Supabase
  created_at?: string;
}

export interface Columns {
  shortTerm: Goal[];
  mediumTerm: Goal[];
  longTerm: Goal[];
}

export interface NewGoal {
  text: string;
  labels: LabelKey[];
  column: ColumnKey;
}
