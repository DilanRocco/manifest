export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Opaque: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `feedback` collection */
  deleteFromfeedbackCollection: FeedbackDeleteResponse;
  /** Deletes zero or more records from the `fest` collection */
  deleteFromfestCollection: FestDeleteResponse;
  /** Deletes zero or more records from the `history` collection */
  deleteFromhistoryCollection: HistoryDeleteResponse;
  /** Deletes zero or more records from the `user` collection */
  deleteFromuserCollection: UserDeleteResponse;
  /** Adds one or more `feedback` records to the collection */
  insertIntofeedbackCollection?: Maybe<FeedbackInsertResponse>;
  /** Adds one or more `fest` records to the collection */
  insertIntofestCollection?: Maybe<FestInsertResponse>;
  /** Adds one or more `history` records to the collection */
  insertIntohistoryCollection?: Maybe<HistoryInsertResponse>;
  /** Adds one or more `user` records to the collection */
  insertIntouserCollection?: Maybe<UserInsertResponse>;
  /** Updates zero or more records in the `feedback` collection */
  updatefeedbackCollection: FeedbackUpdateResponse;
  /** Updates zero or more records in the `fest` collection */
  updatefestCollection: FestUpdateResponse;
  /** Updates zero or more records in the `history` collection */
  updatehistoryCollection: HistoryUpdateResponse;
  /** Updates zero or more records in the `user` collection */
  updateuserCollection: UserUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromfeedbackCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FeedbackFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromfestCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FestFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromhistoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<HistoryFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromuserCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntofeedbackCollectionArgs = {
  objects: Array<FeedbackInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntofestCollectionArgs = {
  objects: Array<FestInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntohistoryCollectionArgs = {
  objects: Array<HistoryInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntouserCollectionArgs = {
  objects: Array<UserInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdatefeedbackCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FeedbackFilter>;
  set: FeedbackUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatefestCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FestFilter>;
  set: FestUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatehistoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<HistoryFilter>;
  set: HistoryUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateuserCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserFilter>;
  set: UserUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `feedback` */
  feedbackCollection?: Maybe<FeedbackConnection>;
  /** A pagable collection of type `fest` */
  festCollection?: Maybe<FestConnection>;
  /** A pagable collection of type `history` */
  historyCollection?: Maybe<HistoryConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `user` */
  userCollection?: Maybe<UserConnection>;
};


/** The root type for querying data */
export type QueryFeedbackCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FeedbackFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedbackOrderBy>>;
};


/** The root type for querying data */
export type QueryFestCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FestOrderBy>>;
};


/** The root type for querying data */
export type QueryHistoryCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<HistoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<HistoryOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryUserCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type Feedback = Node & {
  __typename?: 'feedback';
  created_at: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  last?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
};

export type FeedbackConnection = {
  __typename?: 'feedbackConnection';
  edges: Array<FeedbackEdge>;
  pageInfo: PageInfo;
};

export type FeedbackDeleteResponse = {
  __typename?: 'feedbackDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Feedback>;
};

export type FeedbackEdge = {
  __typename?: 'feedbackEdge';
  cursor: Scalars['String']['output'];
  node: Feedback;
};

export type FeedbackFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FeedbackFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  first?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  last?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<FeedbackFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FeedbackFilter>>;
};

export type FeedbackInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['String']['input']>;
};

export type FeedbackInsertResponse = {
  __typename?: 'feedbackInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Feedback>;
};

export type FeedbackOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  first?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  last?: InputMaybe<OrderByDirection>;
};

export type FeedbackUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['String']['input']>;
};

export type FeedbackUpdateResponse = {
  __typename?: 'feedbackUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Feedback>;
};

export type Fest = Node & {
  __typename?: 'fest';
  fest_text?: Maybe<Scalars['JSON']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user_id: Scalars['UUID']['output'];
};

export type FestConnection = {
  __typename?: 'festConnection';
  edges: Array<FestEdge>;
  pageInfo: PageInfo;
};

export type FestDeleteResponse = {
  __typename?: 'festDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Fest>;
};

export type FestEdge = {
  __typename?: 'festEdge';
  cursor: Scalars['String']['output'];
  node: Fest;
};

export type FestFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FestFilter>>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<FestFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FestFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type FestInsertInput = {
  fest_text?: InputMaybe<Scalars['JSON']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type FestInsertResponse = {
  __typename?: 'festInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Fest>;
};

export type FestOrderBy = {
  user_id?: InputMaybe<OrderByDirection>;
};

export type FestUpdateInput = {
  fest_text?: InputMaybe<Scalars['JSON']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type FestUpdateResponse = {
  __typename?: 'festUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Fest>;
};

export type History = Node & {
  __typename?: 'history';
  fest_time?: Maybe<Scalars['JSON']['output']>;
  max_streak?: Maybe<Scalars['BigInt']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  streak?: Maybe<Scalars['BigInt']['output']>;
  times_listened_today?: Maybe<Scalars['BigInt']['output']>;
  user_id: Scalars['UUID']['output'];
};

export type HistoryConnection = {
  __typename?: 'historyConnection';
  edges: Array<HistoryEdge>;
  pageInfo: PageInfo;
};

export type HistoryDeleteResponse = {
  __typename?: 'historyDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<History>;
};

export type HistoryEdge = {
  __typename?: 'historyEdge';
  cursor: Scalars['String']['output'];
  node: History;
};

export type HistoryFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<HistoryFilter>>;
  max_streak?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<HistoryFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<HistoryFilter>>;
  streak?: InputMaybe<BigIntFilter>;
  times_listened_today?: InputMaybe<BigIntFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type HistoryInsertInput = {
  fest_time?: InputMaybe<Scalars['JSON']['input']>;
  max_streak?: InputMaybe<Scalars['BigInt']['input']>;
  streak?: InputMaybe<Scalars['BigInt']['input']>;
  times_listened_today?: InputMaybe<Scalars['BigInt']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type HistoryInsertResponse = {
  __typename?: 'historyInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<History>;
};

export type HistoryOrderBy = {
  max_streak?: InputMaybe<OrderByDirection>;
  streak?: InputMaybe<OrderByDirection>;
  times_listened_today?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type HistoryUpdateInput = {
  fest_time?: InputMaybe<Scalars['JSON']['input']>;
  max_streak?: InputMaybe<Scalars['BigInt']['input']>;
  streak?: InputMaybe<Scalars['BigInt']['input']>;
  times_listened_today?: InputMaybe<Scalars['BigInt']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type HistoryUpdateResponse = {
  __typename?: 'historyUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<History>;
};

export type User = Node & {
  __typename?: 'user';
  created_at: Scalars['Datetime']['output'];
  first?: Maybe<Scalars['String']['output']>;
  last?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user_id: Scalars['UUID']['output'];
};

export type UserConnection = {
  __typename?: 'userConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserDeleteResponse = {
  __typename?: 'userDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type UserEdge = {
  __typename?: 'userEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<UserFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  first?: InputMaybe<StringFilter>;
  last?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<UserFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<UserFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type UserInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserInsertResponse = {
  __typename?: 'userInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type UserOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  first?: InputMaybe<OrderByDirection>;
  last?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type UserUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserUpdateResponse = {
  __typename?: 'userUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User>;
};

export type GetFestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFestQuery = { __typename?: 'Query', festCollection?: { __typename?: 'festConnection', edges: Array<{ __typename?: 'festEdge', node: { __typename?: 'fest', user_id: any, fest_text?: any | null } }> } | null };

export type CreateFestMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['UUID']['input']>;
  festtext?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type CreateFestMutation = { __typename?: 'Mutation', insertIntofestCollection?: { __typename?: 'festInsertResponse', records: Array<{ __typename?: 'fest', user_id: any }> } | null };

export type UpdateFestTextMutationVariables = Exact<{
  userid: Scalars['UUID']['input'];
  festtext?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type UpdateFestTextMutation = { __typename?: 'Mutation', updatefestCollection: { __typename?: 'festUpdateResponse', affectedCount: number } };

export type GetHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHistoryQuery = { __typename?: 'Query', historyCollection?: { __typename?: 'historyConnection', edges: Array<{ __typename?: 'historyEdge', node: { __typename?: 'history', user_id: any, streak?: any | null, max_streak?: any | null, fest_time?: any | null, times_listened_today?: any | null } }> } | null };

export type CreateHistoryMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['UUID']['input']>;
  streak?: InputMaybe<Scalars['BigInt']['input']>;
  maxstreak?: InputMaybe<Scalars['BigInt']['input']>;
  festTime?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type CreateHistoryMutation = { __typename?: 'Mutation', insertIntohistoryCollection?: { __typename?: 'historyInsertResponse', records: Array<{ __typename?: 'history', user_id: any }> } | null };

export type UpdateHistoryFieldMutationVariables = Exact<{
  userid: Scalars['UUID']['input'];
  streak?: InputMaybe<Scalars['BigInt']['input']>;
  max_streak?: InputMaybe<Scalars['BigInt']['input']>;
  fest_time?: InputMaybe<Scalars['JSON']['input']>;
  times_listened_today?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type UpdateHistoryFieldMutation = { __typename?: 'Mutation', updatehistoryCollection: { __typename?: 'historyUpdateResponse', affectedCount: number } };

export type UpdateTimesListenedTodayMutationVariables = Exact<{
  userid: Scalars['UUID']['input'];
  times_listened_today?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type UpdateTimesListenedTodayMutation = { __typename?: 'Mutation', updatehistoryCollection: { __typename?: 'historyUpdateResponse', affectedCount: number } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', userCollection?: { __typename?: 'userConnection', edges: Array<{ __typename?: 'userEdge', node: { __typename?: 'user', user_id: any, created_at: any, first?: string | null, last?: string | null } }> } | null };

export type CreateUserMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['UUID']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', insertIntouserCollection?: { __typename?: 'userInsertResponse', records: Array<{ __typename?: 'user', user_id: any }> } | null };
