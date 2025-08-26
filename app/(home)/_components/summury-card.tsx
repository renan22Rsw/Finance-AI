import AddTransactionsButton from "@/app/_components/add-transactions-button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummuryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummuryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummuryCardProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground opacity-70" : "text-white opacity-70"} `}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="space-y-2 sm:flex sm:items-center sm:justify-between">
        <p className="text-justify text-lg font-bold lg:text-2xl 2xl:text-3xl">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionsButton
            userCanAddTransaction={userCanAddTransaction}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SummuryCard;
