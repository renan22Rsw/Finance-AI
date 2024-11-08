import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summaryCards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">DashBoard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  );
};

export default Home;
