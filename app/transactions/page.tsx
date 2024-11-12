import React from "react";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";
import AddTransactionsButton from "../_components/add-transactions-button";
import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransactions } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  //acessar transações do meu banco de dados
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  }); //pega os dados

  const userCanAddTransaction = await canUserAddTransactions();

  return (
    <>
      <NavBar />
      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionsButton
            userCanAddTransaction={userCanAddTransaction}
          />
        </div>
        <ScrollArea>
          <DataTable
            columns={transactionsColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
