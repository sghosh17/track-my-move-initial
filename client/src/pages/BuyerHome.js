import { useQuery } from "@apollo/client";

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
import { QUERY_FORMS } from "../utils/queries";
import { useEffect } from "react";
import auth from "../utils/auth";

const Home = () => {
  const userId = auth.getProfile().data._id;
  console.log(userId);
  const [state, setState] = useState(null);
  const { loading, data } = useQuery(QUERY_FORMS, {
    variables: {
      userId,
    },
  });
  console.log({ data, loading });
  useEffect(() => {
    if (!loading) {
      const forms = data?.forms || [];

      let defaultState = {};
      console.log({ forms });

      const formNames = forms.map((form) => {
        return form.formName;
      });

      console.log({ formNames });
      formNames?.map((formName) => {
        defaultState[formName] = forms.find((form) => {
          return form.formName === formName;
        });
      });
      console.log(defaultState);

      setState(defaultState);
    }
  }, [data?.forms, loading]);

  const { buyerId } = useParams();

  console.log(buyerId);

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
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!state) {
    return <div>No form data</div>;
  }
  console.log(state);
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
