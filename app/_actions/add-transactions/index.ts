"use server";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

//server-actions

//uma server aciton precisa ter seus parâmetros validados!

interface addTransactionProps {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const addTransaction = async (params: addTransactionProps) => {
  addTransactionSchema.parse(params); //validação com zod
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  await db.transaction.create({
    data: { ...params, userId },
  });

  revalidatePath("/transactions");
};
