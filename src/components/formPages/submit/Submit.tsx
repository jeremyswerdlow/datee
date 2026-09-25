import { CollectPhoneNumber } from "./CollectPhoneNumber";
import {
    SelectedOptionsSummary,
    type SelectedOptionProps,
} from "./SelectedOptionsSummary";

const formatMessage = (details: { [key: string]: string }) => {
    const formattedDetails = Object.entries(details)
        .map(([category, value]) => `- ${category}: ${value}`)
        .join("\n");

    const messageBody: string = `You've been requested to go on a date! Please plan something to the details below:

${formattedDetails}

You can confirm with your date by replying here.`;

    return encodeURIComponent(messageBody);
};

export type SubmitProps = {
    selections: SelectedOptionProps[];
    onRestart?: () => unknown;
};

export const Submit: React.FC<SubmitProps> = (props) => {
    const openSms = (phoneNumber: string, body: string) => {
        window.open(`sms:${phoneNumber}?body=${body}&body=${body}`, "_self");
    };

    const details = props.selections.reduce(
        (acc, obj) =>
            Object.assign(acc, { [obj.optionTitle]: obj.optionSelection }),
        {},
    );

    return (
        <div className="submit-form">
            <SelectedOptionsSummary selections={props.selections} />
            <CollectPhoneNumber
                onSubmit={(phoneNumber) => {
                    if (!phoneNumber) return;

                    openSms(phoneNumber, formatMessage(details));
                }}
            />
            {props.onRestart && (
                <button onClick={props.onRestart}>Restart</button>
            )}
        </div>
    );
};
