import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summaryCards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transaction-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensePerCategory from "./_components/expense-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransactions } from "../_data/can-user-add-transaction";
import { auth } from "@clerk/nextjs/server";

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

  const dashboard = await getDashboard(month);
  const userCanAddTransactions = await canUserAddTransactions();

  return (
    <>
      <NavBar />
      <div className="flex-col space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <TimeSelect />
          </div>
        </div>

        <div className="w-full gap-6 space-y-4 md:grid md:grid-cols-[2fr,1fr] 2xl:overflow-hidden">
          <div className="flex flex-col gap-6 2xl:overflow-hidden">
            <div className="grid-cols-1">
              <SummaryCards
                month={month}
                {...dashboard}
                userCanAddTransaction={userCanAddTransactions}
              />
            </div>

            <div className="gap-6 space-y-4 xl:flex">
              <TransactionPieChart {...dashboard} />
              <ExpensePerCategory
                expensePerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
