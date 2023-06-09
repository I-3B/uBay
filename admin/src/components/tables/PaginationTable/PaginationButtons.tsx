import { TablePagination } from "@mui/material";
import { InfiniteData } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { APIList } from "types/api";

interface PaginationTableProps {
  data?: InfiniteData<APIList<unknown>>;
  page: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

const PaginationButtons = ({ data, page, handleChangePage }: PaginationTableProps) => {
  const isDisabled = !data;
  const { t } = useTranslation();
  return (
    <TablePagination
      rowsPerPageOptions={[data?.pages[0].data.length ?? 0]}
      labelDisplayedRows={(info) => t("pagination", { ...info })}
      component="div"
      count={data?.pages[0].totalDataCount ?? 0}
      rowsPerPage={data?.pages[0].data.length ?? 0}
      page={page}
      onPageChange={handleChangePage}
      SelectProps={{
        disabled: isDisabled,
      }}
    />
  );
};

export default PaginationButtons;
