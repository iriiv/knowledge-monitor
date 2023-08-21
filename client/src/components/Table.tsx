import {
	DataTable,
	TableBody,
	Table as TableCarbon,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableToolbar,
	TableToolbarContent,
	TableToolbarSearch,
	Pagination,
	Button,
} from '@carbon/react';
import ExcelJS from 'exceljs';

import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const TableWrapper = styled.div`
	padding: 2em 0;
`;

type Header = {
	header: string;
	key: string;
};

type TableProps = {
	rows: any[];
	headers: Header[];
	title: string;
	fileName?: string;
	rowsCount?: number;
	download?: boolean;
};

const Table: React.FC<TableProps> = ({
	download,
	rowsCount,
	rows: dataRows,
	headers,
	title,
	fileName,
}) => {
	const [rows, setRows] = useState<any[]>(dataRows.slice(0, 10));

	const downloadExcel = () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Employees');
		worksheet.addRow(headers.map((header: any) => header.header));

		dataRows.forEach(row => {
			const data = headers
				.map((header: any) => header.key)
				.map((key: string) => row[key]);
			worksheet.addRow(data);
		});

		workbook.xlsx.writeBuffer().then(buffer => {
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});
			saveAs(blob, `${fileName}.xlsx`);
		});
	};

	const onPaginationChange = (e: any) => {
		setRows(dataRows.slice((e.page - 1) * 10, e.page * 10));
	};

	return (
		<TableWrapper>
			<DataTable rows={rows} headers={headers}>
				{({
					rows,
					headers,
					getHeaderProps,
					getRowProps,
					getBatchActionProps,
					onInputChange,
				}: any) => (
					<TableContainer title={title}>
						<TableToolbar>
							<TableToolbarContent>
								<TableToolbarSearch
									tabIndex={
										getBatchActionProps().shouldShowBatchActions ? -1 : 0
									}
									onChange={onInputChange}
								/>
								<div style={{ width: '1em' }}></div>
							</TableToolbarContent>
							{(download ?? false) && (
								<Button
									tabIndex={
										getBatchActionProps().shouldShowBatchActions ? -1 : 0
									}
									onClick={downloadExcel}
									size='small'
									kind='primary'
								>
									Скачать
								</Button>
							)}
						</TableToolbar>
						<TableCarbon useZebraStyles>
							<TableHead>
								<TableRow>
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
										{row.cells.map((cell: any) => (
											<TableCell key={cell.id}>{cell.value}</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</TableCarbon>
					</TableContainer>
				)}
			</DataTable>
			{(rowsCount ?? 0) > 10 && (
				<Pagination
					backwardText='Предыдущая страница'
					forwardText='Следующая страница'
					itemsPerPageText='Кол-во записей:'
					onChange={onPaginationChange}
					page={1}
					pageSize={10}
					pageSizes={[10, 20, 30, 40, 50]}
					size='md'
					totalItems={rowsCount ?? rows.length}
				/>
			)}
		</TableWrapper>
	);
};

export const TableWithoutTool: React.FC<TableProps> = ({
	rows,
	headers,
	title,
}) => {
	return (
		<TableWrapper>
			<DataTable rows={rows} headers={headers}>
				{({ rows, headers, getHeaderProps, getRowProps }: any) => (
					<TableContainer title={title}>
						<TableCarbon useZebraStyles>
							<TableHead>
								<TableRow>
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
										{row.cells.map((cell: any) => (
											<TableCell key={cell.id}>{cell.value}</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</TableCarbon>
					</TableContainer>
				)}
			</DataTable>
		</TableWrapper>
	);
};

export default Table;
