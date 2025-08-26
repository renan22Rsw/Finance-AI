import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transation: Transaction) => {
    if (transation.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }

    if (transation.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }

    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Últimas Transações</CardTitle>
        <Button variant={"outline"} className="rounded-full font-bold">
          <Link href={"/transactions"}>Ver mais</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {lastTransactions.length > 0 ? (
          <>
            {lastTransactions.map((transation) => (
              <div
                className="flex justify-between md:items-center"
                key={transation.id}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
                    <Image
                      src={
                        TRANSACTION_PAYMENT_METHOD_ICONS[
                          transation.paymentMethod
                        ]
                      }
                      height={20}
                      width={20}
                      alt="pix"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold">{transation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transation.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-bold ${getAmountColor(transation)}`}
                >
                  {getAmountPrefix(transation)}
                  {formatCurrency(Number(transation.amount))}
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="italic text-muted-foreground">
              Nenhuma transação encontrada
            </p>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
