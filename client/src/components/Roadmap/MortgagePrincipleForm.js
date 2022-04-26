import React, { useContext } from "react";
import { multiStepContext } from "../../StepContext";

const SECTION = "mortgagePrincipleForm";

export default function MortgagePrincipleForm({ state, onChange, onAddNote }) {
  const { setStep } = useContext(multiStepContext);

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

  return (
    <div className="sheet">
      <form>
        {/* toggle button */}
        <div className="switcher">
          <div className="switch-button">
            {state.loanApplication && state.applyOnline ? (
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
            )}
            {/* <input
              className="switch-button-checkbox"
              type="checkbox"
              checked={state.loanApplication && state.applyOnline}
              onChange={(e) => {}}
            ></input> */}
            <label className="switch-button-label">
              <span className="switch-button-label-span">In Progress</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Mortgage in Principle</h2>
        <div className="description">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div>
          <input
            className="item"
            name="applyOnline"
            type="checkbox"
            checked={state.applyOnline}
            onChange={handleCheckboxChange}
          />

          <span>Apply online </span>

          <br />
          <input
            className="item"
            name="loanApplication"
            type="checkbox"
            checked={state.loanApplication}
            onChange={handleCheckboxChange}
          />
          <span>Mortgage Loan Application </span>
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
        <br />
        <button type="button" className="button1 btn-save" onClick={handleSave}>
          Save
        </button>
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
          <h3>User comments:</h3>
          <ul>
            {state.noteList.map((note) => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
