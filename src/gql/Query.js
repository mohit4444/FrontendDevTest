import { gql } from "@apollo/client";

export const EVENT_QUERY = gql`
  query EventQuery {
    listEvents {
        items {
          id
          title
          startDate
          endDate
          logoUrl
          descriptionHTML
          url
        }
      }
  }
`;