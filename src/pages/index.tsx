import { Sessions } from "types/Session";
import HeadPage from "@components/Global/Header/HeadPage";
import useNavbar from "@layouts/customHooks/useNavbar";
import { useState } from "react";
import { useUserQuery } from "@services/reactQuery/users";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import handleSessions from "./api/GetSession";
import DashboardLayout from "@layouts/DashboardLayout";
import Card from "antd/es/card/Card";

function Home(session: Sessions) {
  useNavbar(["home"], [{ name: "Home", url: "/" }]);

  const [user, setUser] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce<string>(search, 500)


  return (
    <>
      <HeadPage title="Home Page" />

      <DashboardLayout session={session}>
        <p>Home</p>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Home;
