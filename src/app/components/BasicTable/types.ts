export interface ITableProps {
  tableKey: string;
  rowHeaders: Array<string>;
  rowData: any;
  user: any;
  actions?: {
    clockIn?: () => void;
    clockOut?: () => void;
    viewAttendance?: string;
  };
}
