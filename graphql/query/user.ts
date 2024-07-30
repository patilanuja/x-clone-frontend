import {graphql} from "../../gql";

export const verifyUserGoogleTokenQuery = graphql (`
    query VerifyUserGoogleToken($token: String!){
        verifyGoogleToken(token: $token)
    }
`);