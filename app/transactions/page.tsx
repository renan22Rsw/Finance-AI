import React from "react";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";
import AddTransactionsButton from "../_components/add-transactions-button";
import NavBar from "../_components/navbar";

const TransactionsPage = async () => {
  //acessar transações do meu banco de dados
  const transactions = await db.transaction.findMany({}); //pega os dados
  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionsButton />
        </div>
        <DataTable
          columns={transactionsColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};

export default TransactionsPage;
