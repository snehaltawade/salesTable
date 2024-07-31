import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

function createData(name, values) {
  return { name, values };
}

const rows = [
  createData("Electronics", 1500),
  createData("--Phones", 800),
  createData("--Laptops", 700),
  createData("Furniture", 1000),
  createData("--Tables", 300),
  createData("--Chairs", 700),
];

const SalesTable = () => {
  const [inputValues, setInputalues] = useState({
    Electronics: { value: 1500, variance: 0, inputValue: 0 },
    "--Phones": { value: 800, variance: 0, inputValue: 0 },
    "--Laptops": { value: 700, variance: 0, inputValue: 0 },
    Furniture: { value: 1000, variance: 0, inputValue: 0 },
    "--Tables": { value: 300, variance: 0, inputValue: 0 },
    "--Chairs": { value: 700, variance: 0, inputValue: 0 },
  });

  const handleInputChange = (e, rowName) => {
    console.log(e.target.value, rowName);
    setInputalues((prevData) => ({
      ...prevData,
      [rowName]: {
        ...prevData[rowName],
        inputValue: e.target.value,
      },
    }));
    console.log(inputValues);
  };

  const calculateVariancebypercent = (value, percent) => {
    console.log(value, percent);
    return value + (value * percent) / 100;
  };

  const calculateVariancsebyValue = (value, inputValue) => {
    return ((inputValue - value) / value) * 100;
  };

  const handleAllocationPercentage = (name) => {
    let inputvalue = inputValues[name].inputValue;
    let name2 = "";
    let newValue;
    let updateValue = calculateVariancebypercent(
      inputValues[name].value,
      inputvalue
    );

    setInputalues((prevData) => ({
      ...prevData,
      [name]: {
        inputValue: inputvalue,
        value: updateValue,
        variance: inputvalue,
      },
    }));

    if (name === "--Phones" || name === "--Laptops") {
      name2 = "Electronics";
    } else if (name === "--Tables" || name === "--Chairs") {
      name2 = "Furniture";
    }
    newValue = inputValues[name2].value + updateValue - inputValues[name].value;
    setInputalues((prevData) => ({
      ...prevData,
      [name2]: {
        ...prevData[name2],
        value: newValue,
        variance:
          ((newValue - inputValues[name2].value) / inputValues[name2].value) *
          100,
      },
    }));
  };

  const handleAllocationValues = (name) => {
    let inputvalue = inputValues[name].inputValue;
    console.log("name", name);
    setInputalues((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: inputValues[name].inputValue,
        variance: calculateVariancsebyValue(
          inputValues[name].value,
          inputvalue
        ),
      },
    }));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Input</TableCell>
            <TableCell align="right">Allocation %</TableCell>
            <TableCell align="right">Allocation Val</TableCell>
            <TableCell align="right">Variance %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {inputValues[row.name]?.value}
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                  onChange={(e) => {
                    handleInputChange(e, row.name);
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleAllocationPercentage(row.name);
                  }}
                >
                  button1
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleAllocationValues(row.name);
                  }}
                >
                  button2
                </Button>
              </TableCell>
              <TableCell align="right">
                {Number(inputValues[row.name]?.variance).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
