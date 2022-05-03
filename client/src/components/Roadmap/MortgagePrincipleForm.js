import React, { useContext, useState } from "react";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const SECTION = "mortgagePrincipleForm";

export default function MortgagePrincipleForm({ state, onChange, onAddNote}) {
  const { setStep } = useContext(multiStepContext);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  // const [uploadedFile, setUploadedFile] = useState({});

  const handleSave = (e) => {
    onAddNote(SECTION, "noteList", state.note);
    onChange(SECTION, "note", "");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    onChange(SECTION, name, value);
  };

  const handleCheckboxChange = (e) => {
    const { checked, name } = e.target;
    onChange(SECTION, name, checked);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;
      onChange(SECTION, "uploadedFile",{ fileName, filePath });
    } catch (err) {
      if (err.response.status === 5000) {
        console.log("Problem with server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="sheet">
      <form>
        {/* toggle button */}
        <div className="switcher">
          <div className="switch-button">
            {/* {state.loanApplication && state.applyOnline ? (
              <input
                className="switch-button-checkbox"
                type="checkbox"
                defaultChecked={state.loanApplication && state.applyOnline}
              />
            ) : (
              <input
                className="switch-button-checkbox"
                type="checkbox"
                defaultChecked={state.loanApplication && state.applyOnline}
              />
            )} */}

            <input
              className="switch-button-checkbox"
              type="checkbox"
              checked={state.loanApplication && state.applyOnline}
              onChange={(e) => {}}
            ></input>
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Mortgage in Principle</h2>
        <div className="description">
          <p>
            To get a mortgage in principle you need to apply online. First use a comparison website to find a good rate or speak
            to a mortgage advisor who can help you find one. Once you have chosen your lender and product you need to apply online
            with your income and expenditure information. You will also be asked to provide the details of the mortgage amount you
            are looking for and your deposit amount. After submitting you are usually given an answer within a couple of minutes.
            If accepted you have a mortgage in principle offer. When you apply for your actual mortgage you need to keep the details
            of your principle offer. It's also handy to let the estate agent know you have this.
          </p>
        </div>
        <div className="checkbox">
          <ul>
            <li>
              <input
                className="item"
                name="applyOnline"
                type="checkbox"
                checked={state.applyOnline}
                onChange={handleCheckboxChange}
              />

              <span>Apply online </span>
            </li>
            <li>
              <input
                className="item"
                name="loanApplication"
                type="checkbox"
                checked={state.loanApplication}
                onChange={handleCheckboxChange}
              />
              <span>Mortgage Loan Application </span>
            </li>
          </ul>

       
        </div>

        <div>
          <button
            onClick={() => setStep(2)}
            type="button"
            className=" button2 item btn-next"
          >
            Next
          </button>
        </div>
        <div>
          <label>Leave a note:</label> <br />
          <textarea
            value={state.note || ""}
            name="note"
            className="note"
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="button" className="button1 btn-save" onClick={handleSave}>
          Save
        </button>
        <div>
          <h3>User comments:</h3>
          <ul>
            {state.noteList.map((note) => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>File Upload</h4>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onFileChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>
        </div>
        <input onClick={handleUpload} value="Upload" className="btn btn-primary mt-4" />
      </form>
      {state.uploadedFile ? (
        <div className="row mt-4">
         <a href="'/client/src/assets/${file.name}`" target="_blank">
         <h5
           name="file"
          >
           {state.uploadedFile?.fileName}</h5>
         </a>
         
        </div>
      ) : null}
    </div>
  );
}
