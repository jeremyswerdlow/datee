import { useState } from "react";
import { forms } from "../../assets/options.json";
import { ResettableBinarySelector } from "../selectors/ResettableBinarySelector";
import {
    convertFormOptionToBinarySelectorOption,
    type BinarySelectorOption,
} from "../selectors/BinarySelectorOption";

type ActivityProps = {
    activityId: string;
    setActivityId: (id: string) => void;
};

export const Activity: React.FC<ActivityProps> = (props) => {
    const [firstOptionIdx, setFirstOptionIdx] = useState<number>(0);
    const [secondOptionIdx, setSecondOptionIdx] = useState<number>(1);

    const activityForm = forms.filter((f) => f.id === "activity")[0];

    const firstOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(
            activityForm.options[firstOptionIdx],
        );
    const secondOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(
            activityForm.options[secondOptionIdx],
        );

    const swapOptions = () => {
        setFirstOptionIdx((firstOptionIdx + 2) % activityForm.options.length);
        setSecondOptionIdx((secondOptionIdx + 2) % activityForm.options.length);
    };

    return (
        <>
            {activityForm.description}
            <ResettableBinarySelector
                firstOption={firstOption}
                secondOption={secondOption}
                onNeither={swapOptions}
                onSubmit={props.setActivityId}
                selectedOptionId={props.activityId}
            />
        </>
    );
};
