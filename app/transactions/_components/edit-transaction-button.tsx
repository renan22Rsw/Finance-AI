"use client";

import { useState } from "react";

import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpSertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDailogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => setDailogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpSertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDailogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
