import { useQueryClient } from "@tanstack/react-query";
import RemoveDialog from "components/forms/RemoveDialog";
import { useSnackbar } from "context/snackbarContext";
import { queryStore } from "features/shared";
import useRemoveSearchParams from "hooks/useRemoveSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { adminQueries } from "..";
type Props = {};
export const RemoveForm: FC<Props> = ({}) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();
  const { id, isActive, clearRemoveParams } = useRemoveSearchParams();
  const snackbar = useSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const remove = adminQueries.useRemove();

  const handleClose = () => {
    clearRemoveParams();
  };

  const handleRemove = () => {
    remove.mutate(id ?? "", {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.admin.all._def);
        successSnackbar(t(`message.success.remove`));
        handleClose();
      },
      onError: parseResponseError({ snackbar }),
    });
  };

  return (
    <RemoveDialog
      handleCancel={handleClose}
      handleRemove={handleRemove}
      open={isActive}
      isLoading={remove.isLoading}
    >
      {t("remove")}
    </RemoveDialog>
  );
};
