import { useRouter } from "next/router"
import { useEffect } from "react";
import { addApolloState, initializeApollo } from "../graphql/apolloClient";
import { GetAllSchoolDocument, GetMyUserDocument } from "../graphql/generated/graphql";


const Index = () => {
  const router = useRouter();

  router.replace('/app/dashboard');

  return <></>
}

export default Index
