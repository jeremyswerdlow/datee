import { forms } from "../../assets/options.json";
import {
    convertFormOptionToBinarySelectorOption,
    type BinarySelectorOption,
} from "../selectors/BinarySelectorOption";
import { ResettableBinarySelector } from "../selectors/ResettableBinarySelector";

export type LocationProps = {
    locationId: string | undefined;
    setLocationId: (id: string) => void;
};

export const Location: React.FC<LocationProps> = (props) => {
    const locationForm = forms.filter((f) => f.id === "location")[0];

    const firstOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(locationForm.options[0]);
    const secondOption: BinarySelectorOption =
        convertFormOptionToBinarySelectorOption(locationForm.options[1]);

    return (
        <>
            <span>{locationForm.description}</span>
            <ResettableBinarySelector
                firstOption={firstOption}
                secondOption={secondOption}
                onSubmit={props.setLocationId}
                selectedOptionId={props.locationId}
            />
        </>
    );
};
