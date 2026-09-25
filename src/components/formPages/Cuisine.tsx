import { useState } from "react";
import { forms } from "../../assets/options.json";
import { ResettableBinarySelector } from "../selectors/ResettableBinarySelector";
import {
    convertFormOptionToBinarySelectorOption,
    type BinarySelectorOption,
} from "../selectors/BinarySelectorOption";

type CuisineProps = {
    cuisineId: string;
    setCuisineId: (id: string) => void;
};

export const Cuisine: React.FC<CuisineProps> = (props) => {
    const [firstOptionIdx, setFirstOptionIdx] = useState<number>(0);
    const [secondOptionIdx, setSecondOptionIdx] = useState<number>(1);

    const cuisineForm = forms.filter((f) => f.id === "cuisine")[0];

    const firstOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(
            cuisineForm.options[firstOptionIdx],
        );
    const secondOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(
            cuisineForm.options[secondOptionIdx],
        );

    const swapOptions = () => {
        setFirstOptionIdx((firstOptionIdx + 2) % cuisineForm.options.length);
        setSecondOptionIdx((secondOptionIdx + 2) % cuisineForm.options.length);
    };

    return (
        <>
            {cuisineForm.description}
            <ResettableBinarySelector
                firstOption={firstOption}
                secondOption={secondOption}
                onNeither={swapOptions}
                onSubmit={props.setCuisineId}
                selectedOptionId={props.cuisineId}
            />
        </>
    );
};
