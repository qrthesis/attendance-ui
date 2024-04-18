import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IBasicSelectProps {
  dataType: "dept" | "course";
  value: any;
  handleFieldChange: (field: string, value: any) => void;
  department?: string;
}

const BasicSelect: React.FC<IBasicSelectProps> = ({
  dataType,
  value,
  handleFieldChange,
  department = "CTECH",
}) => {
  const departments = ["CEA", "CTE", "CAS", "CBM", "CTECH"];

  const courses: any = {
    CEA: ["BS Arch", "BS CE", "BS ME", "BS EE", "BS CpE", "BS ID"],
    CTE: [
      "BS Ed",
      "BSEd. English",
      "BSEd. Filipino",
      "BSEd. Math",
      "BSEd. Social Studies",
      "BSEd. TLE",
    ],
    CAS: ["BS Psychology"],
    CTECH: [
      "BS Elect Tech",
      "BS Elex Tech",
      "BSIT-Auto",
      "BSIT-Civil Tech",
      "BSIT-Cosme Tech",
      "BSIT-Draft Tech",
      "BSIT-Elex Tech",
      "BSIT-Food Tech",
      "BSIT-Garments",
      "BSIT-HRT",
      "BSIT-HVAR Tech",
      "BSIT-Mech Tech",
      "BSIT-RAC Tech",
      "BSIT-Wood Tech",
      "DECT",
      "DECXT",
      "DIT-Auto",
      "DIT-Civil Tech",
      "DIT-Cosme Tech",
      "DIT-Draft Tech",
      "DIT-Elex Tech",
      "DIT-Food Tech",
      "DIT-Garments",
      "DIT-HRT",
      "DIT-HVAR Tech",
      "DIT-Mech Tech",
      "DIT-RAC Tech",
      "DIT-Wood Tech",
    ],
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (dataType === "dept") {
      return handleFieldChange("department", event.target.value as string);
    }
    return handleFieldChange("course", event.target.value as string);
  };

  const renderMenu = () => {
    if (dataType === "dept") {
      return departments.map((dept) => (
        <MenuItem key={dept} value={dept}>
          {dept}
        </MenuItem>
      ));
    }

    return courses[department].map((course: any) => (
      <MenuItem key={course} value={course}>
        {course}
      </MenuItem>
    ));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        {dataType === "dept" ? "Department" : "Course"}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={dataType === "dept" ? "Department" : "Course"}
        onChange={handleChange}
      >
        {renderMenu()}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
