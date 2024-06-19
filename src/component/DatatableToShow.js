import React from "react";
import DataTable from "react-data-table-component";

const DatatableToShow = ({ columns, data, title,subHeaderComponent,customStyles,paginationNotShow }) => {

  return <DataTable 
  columns={columns} 
  data={data} 
  title={title} 
  pagination={paginationNotShow ? false: true}
  //subHeader
  highlightOnHover
  //subHeaderComponent={subHeaderComponent}
  fixedHeader={true}
  responsive
  customStyles={customStyles}
//   selectableRows
  
  
  />;
};

export default DatatableToShow;
