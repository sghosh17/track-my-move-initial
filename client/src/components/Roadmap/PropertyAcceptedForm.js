import React, { useContext, useState } from "react";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const SECTION = "propertyAcceptedForm";

export default function PropertyAcceptedForm({ state, onChange, onAddNote }) {
  const { setStep } = useContext(multiStepContext);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  //const [uploadedFile, setUploadedFile] = useState({});

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
              checked={state.offerMade && state.offerAccepted}
              onChange={(e) => {}}
            ></input>
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Property offer Accepted</h2>
        <div className="description">
          <p>
            After getting your mortgage in principle offer and with a good idea of what you can afford you can now start
            to book viewings at properties you like. According to an article by What Mortgage from February 2017, the majority 
            of home buyers view six or more properties before they make the decision to commit to buying one. A lot of properties 
            which are expecting multiple bidders have a minimum price known as 'Offers over'. If there are multiple bidders then
            the seller can do a 'best and final'. This means you have to submit to the estate agent your final offer and the seller 
            will choose the bid they prefer. 
            Properties can also be listed for an exact amount, in this case its usually a good idea to start the negotiation
            at a lower price. Negotiation is an art and you should research this before making any bids.
          
          </p>
        </div>
        <div className="checkbox">
          <ul>
            <li>
              <input
                className="item"
                name="offerMade"
                type="checkbox"
                checked={state.offerMade}
                onChange={handleCheckboxChange}
              />

              <span>Offer Made </span>
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
            onClick={() => setStep(1)}
            type="button"
            className=" button2 item btn-back"
          >
            Back
          </button>
          <button
            onClick={() => setStep(3)}
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
