import SummaryCard from "./summury-card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

interface SummaryCardProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        title="Saldo "
        amount={balance}
        size="large"
        icon={<WalletIcon size={16} />}
        userCanAddTransaction={userCanAddTransaction}
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
          amount={expensesTotal}
          icon={<TrendingDownIcon size={14} className="text-red-500" />}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
