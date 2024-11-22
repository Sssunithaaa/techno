import React, {  useEffect } from "react";
import axios from "axios";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Toolbar,
  Edit,
  Page,
  Sort,
  Filter,
  Group,
} from "@syncfusion/ej2-react-grids";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
const HandleIncentive = ({ open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Tools</DialogTitle>
      <DialogContent>
        <div>
          {data?.tool_codes?.map((toolCode, index) => (
            <div key={index} className="flex flex-row font-semibold">
              <span >{index+1}.</span><p>&nbsp;&nbsp;{toolCode}</p>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Employee = () => {
 let grid;
  
 
   const { data: dataa ,refetch} = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/webapp/api/employees`);
        return response.data; 
      } catch (error) {
        throw new Error("Error fetching machines"); 
      }
    },
  });
  useEffect(()=>{
   refetch()
  },[dataa,refetch])

  const getCsrfToken = () => {
  const cookies = document.cookie.split(';');
  const csrfCookie = cookies.find(cookie => cookie.trim().startsWith('csrftoken='));
  if (csrfCookie) {
    return csrfCookie.split('=')[1];
  }
  return null;
    };


 const handleActionComplete = async (args) => {
  if (args.requestType === "save") {
    try {
      if (args.action === "add") {
         const newData = { ...args.data, emp_efficiency: 0 };
      
        await axios.post(`${import.meta.env.VITE_APP_URL}/webapp/api/employees/create/`, newData);
        toast.success("Employee added successfully", {
        position: "top-center",
        autoClose: 1000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
      } else if (args.action === "edit") {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/webapp/api/employees/update/${args.data.emp_ssn}/`, args.data);
        toast.success("Employee updated successfully", {
        position: "top-center",
        autoClose: 1000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
      }
      // Refresh data after adding or updating
      refetch();
    } catch (error) {
     
      refetch();
       if (error.response && error.response.data) {
  
    const errorData = error.response.data;

    const errorMessages = Object.values(errorData).flatMap(errorArray => errorArray);
    if (errorMessages.length > 0) {
      
      errorMessages.forEach(errorMessage => {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000, 
          style: {
            width: "auto",
            style: "flex justify-center",
          },
          closeButton: false,
          progress: undefined,
        });
      });
    } else {
      // Generic error message if no specific field error is available
      toast.error("Error has occurred. Please try again", {
        position: "top-center",
        autoClose: 3000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
    }
  } else {
    // Generic error message if no response data is available
    toast.error("Error has occurred. Please try again", {
      position: "top-center",
      autoClose: 3000,
      style: {
        width: "auto",
        style: "flex justify-center",
      },
      closeButton: false,
      progress: undefined,
    });
  }

    }
  } else if (args.requestType === "delete") {
    try {
      const csrfToken = getCsrfToken();
      
      const response = await axios.delete(`${import.meta.env.VITE_APP_URL}/webapp/api/employees/${args.data[0].emp_ssn}`, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      toast.success("Employee deleted successfully");
    } catch (error) {
      refetch();
      toast.error(error.message);
      console.error("Error deleting data:", error);
    }
  }
 
};


  const employeesGrid = [
    {
      field: "emp_ssn",
      headerText: "SSN",
      width: "150",
      textAlign: "Center",
      isPrimaryKey:true
    },
    {
      field: "emp_name",
      headerText: "Name",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "emp_designation",
      headerText: "Designation",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "emp_shed",
      headerText: "Shed",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "emp_dept",
      headerText: "Department",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "emp_efficiency",
      headerText: "Efficiency",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "emp_category",
      headerText: "Category",
      width: "150",
      textAlign: "Center",
    },

  ];
 const actionBegin = (args) => {
  const cols = grid?.columnModel;

  if (args.requestType === "add" || args.requestType === "beginEdit") {
    if (cols && Symbol.iterator in Object(cols)) {
      for (const col of cols) {
        if (col.field === "emp_efficiency") {
          col.visible = false;
        }
      }
    } else {
      console.error("Columns are not iterable or undefined.");
    }
  } else {
    if (cols && Symbol.iterator in Object(cols)) {
      for (const col of cols) {
        if (col.field === "emp_efficiency") {
          col.visible = true;
        }
      }
    } else {
      console.error("Columns are not iterable or undefined.");
    }
  }
};


const dataBound = () => {
        if (grid) {
            const column = grid.columns[0];
            column.isPrimaryKey = true;
        }
    };
  const editing = {
    allowAdding: true,
    allowDeleting:true,
     allowEditing:true,
    mode: "Dialog",
  };

  return (
    <div className=" m-2 pt-2 md:m-10 mt-24 md:p-10 bg-white rounded-3xl">
      {/* <div>
        <button className="bg-indigo-700 px-2 py-4 font-semibold my-4 rounded-md text-white">ADD INCENTIVES</button>
      </div> */}
      <GridComponent
  dataSource={dataa}
  width="auto"
  allowPaging
  allowSorting
  allowFiltering
  dataBound={dataBound}
  allowGrouping
  pageSettings={{ pageCount: 5 }}
  editSettings={editing}
  toolbar={["Add", "Delete", "Edit"]}
  actionBegin={actionBegin}
  actionComplete={handleActionComplete}
  ref={(g) => (grid = g)}
  sortSettings={{ columns: [{ field: 'emp_ssn', direction: 'Descending' }] }}  // Added this line
>
</GridComponent>
    </div>
  );
};

export default Employee;
