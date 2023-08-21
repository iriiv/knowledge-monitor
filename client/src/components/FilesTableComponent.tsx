import { TrashCan, Attachment } from "@carbon/icons-react";
import {
  DataTable,
  TableContainer,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  Link,
  Button,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
} from "@carbon/react";
import { FirebaseFile } from "../types/KMFile";

type FilesTableComponentProps = {
  files: FirebaseFile[];
  onAddClick: () => void;
  onDelete: (files: any) => void;
};

export const FilesTableComponent = ({
  files,
  onAddClick,
  onDelete,
}: FilesTableComponentProps) => {
  const headerData = [
    {
      header: "Название",
      key: "name",
    },
    {
      header: "Описание",
      key: "description",
    },
    {
      header: "Формат",
      key: "format",
    },
  ];

  const deleteHandler = (selectedFiles: any[]) => {
    const filesToDelete = selectedFiles.map((selectedFile) => {
      return {
        name: files.find((f) => selectedFile.id === f.id)?.fileName,
        id: selectedFile.id,
      };
    });
    onDelete(filesToDelete);
  };
  return (
    <DataTable
      rows={files.map((file) => ({
        ...file,
        name: (
          <Link target="_blank" href={file.fileUrl}>
            {file.name}
          </Link>
        ),
      }))}
      headers={headerData}
    >
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getBatchActionProps,
        selectedRows,
      }: any) => (
        <TableContainer title="Прикрепленные файлы">
          <TableToolbar>
            <TableBatchActions {...getBatchActionProps()}>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan}
                onClick={() => deleteHandler(selectedRows)}
              >
                Удалить
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent>
              <Button
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                renderIcon={Attachment}
                onClick={onAddClick}
                size="small"
                kind="primary"
              >
                Добавить
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header: any) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow {...getRowProps({ row })}>
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell: any) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};
