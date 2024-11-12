import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "lucide-react";
import { deleteTransactions } from "../_actions/delete-transactions";
import { toast } from "sonner";

interface DeleteTransactionsButtonProps {
  transactionId: string;
}

const DeleteTransactionsButton = ({
  transactionId,
}: DeleteTransactionsButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransactions({ transactionId });
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um error ao deletar a transação!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionsButton;
