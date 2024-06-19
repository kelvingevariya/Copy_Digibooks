import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchTrail } from "../../../Utils/API_Axios";
// Functional component for generating table rows
const TableRow = ({
  name,
  openingBalance,
  debit,
  credit,
  head,
  child,
  padding,
}) => (
  <tr>
    <td style={{ paddingLeft: `${padding}px` }}>{name}</td>
    <td>{openingBalance}</td>
    <td>{debit}</td>
    <td>{credit}</td>
    <td>{head}</td>
    <td>{child}</td>
  </tr>
);

// Functional component for generating table
const Table = ({ data }) => {
  const rows = data.map((dataItem) => {
    const item = dataItem._item;
    let lastPadding = 0;
    const rowElements = [];

    // Generate rows for hierarchy

    if (dataItem.data && dataItem.data[item?.name]) {
      dataItem.data[item?.name].forEach((child, index) => {
        const padding = index === 0 ? 20 : index * 25;
        rowElements.push(
          <tr key={`${item?.name}-${child.name}`}>
            <td
              style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#ffffff",
              }}
            >
              {child.name}
            </td>
            <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
            <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
            <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
            <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
            <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
           
          </tr>
        );
        lastPadding = padding; // Store the last padding
        if (dataItem.data[item?.name].length - 1 === index) {
          rowElements.unshift(
            <tr key={`${item?.name}-parent`}>
              <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}>
                {child.parent}
              </td>
              <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
              <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
              <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
              <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
              <td style={{ backgroundColor: "#2DA2FB", color: "#ffffff" }}></td>
          
            </tr>
          );
        }
      });
    }

    // Generate row for current item with last padding
    rowElements.push(
      <TableRow
        key={`${item?.name}-row`}
        name={item?.name}
        openingBalance={item?.openingBalance}
        debit={item?.debit}
        credit={item?.credit}
        head={item?.head ?item?.head :  <input type='text' name='head' />}
        child={item?.child ? item?.child : <input type='text' name='child' />}
        padding={lastPadding + 25}
      />
    );

    return rowElements;
  });

  // Render the table
  return (
    <table className="table table-bordered table-hover tTable">
      <thead>
        <tr>
          <th scope="col">Particulars</th>
          <th scope="col">Open Bal</th>
          <th scope="col">Debit</th>
          <th scope="col">Credit</th>
          <th scope="col">Head</th>
          <th scope="col">Child</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

// DashboardPage component
const FetchTrailComponent = () => {
  const [unTaggedList, setUnTaggedList] = useState([
    {
      data: {
        "Data is Loading": [
          {
            name: "Data is Loading",
            parent: "Data is Loading",
          },
        ],
      },
      _item: {
        name: "Data is Loading",
        parent: "Data is Loading",
        openingBalance: 0,
        credit: 0,
        debit: 0,
        closingBalance: 0,
        head: "",
        child: "",
        isTagged: false,
        __v: 0,
      },
    },
  ]);

  const fetchTrailUnTag = async () => {
    const response = await fetchTrail();
    if (response?.data?.errorStatus === 200) {
      setUnTaggedList(
        // response?.data?.unTagged.filter((item) => !item.isTagged)
        response?.data?.data
      );
      // now redirect to login page...
    } else if (response?.data?.errorStatus === 401) {
      return toast.error(`Error: ${response?.data?.error}`);
    } else {
      return toast.error(
        `There is some issue on fetching Trail unTagged not found.`
      );
    }
  };

  useEffect(() => {
    // Simulating data fetching with a setTimeout
    fetchTrailUnTag();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <Table data={unTaggedList} />
    </div>
  );
};

export default FetchTrailComponent;
