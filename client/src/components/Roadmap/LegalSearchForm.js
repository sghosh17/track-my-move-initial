import React, { useContext, useState } from "react";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const SECTION = "legalSearchForm";

export default function LegalSearchForm({ state, onChange, onAddNote }) {
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
                state.solicitorHired &&
                state.searchesStarted &&
                state.searchesCompleted
              }
              onChange={(e) => {}}
            ></input>
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Legal Searches</h2>
        <div className="description">
          <p>
    Now you have your mortgage confirmed you need to hire a conveyancing Solicitor.
    A solicitor or conveyancer will handle all the legal aspects of buying or selling a 
    property for you. A good one will keep you updated regularly, and can support 
    you by answering questions about the process of buying a property. Depending on the property 
    type what they do can vary but the the most common role is under-taking the searches required
    when purchasing a property. They include:
    <ul>
      <li>
      Local authority searches

      </li>

      <li>
      Land Registry searches.
      </li>
      <li>
      Environmental searches. 
      </li>
      <li>
      Water authority searches.
      </li>
      <li>
      Location specific searches.
      </li>
      <li>
      Chancel repair search.
      </li>

    </ul>
          Your lender may have some conveyancers that they recommend to use but its always a good idea to look around
           to see what is available. Speak to friends and family who may have some recommendations.
          </p>
        </div>
        <div className="checkbox">
          <ul>
            <li>
              <input
                className="item"
                name="solicitorHired"
                type="checkbox"
                checked={state.solicitorHired}
                onChange={handleCheckboxChange}
              />

              <span>Solicitor Hired </span>
            </li>
            <li>
              <input
                className="item"
                name="searchesStarted"
                type="checkbox"
                checked={state.searchesStarted}
                onChange={handleCheckboxChange}
              />
              <span>Searches Started</span>
            </li>
            <li>
              <input
                className="item"
                name="searchesCompleted"
                type="checkbox"
                checked={state.searchesCompleted}
                onChange={handleCheckboxChange}
              />
              <span>Searches Completed </span>
            </li>
          </ul>

    
        </div>

        <div>
          <button
            onClick={() => setStep(3)}
            type="button"
            className=" button2 item btn-back"
          >
            Back
          </button>
          <button
            onClick={() => setStep(5)}
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
