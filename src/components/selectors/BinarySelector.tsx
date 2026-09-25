import { useState } from "react";
import type { BinarySelectorOption } from "./BinarySelectorOption";

export type BinarySelectorProps = {
    firstOption: BinarySelectorOption;
    secondOption: BinarySelectorOption;
    onNeither?: () => void;
    onSubmit: (id: string) => void;
};

export const BinarySelector: React.FC<BinarySelectorProps> = (props) => {
    const [selection, setSelection] = useState<
        "first-option" | "second-option"
    >();

    const submitSelection = () => {
        if (!selection) {
            return;
        }

        const submittedSelection = {
            "first-option": props.firstOption.id,
            "second-option": props.secondOption.id,
        }[selection];

        props.onSubmit(submittedSelection);
    };

    const swapOptions = async () => {
        setSelection(undefined);
        props.onNeither?.();
    };

    return (
        <>
            <fieldset className="binary-options">
                <label>
                    <input
                        type="radio"
                        name="binary-select"
                        value="first-option"
                        checked={selection === "first-option"}
                        onChange={() => setSelection("first-option")}
                    />
                    {props.firstOption.render}
                </label>
                <label>
                    <input
                        type="radio"
                        name="binary-select"
                        value="second-option"
                        checked={selection === "second-option"}
                        onChange={() => setSelection("second-option")}
                    />
                    {props.secondOption.render}
                </label>
            </fieldset>
            <div className="button-bar">
                {props.onNeither && (
                    <button
                        className="primary-button swap"
                        onClick={swapOptions}
                    >
                        Neither Sounds Good
                    </button>
                )}
                <button
                    className="primary-button submit"
                    disabled={!selection}
                    onClick={submitSelection}
                >
                    Submit
                </button>
            </div>
        </>
    );
};
