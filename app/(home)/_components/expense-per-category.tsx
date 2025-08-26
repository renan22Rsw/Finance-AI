import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensePerCategoryProps {
  expensePerCategory: TotalExpensePerCategory[];
}

const ExpensePerCategory = ({
  expensePerCategory,
}: ExpensePerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border pb-6 xl:w-2/4">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold sm:text-start">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensePerCategory.length > 0 ? (
          <>
            {expensePerCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex w-full justify-between">
                  <p className="text-sm font-bold">
                    {TRANSACTION_CATEGORY_LABELS[category.category]}
                  </p>
                  <p className="text-sm font-bold">
                    {category.percentageOfTotal}%
                  </p>
                </div>
                <Progress value={category.percentageOfTotal} />
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="italic text-muted-foreground">
              Adicione transações por categoria para ver os gastos por categoria
            </p>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensePerCategory;
