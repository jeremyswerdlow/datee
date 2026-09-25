import { BinarySelector, type BinarySelectorProps } from "./BinarySelector";

export type ResettableBinarySelectorProps = BinarySelectorProps & {
    selectedOptionId?: string;
};

export const ResettableBinarySelector: React.FC<
    ResettableBinarySelectorProps
> = (props) => {
    if (props.selectedOptionId) {
        return (
            <div className="resettable-binary-selector-selected">
                {props.firstOption.id === props.selectedOptionId
                    ? props.firstOption.render
                    : props.secondOption.render}
                <button
                    className="resettable-binary-selector-reset"
                    onClick={() => props.onSubmit("")}
                >
                    Reset
                </button>
            </div>
        );
    }

    return (
        <BinarySelector
            firstOption={props.firstOption}
            secondOption={props.secondOption}
            onSubmit={props.onSubmit}
            onNeither={props.onNeither}
        />
    );
};
