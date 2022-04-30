// // import { useQuery } from "@apollo/client";

// import { QUERY_THOUGHTS } from "../utils/queries";

import React, { useContext, useState } from "react";
import { multiStepContext } from "../StepContext";
import { useParams } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import MortgagePrincipleForm from "../components/Roadmap/MortgagePrincipleForm";
import MortgageOfferForm from "../components/Roadmap/MortgageOfferForm";
import PropertyAcceptedForm from "../components/Roadmap/PropertyAcceptedForm";
import LegalSearchForm from "../components/Roadmap/LegalSearchForm";
import SurveyForm from "../components/Roadmap/SurveyForm";
import ExchangeCompletionForm from "../components/Roadmap/ExchangeCompletionForm";

import "../components/Roadmap/roadmap.css";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];
  const { buyerId } = useParams();
  console.log(buyerId);
  const [state, setState] = useState({
    mortgagePrincipleForm: {
      note: "",
      applyOnline: false,
      loanApplication: false,
      noteList: [],
      fileName: "",
      uploadedFile: {},
    },
    propertyAcceptedForm: {
      note: "",
      offerMade: false,
      offerAccepted: false,
      noteList: [],
      fileName: "",
      uploadedFile: {},
    },
    mortgageOfferForm: {
      note: "",
      loanAppoitment: false,
      offerReceived: false,
      offerAccepted: false,
      noteList: [],
    },
    legalSearchForm: {
      note: "",
      solicitorHired: false,
      searchesStarted: false,
      searchesCompleted: false,
      noteList: [],
    },
    surveyForm: {
      note: "",
      surveyTypeDecided: false,
      surveyCompleted: false,
      queriesResolved: false,
      noteList: [],
    },
    exchangeCompletionForm: {
      note: "",
      movingDateAgreed: false,
      contractSigned: false,
      contractExchanged: false,
      keyCollected: false,
      noteList: [],
    },
  });

  const handleChange = (section, name, value) => {
    setState((prevState) => ({
      ...prevState,
      [section]: { ...prevState[section], [name]: value },
    }));
  };

  const handleAddNote = (section, name, value) => {
    setState((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: [...prevState[section][name], value],
      },
    }));
  };

  const handleFieldChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { currentStep } = useContext(multiStepContext);
  function showStep(step) {
    switch (step) {
      case 1:
        return (
          <MortgagePrincipleForm
            state={state.mortgagePrincipleForm}
            onChange={handleChange}
            onAddNote={handleAddNote}
            onFieldChange={handleFieldChange}
          />
        );
      case 2:
        return (
          <PropertyAcceptedForm
            state={state.propertyAcceptedForm}
            onChange={handleChange}
            onAddNote={handleAddNote}
            onFieldChange={handleFieldChange}
          />
        );
      case 3:
        return (
          <MortgageOfferForm
            state={state.mortgageOfferForm}
            onChange={handleChange}
            onAddNote={handleAddNote}
            onFieldChange={handleFieldChange}
          />
        );
      case 4:
        return (
          <LegalSearchForm
            state={state.legalSearchForm}
            onChange={handleChange}
            onAddNote={handleAddNote}
            onFieldChange={handleFieldChange}
          />
        );
      case 5:
        return (
          <SurveyForm
            state={state.surveyForm}
            onChange={handleChange}
            onAddNote={handleAddNote}
            onFieldChange={handleFieldChange}
          />
        );
      case 6:
        return (
          <ExchangeCompletionForm
            state={state.exchangeCompletionForm}
            onChange={handleChange}
            onAddNote={handleAddNote}
            onFieldChange={handleFieldChange}
          />
        );
    }
  }
  return (
    <div className="Sheet">
      <div>
        <Stepper
          style={{ width: "100%" }}
          activeStep={currentStep - 1}
          orientation="horizontal"
        >
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      </div>
      {showStep(currentStep)}
    </div>
  );
};

export default Home;
