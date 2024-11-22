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
} from "@syncfusion/ej2-react-grids";
import { useQuery } from "@tanstack/react-query";
import Config from "../../components/machineconfig/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Machine = () => {

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [openView, setOpenView] = useState(false);

   const { data ,refetch} = useQuery({
    queryKey: ["machines"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://techno.pythonanywhere.com/webapp/api/nmachines");
        return response.data; 
      } catch (error) {
        throw new Error("Error fetching machines"); 
      }
    },
  });
  useEffect(()=>{
   refetch()
  },[data,refetch])


  const MachinesGrid = [
    {
      field: "machine_id",
      headerText: "Machine ID",
      width: "150",
      textAlign: "Center",
    },
  ];

  const editing = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting:true,
    mode: "Dialog",
  };

  const handleMachineClick = (args) => {
  
    setSelectedMachine(args.data);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };
  useEffect(()=>{
    refetch()
  },[openView,refetch])
  const handleActionComplete = async (args) => {

    if (args.requestType === "save") {
      try {
      
        const response = await axios.post("https://techno.pythonanywhere.com/webapp/api/nmview/", args.data);
       
         toast.success("Machine added successfully", {
        position: "top-center",
        autoClose: 1000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
      
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }  
  };

  return (
    <div className=" m-2 pt-2 md:m-10 mt-24 md:p-10 bg-white rounded-3xl overflow-y-auto h-full">
      <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        allowFiltering
        allowAdding
        allowDeleting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={['Add']}
        actionComplete={handleActionComplete}
        rowSelected={handleMachineClick}
      >
      <ToastContainer/>
        <ColumnsDirective>
          {MachinesGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              width={item.width}
              textAlign={item.textAlign}
              headerText={item.headerText}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Toolbar, Edit, Page, Filter]} />
      </GridComponent>
      {openView && selectedMachine && (
        <Config
          selectedMachine={selectedMachine}
          handleCloseView={handleCloseView}
          openView={openView}
        />
      )}
    </div>
  );
};

export default Machine;
