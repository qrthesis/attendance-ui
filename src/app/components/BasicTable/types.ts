export interface ITableProps {
  tableKey: string;
  rowHeaders: Array<string>;
  rowData: any;
  user: any;
  actions?: {
    timeIn?: {
      callback: (rowData: any) => void;
      disabled: boolean;
    };
    timeOut?: {
      callback: (rowData: any) => void;
      disabled: boolean;
    };
    viewAttendance?: string;
  };
}
