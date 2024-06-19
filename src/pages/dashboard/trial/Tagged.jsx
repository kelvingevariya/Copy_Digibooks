import React,{ useCallback,useEffect,useMemo,useState } from "react"
import { toast } from "react-toastify"
import { fetchWithTempUntagged } from "../../../Utils/API_Axios"
import { toIndianCommaFormat } from "../../../Utils/math"
import { Table,TableHead,TableRow,TableCell,TableBody } from "@mui/material"

const flattenData = (data,parent = null) => {
  let result = []
  data.forEach((item) => {
    if (item) {
      const newItem = {
        ...item,
        parentName: parent ? parent.name : null,
      }
      result.push(newItem)
      if (item.children && item.children.length > 0) {
        const children = flattenData(item.children,item)
        result = result.concat(children)
      }
    }
  })
  return result
}

const Tagged = ({ companyID,currentTab }) => {
  const [jsonData,setJsonData] = useState([])
  const [filledChildren,setFilledChildren] = useState({})
  const [filledLedgers,setFilledLedgers] = useState({})

  const flattenedData = useMemo(() => flattenData(jsonData), [jsonData]);

  const checkAndHideParent = useCallback(
    (parentName) => {
      if (!parentName) return;
      const childrenOfParent = flattenedData.find(
        (item) => item.name === parentName
      );

      const allFilled = childrenOfParent?.ledger?.every((child) => {
        return (
          (child.head && child.child) ||
          (child.isTagged && !child.head && !child.child)
        );
      });

      if (allFilled) {
        setFilledChildren((prev) => ({ ...prev, [parentName]: true }));
      }
    },
    [flattenedData]
  );

  const updateHiddenRows = useCallback(
    (data, actualFilledChildren) => {
      let filledChildren = { ...actualFilledChildren };
      const checkAndHide = (node) => {
        if (!node || !node.children) return;
        if (filledChildren?.[node?.name]) return;

        node.children.forEach((child) => {
          if (child) {
            checkAndHide(child);
          }
        });
        const areAllChildrenFilled = node.children.every(
          (child) => child === null || (child.name && filledChildren[child.name])
        );

        if (areAllChildrenFilled && node.name) {
          const areLedgersFilled = node.ledger.every(
            (ledger) =>
              ledger === null ||
              ((ledger.head && ledger.child) ||
                (ledger.isTagged && !ledger.head && !ledger.child))
          );

          filledChildren[node.name] = areLedgersFilled;
        }
      };

      data.forEach((node) => {
        if (node) {
          checkAndHide(node);
        }
      });
      setFilledChildren((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(filledChildren)) {
          return filledChildren;
        }
        return prev;
      });
    },
    []
  );

  useEffect(() => {
    if (jsonData) {
      updateHiddenRows(jsonData, filledChildren);
    }
  }, [jsonData, filledChildren, updateHiddenRows]);

  const fetchData = useCallback( async () => {
    try {
      const response = await fetchWithTempUntagged({ companyID });
      if (response?.data?.errorStatus === 200) {
        setJsonData(response?.data?.data);
      } else if (response?.data?.errorStatus === 401) {
        return toast.error(`Error: ${response?.data?.error}`);
      } else {
        return toast.error(`There is some issue on fetching Trail unTagged not found.`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[companyID])

  useEffect(()=> {
    fetchData(companyID)
  },[companyID, currentTab])

  const renderRows = (data, padding, lastHeaderPadding) => {
    return data.map((item, index) => {
      return item?.name && item?.isAnyTagged ? (
        <React.Fragment key={index}>
          <tr>
            <td
              style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            >
              {item.name}
            </td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
            <td
              style={{
                paddingLeft: "10px",
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            ></td>
          </tr>
          {item.children  && 
            renderRows(item.children, padding + 10, lastHeaderPadding)}
          {item.ledger &&  
            item.ledger.map(
              (ledger, i) =>
                ((ledger.head && ledger.child) ||
                  (ledger.isTagged && !ledger.head && !ledger.child)) && (
                  <tr key={`${index}-${i}`} className="ledger_child">
                    <td style={{ paddingLeft: `${padding + 10}px` }}>
                      {ledger.name}
                    </td>
                    <td className='numeric'>{toIndianCommaFormat(ledger.opening_balance) || ""}</td>
                    <td className='numeric'>{toIndianCommaFormat(ledger.debit) || ""}</td>
                    <td className='numeric'>{toIndianCommaFormat(ledger.credit) || ""}</td>
                    <td className='numeric'>{toIndianCommaFormat(ledger.closing_balance) || ""}</td>
                    <td>{ledger.head || ""}</td>
                    <td>{ledger.child || ""}</td>
                  </tr>
                )
            )}
        </React.Fragment>
      ) : null;
    });
  };

  return (
    <div className="tab_data">
      <div className="tableTrail">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col" className="f-13">Particulars</TableCell>
              <TableCell scope="col" className="f-13">Open Bal</TableCell>
              <TableCell scope="col" className="f-13">Debit</TableCell>
              <TableCell scope="col" className="f-13">Credit</TableCell>
              <TableCell scope="col" className="f-13">Close Bal</TableCell>
              <TableCell scope="col" className="f-13">Head</TableCell>
              <TableCell scope="col" className="f-13">Child</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="myTable">{renderRows(jsonData,10,10)}</TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Tagged;
