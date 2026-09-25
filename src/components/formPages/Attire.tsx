import { useState } from "react";
import { forms } from "../../assets/options.json";
import { ResettableBinarySelector } from "../selectors/ResettableBinarySelector";
import {
    convertFormOptionToBinarySelectorOption,
    type BinarySelectorOption,
} from "../selectors/BinarySelectorOption";

export type AttireProps = {
    attireId: string;
    setAttireId: (id: string) => void;
};

export const Attire: React.FC<AttireProps> = (props) => {
    const [firstOptionIdx, setFirstOptionIdx] = useState<number>(0);
    const [secondOptionIdx, setSecondOptionIdx] = useState<number>(1);

    const attireForm = forms.filter((f) => f.id === "attire")[0];

    const firstOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(
            attireForm.options[firstOptionIdx],
        );
    const secondOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(
            attireForm.options[secondOptionIdx],
        );

    const swapOptions = () => {
        setFirstOptionIdx((firstOptionIdx + 2) % attireForm.options.length);
        setSecondOptionIdx((secondOptionIdx + 2) % attireForm.options.length);
    };

    return (
        <>
            {attireForm.description}
            <ResettableBinarySelector
                firstOption={firstOption}
                secondOption={secondOption}
                onNeither={swapOptions}
                onSubmit={props.setAttireId}
                selectedOptionId={props.attireId}
            />
        </>
    );
};
