import type { Picture } from "../../selectors/BinarySelectorOption";

export type SelectedOptionProps = {
    optionId: string;
    optionTitle: string;
    optionSelection: string;
    optionPrimaryImage: Picture;
};

type SelectedOptionsSummaryProps = {
    selections: SelectedOptionProps[];
};

export const SelectedOptionsSummary: React.FC<SelectedOptionsSummaryProps> = (
    props,
) => {
    return (
        <div className="selected-options-summary">
            <div className="selected-options-summary-header">Your Picks:</div>
            <div className="image-gallery">
                {props.selections.map((selection) => (
                    <div className="selected-options-summary-option">
                        <span>
                            {selection.optionTitle}: {selection.optionSelection}
                        </span>
                        <img
                            key={selection.optionPrimaryImage.relativeSrcPath}
                            src={`${import.meta.env.BASE_URL}/${selection.optionPrimaryImage.relativeSrcPath}`}
                            alt={selection.optionPrimaryImage.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
