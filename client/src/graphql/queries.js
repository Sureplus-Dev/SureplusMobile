/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserCards = /* GraphQL */ `
  query GetUserCards($id: ID!) {
    getUserCards(id: $id) {
      id
      userID
      name
      balance
      createdAt
      updatedAt
    }
  }
`;
export const listUserCardss = /* GraphQL */ `
  query ListUserCardss(
    $filter: ModelUserCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCardss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        name
        balance
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubscriptionServices = /* GraphQL */ `
  query GetSubscriptionServices($id: ID!) {
    getSubscriptionServices(id: $id) {
      id
      userID
      transactionID
      accountID
      name
      cost
      period
      firstAddedDate
      lastDate
      category
      source
      createdAt
      updatedAt
    }
  }
`;
export const listSubscriptionServicess = /* GraphQL */ `
  query ListSubscriptionServicess(
    $filter: ModelSubscriptionServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionServicess(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        transactionID
        accountID
        name
        cost
        period
        firstAddedDate
        lastDate
        category
        source
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const accountByUser = /* GraphQL */ `
  query AccountByUser(
    $userID: String
    $balance: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    accountByUser(
      userID: $userID
      balance: $balance
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        name
        balance
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const serviceByUser = /* GraphQL */ `
  query ServiceByUser(
    $userID: String
    $lastDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    serviceByUser(
      userID: $userID
      lastDate: $lastDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        transactionID
        accountID
        name
        cost
        period
        firstAddedDate
        lastDate
        category
        source
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const serviceByUserAdded = /* GraphQL */ `
  query ServiceByUserAdded(
    $userID: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSubscriptionServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    serviceByUserAdded(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        transactionID
        accountID
        name
        cost
        period
        firstAddedDate
        lastDate
        category
        source
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
