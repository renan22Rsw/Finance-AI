import { db } from "@/app/_lib/prisma";
import SummaryCard from "./summury-card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

interface SummaryCardProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        //aggregate no Prisma acessa os dados do seu banco e realiza cálculos ou operações matemáticas conforme suas necessidades
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const expenseTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - investmentsTotal - expenseTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        title="Saldo "
        amount={balance}
        size="large"
        icon={<WalletIcon size={16} />}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investido"
          amount={investmentsTotal}
          icon={<PiggyBankIcon size={16} />}
        />

        <SummaryCard
          title="Receita"
          amount={depositsTotal}
          icon={<TrendingUpIcon size={16} className="text-primary" />}
        />

        <SummaryCard
          title="Despensa"
          amount={expenseTotal}
          icon={<TrendingDownIcon size={14} className="text-red-500" />}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
