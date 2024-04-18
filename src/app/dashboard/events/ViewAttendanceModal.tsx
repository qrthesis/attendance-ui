import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import BasicTable from "../../components/BasicTable";
import dayjs from "dayjs";

import BasicSelect from "@/app/components/BasicSelect";

interface IViewAttendanceModalProps {
  isVisible: boolean;
  updateVisibility: () => void;
  eventDetails: any;
  attendance: Array<any>;
  isFetching: boolean;
  user: any;
}

const ViewAttendanceModal: React.FC<IViewAttendanceModalProps> = ({
  isVisible,
  updateVisibility,
  eventDetails,
  attendance,
  isFetching,
  user,
}) => {
  const departments = ["CEA", "CTE", "CAS", "CBM", "CTECH"];

  const [filter, setFilter] = useState({
    department: "CTECH",
    email: "",
  });
  const [tableData, setTableData] = useState([] as any);

  const updateFilter = (field: string, value: any) => {
    setFilter((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const resetModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const formatTableData = (printedDepartment: string) => {
    if (user?.role === "admin") {
      let filteredAttendance: any = [];

      if (printedDepartment !== "") {
        filteredAttendance = attendance.filter(
          (attendance) => attendance.department === printedDepartment
        );
      } else {
        filteredAttendance = attendance.filter(
          (attendance) => attendance.department === filter.department
        );
      }

      return filteredAttendance.map((attend: any) => {
        return [
          attend.department,
          attend.course,
          attend.email,
          attend.name,
          dayjs.unix(attend.timeIn).format("MM/DD/YYYY hh:mm A"),
          dayjs.unix(attend.timeOut).format("MM/DD/YYYY hh:mm A"),
        ];
      });
    }

    return attendance.map((attend: any) => {
      return [
        dayjs.unix(attend.timeIn).format("MM/DD/YYYY hh:mm A"),
        dayjs.unix(attend.timeOut).format("MM/DD/YYYY hh:mm A"),
      ];
    });
  };

  const onCloseModal = () => {
    setFilter({
      department: "CTECH",
      email: "",
    });
    updateVisibility();
  };

  const generatePDF = () => {
    departments.forEach((department) => {
      const tableData = formatTableData(department);

      const doc = new jsPDF();
      doc.text(`Attendance for ${department}`, 14, 10);
      doc.autoTable({
        head: [
          ["Department", "Course", "Email", "Name", "Time in", "Time out"],
        ],
        body: tableData.map((row: any) => Object.values(row)), // Extract values from each row object
      });

      doc.save(`attendance-${department}-${eventDetails.name}.pdf`);
    });
  };

  const renderDataTable = () => {
    if (user?.role === "admin") {
      return (
        <Stack spacing={3} direction="column">
          <BasicSelect
            dataType="dept"
            value={filter.department}
            handleFieldChange={updateFilter}
          />

          <TextField
            fullWidth
            type="email"
            id="email"
            label="Filter by email"
            variant="outlined"
            value={filter.email}
            onChange={(e) => updateFilter("email", e.target.value)}
          />
          <BasicTable
            tableKey="view-attendance-table"
            rowHeaders={[
              "Department",
              "Course",
              "Email",
              "Name",
              "Time in",
              "Time out",
            ]}
            rowData={tableData}
            isFetching={isFetching}
          />
        </Stack>
      );
    }

    return (
      <Stack spacing={3} direction="column">
        <BasicTable
          tableKey="view-attendance-table"
          rowHeaders={["Time in", "Time out"]}
          rowData={tableData}
          isFetching={isFetching}
        />
      </Stack>
    );
  };

  useEffect(() => {
    if (attendance.length > 0) {
      const tableData = formatTableData("");

      if (filter.email) {
        const filteredData = tableData.filter((data: any) =>
          data[2].includes(filter.email)
        );

        setTableData(filteredData);
        return;
      }

      setTableData(formatTableData(""));
    } else {
      setTableData([]);
    }
  }, [filter, attendance]);

  return (
    <Modal
      open={isVisible}
      onClose={onCloseModal}
      aria-labelledby="view-attendance-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={resetModalStyle}>
        <Stack spacing={3} direction="column">
          <Typography
            id="view-attendance-modal-title"
            variant="h6"
            component="h2"
          >
            {`Event Name: ${eventDetails?.name}`}
          </Typography>
          {attendance.length > 0 ? (
            renderDataTable()
          ) : (
            <Typography variant="h6">
              No attendance for the event yet
            </Typography>
          )}

          {user?.role === "admin" && (
            <Box>
              <Button onClick={generatePDF} variant="contained">
                Export to pdf
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ViewAttendanceModal;
