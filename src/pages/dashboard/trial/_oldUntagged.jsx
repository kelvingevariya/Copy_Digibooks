import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchTrailUnTagged } from "../../../Utils/API_Axios";
import { formatAmount } from "../../../Utils/Constants";

const Untagged = () => {
  const [unTaggedList, setUnTaggedList] = useState([
    {
      name: "Data is loading wait...",
      parent: "Data is loading wait...",
      openingBalance: 0,
      credit: 0,
      debit: 0,
      closingBalance: 0,
      head: "Data is loading wait...",
      child: "Data is loading wait...",
    },
  ]);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchTrailUnTag();
  }, []);

  const updateHeadAndChild = (_id, key, value) => {
    console.log({ id: _id, key: key, value: value });
  };

  const fetchTrailUnTag = async () => {
    const response = await fetchTrailUnTagged();
    if (response?.data?.errorStatus === 200) {
      setUnTaggedList(
        response?.data?.unTagged.filter((item) => !item.isTagged)
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

  const columns = [
    {
      name: "Particulars",
      grow: 2,
      style: {
        fontSize: "16px",
      },
      selector: (row) => row.name,
    },
    {
      name: "Parent",
      style: {
        fontSize: "16px",
      },
      selector: (row) => row.parent,
    },
    {
      name: "Open Bal",
      selector: (row) => "₹ " + formatAmount(row.openingBalance),
      sortable: true,

      style: {
        fontSize: "16px",
        textAlign: "right",
      },
    },
    {
      name: "Debit",
      selector: (row) => "₹ " + formatAmount(row.debit),
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Credit",
      selector: (row) => "₹ " + formatAmount(row.credit),
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Closing Balance",
      selector: (row) => "₹ " + formatAmount(row.closingBalance),
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Head",
      selector: (row) => row.head,
      sortable: true,
      style: {
        fontSize: "16px",
      },
      cell(row) {
        //const value = formData.id == row._id ? formData.value : ""
        return (
          <input
            type="text"
            disabled={disabled}
            name="head"
            style={{ width: "100%" }}
            // value={row.child}
            //value={value}
            onBlur={(e) => updateHeadAndChild(row._id, "head", e.target.value)}
          />
        );
      },
    },
    {
      name: "Child",
      selector: (row) => row.child,
      sortable: true,
      style: {
        fontSize: "16px",
      },
      cell(row) {
        return (
          <input
            type="text"
            disabled={disabled}
            name="child"
            style={{ width: "100%" }}
            // value={row.child}
            onBlur={(e) => updateHeadAndChild(row._id, "child", e.target.value)}
          />
        );
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        // minHeight: "72px",
        // border:'1px solid #2f2f2f'
      },
    },
    headCells: {
      style: {
        // paddingLeft: "8px",
        // paddingRight: "8px",
        padding: "0px 8px",
        color: "white",
        backgroundColor: "#2DA2FB",
        fontSize: "16px",
        // border: "1px solid black",
      },
    },

    cells: {
      style: {
        // paddingLeft: "8px",
        // paddingRight: "8px",
        padding: "0px 8px",
        border: "1px solid black",
      },
    },
  };

  return (
    <>
      {/* <DatatableToShow
        columns={columns}
        data={unTaggedList}
        customStyles={customStyles}
        paginationNotShow={true}
      /> */}





      <div className="row mt-4 bg-light">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <button
            className="button btn btn-primary btn-block btn-lg"
            style={{ width: "100%" }}
            onClick={() => {
              setDisabled(!disabled);
            }}
          >
            Update Head & Child
          </button>
        </div>
      </div>
    </>
  );
};

export default Untagged;
