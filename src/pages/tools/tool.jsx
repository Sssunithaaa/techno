import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Toolbar,
  Edit,
  Page,
  Filter,
  Sort,
  Group
} from "@syncfusion/ej2-react-grids";
import { useQuery } from "@tanstack/react-query";
import AddTool from "../../components/toolsCRUD/toolAdd/Tooladd";
import { ToastContainer, toast } from "react-toastify";
const Tool = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);


   const { data ,refetch} = useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://techno.pythonanywhere.com/webapp/api/tools");
        const data = response.data.map(item => ({
          ...item,
          tool_efficiency: item.tool_efficiency ? item.tool_efficiency.toFixed(2) : '0.00'
        }));
        return data;
        
      } catch (error) {
        throw new Error("Error fetching machines"); 
      }
    },
  });
  useEffect(()=>{
   refetch()
  },[data,refetch])

  const handleActionComplete = async (args) => {
  
    if (args.requestType === "save") {
      if(args.action === "edit"){
        try {
        
          await axios.post(`${import.meta.env.VITE_APP_URL}/webapp/update_tool/${encodeURIComponent(args.data["tool_code"])}/`, args.data);
          toast.success("Tool updated successfully")
        refetch();
      } catch (error) {
        toast.error("Error inserting data");
      }
      }
    } else if (args.requestType === "delete") {
     
      try {
        await axios.get(`https://techno.pythonanywhere.com/webapp/delete-tools/${args.data[0].tool_name}/${args.data[0].tool_code}`);
        toast.success("Tool deleted successfully!!")
        refetch();
      } catch (error) {
        toast.error("Couldn't delete tool. Please try again");
      }
    } 
  };

  const toolGrid = [
    {
      field: "tool_code",
      headerText: "Tool Code",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "tool_name",
      headerText: "Tool Name",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "max_life_expectancy_in_mm",
      headerText: "Tool Life",
      width: "200",
      textAlign: "Center",
    },
    {
      field: "cost",
      headerText: "Cost",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "length_cut_so_far",
      headerText: "Length Cut So Far",
      width: "200",
      textAlign: "Center",
    },
    {
      field: "no_of_brk_points",
      headerText: "No of Break Points",
      width: "200",
      textAlign: "Center",
    },
    {
      field: "tool_efficiency",
      headerText: "Tool Efficiency",
      width: "150",
      textAlign: "Center",
    },
  ];

  const editing = {
    allowDeleting: true,
    allowEditing:true,
    mode: "Dialog",
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddTool = async (newTools) => {
    try {
      for (const newTool of newTools) {
        await axios.post("https://techno.pythonanywhere.com/webapp/api/tools/create", newTool);
      }
      refetch();
      setOpenAddDialog(false);
    } catch (error) {
      toast.error("Error adding tools:");
    }
  };
  


  
  return (
    <div className="  m-2 pt-2 md:m-10 mt-24 md:p-10 bg-white rounded-3xl">
      <button className="px-5 py-3 bg-blue-500 text-white mr-2 my-2 rounded-md hover:bg-blue-700 font-semibold" onClick={handleOpenAddDialog}>Add Tool</button>
      <AddTool
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        handleAddTool={handleAddTool}
        refetch={refetch}
      />
      <div className="overflow-x-auto w-full">
        <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        allowFiltering
        allowGrouping
        allowDeleting
        toolbar={['Delete','Edit']}
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        actionComplete={handleActionComplete}
      >
        <ToastContainer className="z-[100001]"/>
        <ColumnsDirective>
          {toolGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              width={item.width}
              textAlign={item.textAlign}
              headerText={item.headerText}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Toolbar, Edit,Sort, Page, Filter, Group]} />
      </GridComponent>
      </div>
    </div>
  );
};

export default Tool;
