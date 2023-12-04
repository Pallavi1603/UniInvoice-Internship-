const { gql } = require("@apollo/client");

export const CREATE_SHOP_MUTATION = gql`
  mutation CreateShop(
    $ownerName: String!
    $shopName: String!
    $email: String!
    $location: String!
    $phone: String!
    $password: String!
    $images: [String]
    $salonFor: SalonForEnum
    $openTime: String
    $closeTime: String
  ) {
    createShop(
      ownerName: $ownerName
      shopName: $shopName
      email: $email
      location: $location
      phone: $phone
      password: $password
      images: $images
      salonFor: $salonFor
      openTime: $openTime
      closeTime: $closeTime
    ) {
      id
    }
  }

`;


export const loginByCredentials = gql`
    query Query($email: String!, $password: String!) {
        shopByCredentials(email: $email, password: $password) {
            id
        }
    }
`;

export const FetchShopName = gql`
    query Query($shopId: ID!) {
        shop(id: $shopId) {
            id
            shopName
        }
    }
`;

export const Create_Services = gql`
mutation UpdateShop($updateShopId: ID!, $services: [ShopServiceInput]) {
  updateShop(id: $updateShopId, services: $services) {
    services {
      name
      description
      price
      image
      isDiscounted
    }
  }
}
`;

export const GET_SHOP_QUEUE = gql`
  query Query($shopId: ID!) {
    shop(id: $shopId) {
        queue
        }
    }
`;
export const UPDATE_SHOP_QUEUE = gql`
  mutation Mutation($updateShopId: ID!, $queue: Int) {
    updateShop(id: $updateShopId, queue: $queue) {
      queue
    }
  }
`;

export const CreateServiceByShopID = gql`
  mutation Mutation(
    $shopId: ID!
    $name: String!
    $description: String
    $price: Float
    $image: [String]
    $isDiscounted: Boolean
  ) {
    createService(
      shopId: $shopId
      name: $name
      description: $description
      price: $price
      image: $image
      isDiscounted: $isDiscounted
    ) {
      id
      shopId
      name
      description
      price
      image
      isDiscounted
    }
  }

`;

export const GET_SERVICES_BY_LIMIT_HOMESCREEN = gql`
  query Query($serviceStatus: String, $shopId: ID) {
    filterServices(serviceStatus: $serviceStatus, shopId: $shopId) {
      id
      shopId
      name
      description
      price
      image
      isDiscounted
      serviceStatus
    }
  }
`


export const GET_TODAYS_ORDER = gql`
  query Orders($filter: OrderFilterInput) {
    orders(filter: $filter) {
      id
      orderStatus
    }
  }
`;
export const GET_ORDER_BY_FILTER = gql`
  query Orders($filter: OrderFilterInput) {
    orders(filter: $filter) {
      id
      serviceId
      date
      isPaid
      userId
      shopId
      orderStatus
      orderStatusDescription
      time {
        startAt
        # endAt
      }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query Query($orderId: ID!) {
    order(id: $orderId) {
      id
      serviceId
      time {
        startAt
        endAt
      }
      date
      isPaid
      userId
      shopId
      orderStatus
      orderStatusDescription
    }
  }
`

export const GET_ORDERS_TIME_DATA = gql`
 query Orders($filter: OrderFilterInput) {
    orders(filter: $filter) {
      id
      date
      time {
        startAt
        endAt
      }
    }
  }
`

export const DEACTIVATE_THE_SERVICE = gql`
  mutation UpdateService(
    $serviceStatus: String
    $shopId: ID!
    $updateServiceId: ID!
  ) {
    updateService(
      serviceStatus: $serviceStatus
      shopId: $shopId
      id: $updateServiceId
    ) {
      id
    }
  }
`

// export const GetOrderDetails = gql`
//   query Query($shopId: ID!) {
//     ordersByShop(shopId: $shopId) {
//       id
//       serviceId
//       time
//       date
//       userId
//       shopId
//       isPaid
//       orderStatus
//       orderStatusDescription
//     }
//   }
// `;

export const GET_RATING = gql`
  query Query($shopId: ID!) {
    shop(id: $shopId) {
      rating {
        price
        shop
        behavior
        numOfReviews
        service
      }
    }
  }
`;

export const GET_USERINFO_ORDER_DETAILS = gql`
  query Query($userByIdId: ID) {
    user_by_id(id: $userByIdId) {
      firstName
      lastName
      email
      phone
      userImage
    }
  }
`;

export const GET_SERVICE_BY_ID = gql`
  query Query($serviceId: ID!) {
    service(id: $serviceId) {
      id
      shopId
      name
      description
      price
      image
      isDiscounted
      serviceStatus
      serviceTime
    }
  }
`

export const UPDATE_ORDER_STATUS = gql`
  mutation Mutation($updateOrderId: ID!, $orderStatus: String) {
    updateOrder(id: $updateOrderId, orderStatus: $orderStatus) {
      id
    }
  }
`;

export const GET_SERVICE_OVERVIEW_BY_ID = gql`
  query Query($serviceId: ID!) {
    service(id: $serviceId) {
      id
      name
      price
    }
  }
`;

export const WALLET_STATICS = gql`
  query Orders($filter: OrderFilterInput) {
    orders(filter: $filter) {
      orderStatus
      id
      serviceId
    }
  }
`;

export const GET_ALLSERVICES_PRICE = gql`
  query Query($shopId: ID!) {
    servicesByShop(shopId: $shopId) {
      id
      price
    }
  }
`;

export const GET_SHOP_PROFILE_DATA = gql`
  query Shops($shopId: ID!) {
    shop(id: $shopId) {
      ownerName
      shopName
      email
      location
      phone
      password
      images
      shopDescription
      salonFor
      numOfSeats
      openTime
      closeTime
    }
  }
`