import React, { useContext, useState } from "react";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const SECTION = "exchangeCompletionForm";

export default function ExchangeCompletionForm({ state, onChange, onAddNote }) {
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
                state.movingDateAgreed &&
                state.contractSigned &&
                state.contractExchanged &&
                state.keyCollected
              }
            ></input>
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Exchange and Completion</h2>
        <div className="description">
          <p>
          Exchange of contracts is the point at which the buyer pays a deposit 
          and the sale/purchase contract becomes legally binding. Completion is 
          when the balance of the payment for the property is passed over to the 
          seller's solicitor and ownership transfers to the buyer. Before this you need
          to make sure a date has been agreed and you have organised for the keys to be collected.
          This is usually from the estate agents office. The seller will be given a time which they 
          need to vacate the property by on the day and they will have arranged a moving company to ensure
          they have left the property by the agreed time.
          </p>
        </div>
        <div className="checkbox">
          <ul>
            <li>
              <input
                className="item"
                name="movingDateAgreed"
                type="checkbox"
                checked={state.movingDateAgreed}
                onChange={handleCheckboxChange}
              />

              <span>Moving Date Agreed</span>
            </li>
            <li>
              <input
                className="item"
                name="contractSigned"
                type="checkbox"
                checked={state.contractSigned}
                onChange={handleCheckboxChange}
              />
              <span>Contract Signed</span>
            </li>
            <li>
              <input
                className="item"
                name="contractExchanged"
                type="checkbox"
                checked={state.contractExchanged}
                onChange={handleCheckboxChange}
              />
              <span>Contract Exchanged</span>
            </li>
            <li>
              <input
                className="item"
                name="keyCollected"
                type="checkbox"
                checked={state.keyCollected}
                onChange={handleCheckboxChange}
              />
              <span>Agree Time to Collect the Key</span>
            </li>
          </ul>
        </div>

        <div>
          <button
            onClick={() => setStep(5)}
            type="button"
            className=" button2 item btn-back"
          >
            Back
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
