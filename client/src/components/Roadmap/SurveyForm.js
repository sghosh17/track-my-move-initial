import React, { useContext, useState } from "react";
import { multiStepContext } from "../../StepContext";
import axios from "axios";

const SECTION = "surveyForm";

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
                state.surveyTypeDecided &&
                state.surveyCompleted &&
                state.queriesResolved
              }
              onChange={(e) => {}}
            ></input>
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Survey</h2>
        <div className="description">
          <p>
          A house survey is an inspection of a property’s condition conducted by experts. 
          The experts – surveyors – inspect the property and tell you if there are any 
          issues to do with the condition of the property from minor to significant structural 
          problems. They will highlight what repairs or alterations are needed, whether it’s 
          addressing a damp patch or replacing a whole roof. The report from the surveyor also 
          provides expert commentary on the property, from the type of walls to the type of glazing.
          There are three types of surveys which you can choose from:
          <ul>
      <li>
      RICS Home Survey – Level 1
The RICS Home Survey Level 1 is the most basic – and cheapest – 
survey. It is suitable if you’re buying a conventional property built 
from common building materials and in reasonable condition. It was previously called a Condition Report.

The Level 1 survey provides a ‘traffic light’ rating of the condition 
of different parts of the building, services, and the grounds, showing problems 
that may require varying degrees of attention and an assessment of the relative 
importance of the problems. It also includes a summary of risks to the building, 
people and grounds. But the report doesn’t go into much detail and doesn’t include 
any advice nor a valuation.
      </li>
      <li>
      RICS Home Survey – Level 2
Previously called a Home Buyer Report, this mid-level survey is a popular choice for 
most people buying a conventional property in reasonable condition. It covers everything you’d 
get in a RICS Home Survey Level 1, plus they check roof spaces and cellars. 

You’ll also get recommendations for further investigations where the property surveyor is
 unable to reach a conclusion with reasonable confidence. The report will also give advice 
 on budget for any repairs and on the amount of ongoing maintenance required in the future

RICS Home Survey Level 2 are offered with or without a valuation. If you opt for a Home 
Survey Level 2 with Valuation, it will also include a market value, an insurance reinstatement 
figure and a list of problems that the property surveyor considers may affect the value of the property.
      </li>
      <li>
      RICS Home Survey – Level 3
The RICS Home Survey Level 3, also known as a full structural survey and previously as a RICS Building Survey, 
is the most thorough survey offered by RICS.

It is a good house survey option if you’re buying a property over 50 years old, of unusual design, is a listed 
building or in poor condition; if you’re planning to undertake renovations or have any concerns about the property. 
And while they are more expensive, they are thorough. 

The Level 3 survey will include everything you would get in a RICS Home Survey Level 2, plus it will describe 
the identifiable risk and causes of potential or hidden defects in areas not inspected. It will outline the likely 
scope of any appropriate remedial work and explain the likely consequences of non-repair. Plus you’ll get recommendations
 in respect of the priority and likely timescale for necessary repairs. 
      </li>
    </ul>

    Although there is no legal requirement to have a survey it is certainly a good idea considering any unwanted suprises
    with the property could cost thousands whereas a survey should only cost a few hundred pounds. Once the survey is complete 
    you need to review it and decide if you still want to purchase the property and if you are still willing to pay the same price.
    It is quite common for some work to be needed like fixing a roof or damp proofing - then it is back to negotiating who 
    will cover the cost for this. The seller is under no obligation to lower the price or fix any work needed but depending 
    on the type of improvements needed its not unusual for them to arrange for the improvements or lower the property price 
    by the amount it would cost. If this happens you will need to update your lender with the new price.
          </p>
        </div>
        <div className="checkbox">
          <ul>
            <li>
              <input
                className="item"
                name="surveyTypeDecided"
                type="checkbox"
                checked={state.surveyTypeDecided}
                onChange={handleCheckboxChange}
              />

              <span>Decide on Survey Type</span>
            </li>
            <li>
              <input
                className="item"
                name="surveyCompleted"
                type="checkbox"
                checked={state.surveyCompleted}
                onChange={handleCheckboxChange}
              />
              <span>Survey Completed</span>
            </li>
            <li>
              <input
                className="item"
                name="queriesResolved"
                type="checkbox"
                checked={state.queriesResolved}
                onChange={handleCheckboxChange}
              />
              <span>Queries Resolved</span>
            </li>
          </ul>

          
        </div>

        <div>
          <button
            onClick={() => setStep(4)}
            type="button"
            className=" button2 item btn-back"
          >
            Back
          </button>
          <button
            onClick={() => setStep(6)}
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
