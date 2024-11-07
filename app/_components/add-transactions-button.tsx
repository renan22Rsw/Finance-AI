"use client";

import { useState } from "react";
import UpSertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";

const AddTransactionsButton = () => {
  const [dialogIsOpen, setDailogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDailogIsOpen(true)}
      >
        Adicionar Transação
        <ArrowDownUpIcon />
      </Button>
      <UpSertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDailogIsOpen}
      />
    </>
  );
};

export default AddTransactionsButton;
