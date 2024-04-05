export interface ITableProps {
  tableKey: string;
  rowHeaders: Array<string>;
  rowData: any;
  user: any;
  actions?: {
    timeIn?: (rowData: any) => void;
    timeOut?: (rowData: any) => void;
    viewAttendance?: string;
  };
  event: any;
}
