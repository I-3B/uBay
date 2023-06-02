import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIconButton from "components/buttons/EditIconButton";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { categoryQueries } from "..";
import useTableHeader from "../hooks/useTableHeaders";
type Props = {};
export const Table: FC<Props> = ({}) => {
  const search = useQuerySearchParam();
  // const pageNumber = usePageNumberSearchParam
  const { edit, remove } = useEventSearchParams();
  const query = categoryQueries.useAll({
    search,
  });
  const { data } = query;
  const tableHeaders = useTableHeader();
  return (
    <PaginationTable
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      skeleton={true}
      cellCount={tableHeaders.length}
      infiniteQuery={query}
    >
      <TableBody>
        {data?.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell width={"60%"}>{row.description}</TableCell>
            <TableCell>
              <ButtonsStack>
                <EditIconButton onClick={() => edit(row.id)} />
                <RemoveIconButton onClick={() => remove(row.id)} />
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};
