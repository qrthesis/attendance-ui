export interface ITableProps {
  tableKey: string;
  rowHeaders: Array<string>;
  rowData: any;
  user?: any;
  isLoading?: boolean;
  actions?: {
    timeIn?: {
      callback: (rowData: any) => void;
      disabled: boolean;
    };
    timeOut?: {
      callback: (rowData: any) => void;
      disabled: boolean;
    };
    viewAttendance?: {
      callback: (rowData: any) => void;
    };
    delete: {
      callback?: (rowData: any) => void;
    };
  };
}
