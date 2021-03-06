import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useInput from "../../../../hooks/use-input";
import classes from "../create.module.css";

import { BsCheckSquareFill } from "react-icons/bs";
import { BsCardText } from "react-icons/bs";
import { BsFillXSquareFill } from "react-icons/bs";

const isText = (value) => value.trim().lengtd > 0;
const TdForms = (props) => {
  const [inputValue, setinputValue] = useState("nothing");
  const [showInput, setShowInput] = useState(false);
  const {
    value: tdValue,
    isValid: tdIsValid,
    hasError: tdHasError,
    valueChangeHandler: tdChangeHandler,
    reset: resetTd,
  } = useInput(isText);

  const trueValueHanler = () => {
    setShowInput(false);
    setinputValue("true");

    props.trValue[+props.numberRow - 1] = "true";
  };
  const textValueHanler = () => {
    setShowInput(true);
    setinputValue("text");
  };
  const falseValueHanler = () => {
    setShowInput(false);
    setinputValue("false");
    props.trValue[+props.numberRow - 1] = "false";
  };

  const tdBlurHandler = () => {
    setinputValue(tdValue);
    props.trValue[+props.numberRow - 1] = tdValue;
  };

  const tdWidth = 100 / props.columnsCount;
  return (
    <td style={{ width: `${tdWidth}%` }}>
      <Form.Label className="text-center w-100">
        Td {props.numberColumn}_{props.numberRow}
      </Form.Label>
      <div className={classes.tdValue}>
        {props.numberRow !== 1 && (
          <BsCheckSquareFill
            className={
              inputValue !== "true"
                ? `${classes.trueValue}`
                : `${classes.trueValue} ${classes.selectedValue}`
            }
            onClick={trueValueHanler}
          />
        )}
        {props.numberRow !== 1 && !showInput && (
          <BsCardText onClick={textValueHanler} />
        )}
        {(props.numberRow === 1 || showInput) && (
          <Form.Control
            type="text"
            className={
              inputValue !== "text" ? `mx-2` : `mx-2 ${classes.inputSelected}`
            }
            placeholder={`Td ${props.numberColumn}_${props.numberRow}`}
            required
            value={tdValue}
            onChange={tdChangeHandler}
            onBlur={tdBlurHandler}
          />
        )}

        {props.numberRow !== 1 && (
          <BsFillXSquareFill
            className={
              inputValue !== "false"
                ? `${classes.falseValue}`
                : `${classes.falseValue} ${classes.selectedValue}`
            }
            onClick={falseValueHanler}
          />
        )}
      </div>
    </td>
  );
};

export default TdForms;
