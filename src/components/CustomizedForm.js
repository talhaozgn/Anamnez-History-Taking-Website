import React, { useEffect, useRef, useState } from "react";
import questions from "../questions.json";
import DropdownInput from "./inputcomponents/DropdownInput.js";
import TextInput from "./inputcomponents/TextInput.js";
import RadioButtonInput from "./inputcomponents/RadioButtonInput.js";
import CheckboxInput from "./inputcomponents/CheckboxInput.js";
import TitleInput from "./inputcomponents/TitleInput";
import ReflectionInput from "./inputcomponents/ReflectionInput";
import ReactExport from "react-export-excel";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import FormulaInput from "./inputcomponents/FormulaInput";
import koc from "./koc2.png"
import amerikan from "./amerikan.png"

export default function CustomizedForm() {
  const [inp, setInp] = useState({}); // quesiton.q - value
  const [excelHere, setExcelHere] = useState(null);
  const [effective, setEffective] = useState({});

  const excelDownloadRef = useRef(null);

  useEffect(() => {
    let keys = {};
    let tmpEffective = {};

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].type === "checkbox")
        keys[questions[i].q] = new Array(questions[i].options.length).fill(
          false
        );
      else if (
        questions[i].type === "formula" ||
        questions[i].type === "reflection"
      ) {
        questions[i].formula.forEach((cur) => {
          if (cur !== "+" && cur !== "-" && cur !== "*" && cur !== "/") {
            if (!(cur in tmpEffective)) tmpEffective[cur] = [];

            if (!tmpEffective[cur].includes(i)) tmpEffective[cur].push(i);
          }
        });

        keys[questions[i].q] = "";
      } else keys[questions[i].q] = "";
    }

    setEffective(tmpEffective);
    setInp(keys);
  }, []);

  const calculateFormula = (formula, newInp) => {
    let st = [];

    formula.forEach((cur) => {
      if (cur === "+") {
        const s = st.pop();
        const f = st.pop();

        st.push(f + s);
      } else if (cur === "-") {
        const s = st.pop();
        const f = st.pop();

        st.push(f - s);
      } else if (cur === "*") {
        const s = st.pop();
        const f = st.pop();

        st.push(f * s);
      } else if (cur === "/") {
        const s = st.pop();
        const f = st.pop();

        st.push(f / s);
      } else {
        st.push(parseFloat(newInp[cur]));
      }
    });

    const res = st.pop();
    if (isNaN(res)) return "";

    return res.toFixed(1);
  };

  const calculateReflection = (formula, newInp) => {
    const values = formula.map((index) => newInp[index]);

    return values.join(", ");
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    if (name in effective) {
      let newInp = { ...inp, [name]: value };

      effective[name].forEach((index) => {
        const question = questions[index];
        if (question.type === "formula")
          newInp[question.q] = calculateFormula(question.formula, newInp);
        else if (question.type === "reflection") {
          newInp[question.q] = calculateReflection(question.formula, newInp);
        }
      });

      setInp(newInp);
    } else {
      setInp({
        ...inp,
        [name]: value,
      });
    }
  };

  const handleCheckbox = (k, position) => {
    const updatedCheckedState = inp[k].map((item, index) =>
      index === position ? !item : item
    );

    setInp({
      ...inp,
      [k]: updatedCheckedState,
    });
  };

  const handleRadiobutton = (e) => {
    const { name, value } = e.target;

    setInp({
      ...inp,
      [name]: value,
    });
  };

  const renderInput = (q) => {
    if (q.type === "text") {
      return (
        <TextInput
          k={q.q}
          v={inp[q.q]}
          handleChange={handleChange}
          inline={q.inline}
        />
      );
    } else if (q.type === "radiobutton") {
      return (
        <RadioButtonInput
          k={q.q}
          options={q.options}
          handleChange={handleRadiobutton}
          inline={q.inline}
        />
      );
    } else if (q.type === "dropdown") {
      return (
        <DropdownInput
          k={q.q}
          options={q.options}
          handleChange={handleChange}
          inline={q.inline}
        />
      );
    } else if (q.type === "checkbox") {
      return (
        <CheckboxInput
          k={q.q}
          v={inp[q.q]}
          options={q.options}
          handleChange={handleCheckbox}
          inline={q.inline}
        />
      );
    } else if (q.type === "title") {
      return (
        <TitleInput
          k={q.q}
          size={q.size}
          underlined={q.underlined}
          center={q.center}
        />
      );
    } else if (q.type === "formula") {
      return <FormulaInput k={q.q} v={inp[q.q]} inline={q.inline} />;
    } else if (q.type === "reflection") {
      return <ReflectionInput value={inp[q.q]} />;
    } else {
      console.log("unknown question type");
    }
  };

  const renderQuestion = (q, index) => {
    if (q.type === "reflection" && !inp[q.q]) return null;

    let colSize = "col-12";
    if (q["blockSize"]) colSize = "col-" + q["blockSize"];

    return (
      <div
        key={index}
        className={`${
          q["type"] !== "title" ? "renderQuestion" : ""
        } p-3 d-inline-block ${colSize}`}
      >
        {renderInput(q)}
      </div>
    );
  };

  const getDataSet = () => {
    let dataSet = {};

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].type === "checkbox") {
        let tmp = "";
        let flag = false;

        for (let j = 0; j < questions[i].options.length; j++)
          if (inp[questions[i].q][j]) {
            if (flag) tmp = tmp.concat(", ");
            tmp = tmp.concat(questions[i].options[j]);
            flag = true;
          }

        dataSet[questions[i].q] = tmp;
      } else if (questions[i].type !== "title")
        dataSet[questions[i].q] = inp[questions[i].q];
    }

    return dataSet;
  };

  const getFilename = () => {
    return inp["Ad Soyad"] + "-" + inp["Tarih"];
  };

  const exportExcel = () => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    setExcelHere(
      <ExcelFile
        filename={getFilename()}
        element={<button className="d-none">Download Excel</button>}
      >
        <ExcelSheet data={[getDataSet()]} name="excel-export">
          {questions
            .filter((x) => x.type !== "title" && x.type !== "reflection")
            .map((x) => (
              <ExcelColumn label={x.q} value={x.q} />
            ))}
        </ExcelSheet>
      </ExcelFile>
    );
  };

  useEffect(() => {
    if (excelHere) excelDownloadRef.current.firstChild.firstChild.click();
  }, [excelHere]);

  const exportDoc = () => {
    const dataSet = getDataSet();
    let docText = [];

    const pushEmptyLine = () => {
      docText.push(
        new Paragraph({
          children: [new TextRun({ text: "", size: 24 })],
        })
      );
    };

    questions.forEach((question) => {
      if (question.type === "title") {
        let textSpecs = {
          text: question.q,
          bold: true,
          size: (6 - question.size) * 2 + 26,
        };
        let paraSpecs = {};

        if (question.underlined) textSpecs["underline"] = {};

        if (question.center) paraSpecs["alignment"] = AlignmentType.CENTER;

        docText.push(
          new Paragraph({
            ...paraSpecs,
            children: [new TextRun(textSpecs)],
          })
        );

        pushEmptyLine();
      } else if (question.type === "reflection") {
        if (dataSet[question.q]) {
          docText.push(
            new Paragraph({
              children: [new TextRun({ text: dataSet[question.q], size: 24 })],
            })
          );

          pushEmptyLine();
        }
      } else {
        if (question.inline) {
          docText.push(
            new Paragraph({
              children: [
                new TextRun({ text: question.q, bold: true, size: 24 }),
                new TextRun({ text: ": ", size: 24 }),
                new TextRun({ text: dataSet[question.q], size: 24 }),
              ],
            })
          );
        } else {
          docText.push(
            new Paragraph({
              children: [
                new TextRun({ text: question.q, bold: true, size: 24 }),
              ],
            })
          );
          docText.push(
            new Paragraph({
              children: [new TextRun({ text: dataSet[question.q], size: 24 })],
            })
          );
        }

        pushEmptyLine();
      }
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [...docText],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, getFilename() + ".docx");
    });
  };

  const exportAll = () => {
    exportExcel();
    exportDoc();
  };

  return (
    <React.Fragment>
      <div>
      <img src={koc} alt="" width="315" height="67" style={{  top: 34, left: 68 }}/>
      <img src={amerikan} alt="" width="450" height="170" style={{ position: 'absolute', top: -35, right: -75 }}/>
      </div>
     <p></p>
      <div>{questions.map((x, index) => renderQuestion(x, index))}</div>
      <button className="btn btn-primary w-100 mt-3" onClick={exportAll}>
        Export
      </button>
      <div ref={excelDownloadRef}>{excelHere}</div>
    </React.Fragment>
  );
}
