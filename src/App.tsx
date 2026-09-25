import { useState } from "react";
import "./App.css";
import { forms } from "./assets/options.json";
import {
    Activity,
    Attire,
    Cuisine,
    Location,
    Submit,
} from "./components/formPages";
import { Landing } from "./components/Landing";

type FormPage =
    | "START"
    | "LOCATION"
    | "ATTIRE"
    | "CUISINE"
    | "ACTIVITY"
    | "SUBMIT";

const getFormTitle = (formId: string) =>
    forms.find((f) => f.id === formId)?.title;

const getOptionTitle = (formId: string, optionId: string) =>
    forms.find((f) => f.id === formId)?.options.find((o) => o.id === optionId)
        ?.title;

const getOptionPrimaryImage = (formId: string, optionId: string) =>
    forms.find((f) => f.id === formId)?.options.find((o) => o.id === optionId)
        ?.pictures[0];

function App() {
    const [currentPage, setCurrentPage] = useState<FormPage>("START");

    const [locationId, setLocationId] = useState<string>("");
    const [attireId, setAttireId] = useState<string>("");
    const [cuisineId, setCuisineId] = useState<string>("");
    const [activityId, setActivityId] = useState<string>("");

    const selections = [
        ...(locationId
            ? [
                  {
                      optionId: locationId,
                      optionTitle: getFormTitle("location") ?? "",
                      optionSelection:
                          getOptionTitle("location", locationId) ?? "",
                      optionPrimaryImage: getOptionPrimaryImage(
                          "location",
                          locationId,
                      )!,
                      onEdit: () => {
                          setCurrentPage("LOCATION");
                          setLocationId("");
                      },
                  },
              ]
            : []),

        ...(attireId
            ? [
                  {
                      optionId: attireId,
                      optionTitle: getFormTitle("attire") ?? "",
                      optionSelection: getOptionTitle("attire", attireId) ?? "",
                      optionPrimaryImage: getOptionPrimaryImage(
                          "attire",
                          attireId,
                      )!,
                      onEdit: () => {
                          setCurrentPage("ATTIRE");
                          setAttireId("");
                      },
                  },
              ]
            : []),

        ...(cuisineId
            ? [
                  {
                      optionId: cuisineId,
                      optionTitle: getFormTitle("cuisine") ?? "",
                      optionSelection:
                          getOptionTitle("cuisine", cuisineId) ?? "",
                      optionPrimaryImage: getOptionPrimaryImage(
                          "cuisine",
                          cuisineId,
                      )!,
                      onEdit: () => {
                          setCurrentPage("CUISINE");
                          setCuisineId("");
                      },
                  },
              ]
            : []),

        ...(activityId
            ? [
                  {
                      optionId: activityId,
                      optionTitle: getFormTitle("activity") ?? "",
                      optionSelection:
                          getOptionTitle("activity", activityId) ?? "",
                      optionPrimaryImage: getOptionPrimaryImage(
                          "activity",
                          activityId,
                      )!,
                      onEdit: () => {
                          setCurrentPage("ACTIVITY");
                          setActivityId("");
                      },
                  },
              ]
            : []),
    ];

    return (
        <section className="form">
            {currentPage &&
                {
                    START: (
                        <Landing onStart={() => setCurrentPage("LOCATION")} />
                    ),
                    LOCATION: (
                        <Location
                            locationId={locationId}
                            setLocationId={(id: string) => {
                                setLocationId(id);
                                setCurrentPage("ATTIRE");
                            }}
                        />
                    ),
                    ATTIRE: (
                        <Attire
                            attireId={attireId}
                            setAttireId={(id: string) => {
                                setAttireId(id);
                                setCurrentPage("CUISINE");
                            }}
                        />
                    ),
                    CUISINE: (
                        <Cuisine
                            cuisineId={cuisineId}
                            setCuisineId={(id: string) => {
                                setCuisineId(id);
                                setCurrentPage("ACTIVITY");
                            }}
                        />
                    ),
                    ACTIVITY: (
                        <Activity
                            activityId={activityId}
                            setActivityId={(id: string) => {
                                setActivityId(id);
                                setCurrentPage("SUBMIT");
                            }}
                        />
                    ),
                    SUBMIT: <Submit selections={selections} />,
                }[currentPage]}
        </section>
    );
}

export default App;
