import React, { useContext } from "react";
import { multiStepContext } from "../../StepContext";

const SECTION = "propertyAcceptedForm";

export default function PropertyAcceptedForm({ state, onChange, onAddNote }) {
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
            <input
              className="switch-button-checkbox"
              type="checkbox"
              checked={state.offerMade && state.offerAccepted}
            ></input>
            <label className="switch-button-label" for="">
              <span className="switch-button-label-span">Sheet 2</span>
            </label>
          </div>
        </div>

        {/* description */}

        <h2>Property offer Accepted</h2>
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
            name="offerMade"
            type="checkbox"
            checked={state.offerMade}
            onChange={handleCheckboxChange}
          />

          <span>Offer Made </span>

          <br />
          <input
            className="item"
            name="offerAccepted"
            type="checkbox"
            checked={state.offerAccepted}
            onChange={handleCheckboxChange}
          />
          <span>Offer Accepted </span>
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
