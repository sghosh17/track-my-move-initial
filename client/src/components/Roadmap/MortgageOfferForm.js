import React, { useContext, useState } from "react";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const SECTION = "mortgageOfferForm";

export default function MortgageOfferForm({ state, onChange, onAddNote }) {
  const { setStep } = useContext(multiStepContext);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

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
            <input
              className="switch-button-checkbox"
              type="checkbox"
              checked={
                state.loanAppoitment &&
                state.offerReceived &&
                state.offerAccepted
              }
              onChange={(e) => {}}
            ></input>
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Mortgage Offer</h2>
        <div className="description">
          <p>
         Once you have had an offer accepted on a property you can finalise your mortgage. Return to either your
         online account with the lender or contact your mortgage broker and complete the application for the 
         actual mortgage. Be prepared to provide payslips and proof of addresses. If you have been on any kind
         of leave from employment (e.g. maternity leave) you should be able to provide payslips from before
         this leave. The actual mortgage application can take anywhere between 2 and 6 weeks depending on circumstances.
          </p>
        </div>
        <div className="checkbox">
          <ul>
            <li>
              <input
                className="item"
                name="loanAppoitment"
                type="checkbox"
                checked={state.loanAppoitment}
                onChange={handleCheckboxChange}
              />

              <span>Loan Appointment </span>
            </li>
            <li>
              <input
                className="item"
                name="offerReceived"
                type="checkbox"
                checked={state.offerReceived}
                onChange={handleCheckboxChange}
              />
              <span>Offer Received </span>
            </li>
            <li>
              <input
                className="item"
                name="offerAccepted"
                type="checkbox"
                checked={state.offerAccepted}
                onChange={handleCheckboxChange}
              />
              <span>Offer Accepted </span>
            </li>
          </ul>

         
        </div>

        <div>
          <button
            onClick={() => setStep(2)}
            type="button"
            className=" button2 item btn-back"
          >
            Back
          </button>
          <button
            onClick={() => setStep(4)}
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
         <a href="`/client/src/assets/${file.name}`" target="_blank">
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
