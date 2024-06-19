import React,{ useCallback,useEffect,useMemo,useState } from "react"
import { toast } from "react-toastify"
import { addTaggedTrail,fetchWithTempUntagged } from "../../../Utils/API_Axios"
import { toIndianCommaFormat } from '../../../Utils/math'
import { useFormData } from "./useFormData"
import { DefaultLedgerHeadDropDown1,DefaultLedgerHeadDropDown2,DefaultLedgerHeadDropDown3,DefaultLedgerHeadDropDown4,DefaultLedgerHeadDropDown5,DefaultLedgerHeadDropDown6,DefaultLedgerHeadMaster1,DefaultLedgerHeadMaster2,DefaultLedgerHeadMaster3,DefaultLedgerHeadMaster4,DefaultLedgerHeadMaster5,DefaultLedgerHeadMaster6 } from "../../../Utils/DefaultLedgerHeadDropDown"
import { Button,Table,TableHead,TableRow,TableCell,TableBody } from "@mui/material"

function flattenData(data, parent = null) {
  let result = [];
  data.forEach((item) => {
    if (item) {
      const newItem = {
        ...item,
        parentName: parent ? parent.name : null,
      };
      result.push(newItem);
      if (item.children && item.children.length > 0) {
        const children = flattenData(item.children, item);
        result = result.concat(children);
      }
    }
  });
  return result;
}
const masterDropdownMap = [
  { master: DefaultLedgerHeadMaster1, dropdown: DefaultLedgerHeadDropDown1 },
  { master: DefaultLedgerHeadMaster2, dropdown: DefaultLedgerHeadDropDown2 },
  { master: DefaultLedgerHeadMaster3, dropdown: DefaultLedgerHeadDropDown3 },
  { master: DefaultLedgerHeadMaster4, dropdown: DefaultLedgerHeadDropDown4 },
  { master: DefaultLedgerHeadMaster5, dropdown: DefaultLedgerHeadDropDown5 },
  { master: DefaultLedgerHeadMaster6, dropdown: DefaultLedgerHeadDropDown6 },
];

// Initialize cache outside of the function to persist across renders
const cache = new Map();

const findDropdownOptions = (parent) => {

  if (cache.has(parent)) {
    return cache.get(parent);
  }

  for (let map of masterDropdownMap) {
    if (map.master.includes(parent)) {

      cache.set(parent, map.dropdown);
      return map.dropdown;
    }
  }
  
  cache.set(parent, null);
  return null;
};

const DropdownOrInput = React.memo(({ ledger, item, handleOnChange }) => {
  const dropdownOptions = useMemo(() => findDropdownOptions(ledger.primaryGroup), [ledger.primaryGroup]);

  const handleDropdownChange = useCallback((e) => {
    handleOnChange(
      ledger.ledgerId,
      "head",
      e.target.value,
      ledger.opening_balance,
      ledger.debit,
      ledger.credit,
      ledger.closing_balance,
      ledger.name,
      item.name,
      ledger.masterHead
    );
  }, [handleOnChange, ledger, item]);

  const handleInputBlur = useCallback((e) => {
    handleOnChange(
      ledger.ledgerId,
      "head",
      e.target.value,
      ledger.opening_balance,
      ledger.debit,
      ledger.credit,
      ledger.closing_balance,
      ledger.name,
      item.name,
      ledger.masterHead
    );
  }, [handleOnChange, ledger, item]);

  return dropdownOptions ? (
    <select className="select_box_head" onChange={handleDropdownChange}>
      <option value=""></option>
      {dropdownOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <input type="text" onBlur={handleInputBlur} />
  );
});



const LedgerRow = React.memo(({ ledger, item, handleOnChange, filledLedgers, padding }) => {
  return (
    <tr key={ledger.ledgerId} className="ledger_child">
      <td style={{ paddingLeft: `${padding + 10}px` }}>{ledger.name}</td>
      <td className="numeric">{toIndianCommaFormat(ledger.opening_balance) || ""}</td>
      <td className="numeric">{toIndianCommaFormat(ledger.debit) || ""}</td>
      <td className="numeric">{toIndianCommaFormat(ledger.credit) || ""}</td>
      <td className="numeric">{ toIndianCommaFormat(ledger.closing_balance) || ""}</td>
      <td>
        <DropdownOrInput ledger={ledger} item={item} handleOnChange={handleOnChange} />
      </td>
      <td>
        {ledger.child ? (
          ledger.child
        ) : (
          <input
            type="text"
            onBlur={(e) =>
              handleOnChange(
                ledger.ledgerId,
                "child",
                e.target.value,
                ledger.opening_balance,
                ledger.debit,
                ledger.credit,
                ledger.closing_balance,
                ledger.name,
                item.name,
                ledger.masterHead

              )
            }
          />
        )}
      </td>
    </tr>
  );
});

const RenderRows =React.memo(({filledChildren = [],handleOnChange,filledLedgers =[], data =[], padding = 10}) => {
  return data.map((item, index) =>
    item?.name && !filledChildren[item.name] && ( !item.hasOwnProperty('isAnyUntagged') || item?.isAnyUntagged === true)   ? (
      <React.Fragment key={`${item.name}-${index}`}>
        {!filledChildren[item.name] && (
          <tr id={`parent-${item.name}-${index}`} style={{}}>
            <td 
              style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}
            >
              {item.name}
            </td>
            <td  style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}></td>
                    <td  style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}></td>
              <td  style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}></td>
              <td  style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}></td>
              <td  style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}></td>
              <td  style={{
                paddingLeft: `${padding}px`,
                backgroundColor: "#2DA2FB",
                color: "#fff",
              }}></td>
             
            
          </tr>
        )}
        {!filledChildren[item.name] && item.children ? <RenderRows filledChildren={filledChildren} handleOnChange={handleOnChange} filledLedgers={filledLedgers} data={item.children}  />: null}
        {item.ledger &&
          item.ledger.map((ledger) =>
            !filledLedgers[ledger.ledgerId] && (!ledger.head || !ledger.child) && (
              <LedgerRow
                key={ledger.ledgerId}
                ledger={ledger}
                item={item}
                handleOnChange={handleOnChange}
                filledLedgers={filledLedgers}
                padding={padding}
              />
            )
          )}
      </React.Fragment>
    ) : null
  );
}
// ,(p, n)=> {
//   return  p.filledChildren.length === n.filledChildren.length && 
//     p.filledLedgers.length === n.filledLedgers.length && 
//     p.data.length === n.data.length 
// }
)



const Untagged = ({ companyID }) => {
  const [jsonData, setJsonData] = useState([]);
  const [filledChildren, setFilledChildren] = useState({});
  const [formData, setFormData ] = useState([]);
  const [filledLedgers, setFilledLedgers] = useState({})
  const flattenedData = useMemo(() => flattenData(jsonData), [jsonData]);

  const checkAndHideParent = useCallback(
    (parentName) => {
      if (!parentName) return;
      const childrenOfParent = flattenedData.find(
        (item) => item.name === parentName
      );

      const allFilled = childrenOfParent?.ledger?.every((child) => {
        const formEntry = formData.find((formItem) => formItem.id === child.ledgerId);
        return formEntry && formEntry.head && formEntry.child;
      });

      if (allFilled) {
        setFilledChildren((prev) => ({ ...prev, [parentName]: true }));
      }
    },
    [flattenedData, formData]
  );
  useEffect(()=> {
     updateHiddenRows(jsonData, filledChildren)
  },[Object.keys(filledChildren).length])
  useEffect(()=> {
    const currentFilledLedgers = filledLedgers
    formData.forEach(({id, head, child})=> {
      if(typeof head==='string' && typeof child === 'string' && head!=='' && child !== ''){
        currentFilledLedgers[id] = true
      }
    });
    setFilledLedgers(currentFilledLedgers);
  }, [formData]);

  function updateHiddenRows(data, actualFilledChildren) {
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
        const areLedgersFilled = node.ledger.every(ledger=> ledger!==null && ledger.head !=='' || ledger.child!=='')

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
  };

  useEffect(() => {
    if(jsonData && filledChildren) {
      updateHiddenRows(jsonData, filledChildren);
    }
  }, [jsonData, filledChildren, updateHiddenRows]);

  useEffect(() => {
    const currentFilledLedgers = { ...filledLedgers };
    formData.forEach(({ id, head, child }) => {
      if (typeof head === 'string' && typeof child === 'string' && head !== '' && child !== '') {
        currentFilledLedgers[id] = true;
      }
    });
    setFilledLedgers(currentFilledLedgers);
  }, [formData]);


  const { handleOnChange } = useFormData(formData, setFormData, flattenedData, checkAndHideParent);
  const fetchData = useCallback(async (companyID) => {
    try {
      const response = await fetchWithTempUntagged({ companyID,  });
      if (response?.data?.errorStatus === 200) {
        setJsonData(response?.data?.data);
      } else if (response?.data?.errorStatus === 401) {
        toast.error(`Error: ${response?.data?.error}`);
      } else {
        toast.error(`There is some issue on fetching Trail unTagged not found.`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[companyID])

  useEffect(() => {

    fetchData(companyID);
  }, [companyID]);

  useEffect(() => {
    formData.forEach((f) => {
      checkAndHideParent(f.parentName);
    });
  }, [formData, checkAndHideParent]);

  const handleSubmit = async () => {
    try {
      const userID = JSON.parse(localStorage.getItem("userDetails"))._id;
      const response = await addTaggedTrail({ formData,companyID, userID });
      if (response?.data?.errorStatus === 200) {
        toast.success(`Data Updated Successfully....`);
      } else if (response?.data?.errorStatus === 400) {
        toast.warning(`Message: ${response?.data?.message}`);
      } else if (response?.data?.errorStatus === 401) {
        toast.error(`Error: ${response?.data?.error}`);
      } else {
        toast.error(`There is some issue try after sometime later.`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      fetchData(companyID);
    }

  };

  const masterDropdownMap = [
    { master: DefaultLedgerHeadMaster1, dropdown: DefaultLedgerHeadDropDown1 },
    { master: DefaultLedgerHeadMaster2, dropdown: DefaultLedgerHeadDropDown2 },
    { master: DefaultLedgerHeadMaster3, dropdown: DefaultLedgerHeadDropDown3 },
    { master: DefaultLedgerHeadMaster4, dropdown: DefaultLedgerHeadDropDown4 },
    { master: DefaultLedgerHeadMaster5, dropdown: DefaultLedgerHeadDropDown5 },
    { master: DefaultLedgerHeadMaster6, dropdown: DefaultLedgerHeadDropDown6 },
  ];


  const findDropdownOptions = (parent) => {
    for (let map of masterDropdownMap) {
      if (map.master.includes(parent)) {
        return map.dropdown;
      }
    }
    return null;
  };



  const renderRows = (data, padding = 10) => {

    return data.map((item, index) =>
      item?.name ? (
        <React.Fragment key={`${item.name}-${index}`}>
          {!filledChildren[item.name] && (
            <tr id={`parent-${item.name}-${index}`} style={{}}>
              <td colSpan={7}
                style={{
                  paddingLeft: `${padding}px`,
                  backgroundColor: "#2DA2FB",
                  color: "#fff",
                }}
              >
                {item.name}
              </td>
            </tr>
          )}
          {!filledChildren[item.name] && item.children && renderRows(item.children, padding + 10)}
          {item.ledger &&
            item.ledger.map((ledger) =>
              !filledLedgers[ledger.ledgerId] && (!ledger.head || !ledger.child) && (
                <tr key={ledger.ledgerId} className="ledger_child">
                  <td style={{ paddingLeft: `${padding + 10}px` }}>
                    {ledger.name}
                  </td>
                  <td>{ledger.opening_balance || ""}</td>
                  <td>{ledger.debit || ""}</td>
                  <td>{ledger.credit || ""}</td>
                  <td>{ledger.closing_balance || ""}</td>
                  <td>
                {(() => {
                  const dropdownOptions = findDropdownOptions(ledger.parent);
                  return dropdownOptions ? (
                    <select
                     className="select_box_head"
                      onChange={(e) =>
                        handleOnChange(
                          ledger._id,
                          "head",
                          e.target.value,
                          ledger.opening_balance,
                          ledger.debit,
                          ledger.credit,
                          ledger.closing_balance,
                          ledger.name,
                          item.name
                        )
                      }
                    >
                      <option ></option>
                      {dropdownOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      onBlur={(e) =>
                        handleOnChange(
                          ledger.ledgerId,
                          "head",
                          e.target.value,
                          ledger.opening_balance,
                          ledger.debit,
                          ledger.credit,
                          ledger.closing_balance,
                          ledger.name,
                          item.name
                        )
                      }
                    />
                  );
                })()}
              </td>
                  <td>
                    {ledger.child ? (
                      ledger.child
                    ) : (
                      <input
                        type="text"
                        onBlur={(e) =>
                          handleOnChange(
                            ledger.ledgerId,
                            "child",
                            e.target.value,
                            ledger.opening_balance,
                            ledger.debit,
                            ledger.credit,
                            ledger.closing_balance,
                            ledger.name,
                            item.name
                          )
                        }
                      />
                    )}
                  </td>
                </tr>
              )
            )}
        </React.Fragment>
      ) : null
    )
  }

  return (
    <div className="tab_data">
      <div className="w-50">
        <Button variant="contained" disableElevation sx={{ bgcolor: "#2DA2FB",width: "8rem" }} onClick={handleSubmit}>
          Update
        </Button>
      </div>

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
          <TableBody id="myTable">{renderRows(jsonData)}</TableBody>
        </Table>
      </div>


    </div>
  )
}

export default Untagged;
