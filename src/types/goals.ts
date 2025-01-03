export type ColumnKey = 'shortTerm' | 'longTerm';
export type LabelKey = 'work' | 'personal' | 'health' | 'finance' | 'education';

export interface Goal {
  id: string;
  text: string;
  tags: LabelKey[];
  user_id: string; 
  type: ColumnKey;
  color: String 
  created_at?: string;
}

export interface Columns {
  shortTerm: Goal[];
  longTerm: Goal[];
}

export interface NewGoal {
  text: string;
  labels: LabelKey[];
  column: ColumnKey;
}
