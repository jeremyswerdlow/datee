import React, { useRef, useState } from "react";

export type CollectPhoneNumberProps = {
    onSubmit: (number: string) => unknown;
};

export const CollectPhoneNumber: React.FC<CollectPhoneNumberProps> = (
    props: CollectPhoneNumberProps,
) => {
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);

    const phoneInputRef = useRef<HTMLInputElement | null>(null);

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasTyped(true);
        setIsPhoneValid(event.currentTarget.validity.valid);
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = phoneInputRef.current;

        if (!input) return;
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }

        props.onSubmit(input.value);
    };

    return (
        <form className="collect-phone-number" onSubmit={handleSubmit}>
            <label>Provide your date's number:</label>
            <div>
                <input
                    className={hasTyped && !isPhoneValid ? "invalid" : "valid"}
                    ref={phoneInputRef}
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={handlePhoneChange}
                    pattern="(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{4}"
                    required
                    placeholder="5558675309"
                />
                <button
                    type="submit"
                    className={hasTyped && !isPhoneValid ? "invalid" : "valid"}
                    disabled={!isPhoneValid}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
