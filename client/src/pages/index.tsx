import { useRouter } from "next/router"
import { useEffect } from "react";


const Index = () => {
  const router = useRouter();

  router.replace('/app/dashboard');

  return <></>
}

export default Index
