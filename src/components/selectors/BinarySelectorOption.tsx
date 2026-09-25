import type { ReactNode } from "react";

export type BinarySelectorOption = {
    id: string;
    render: ReactNode;
};

export type Picture = {
    type: string;
    value?: string;
    relativeSrcPath?: string;
    alt?: string;
};

type FormOption = {
    id: string;
    title: string;
    description: string;
    pictures: Picture[];
};

export const convertFormOptionToBinarySelectorOption = (
    formOption: FormOption,
) => {
    return {
        id: formOption.id,
        render: (
            <div className="binary-selector-option">
                <div className="binary-selector-option-text">
                    <h3>{formOption.title}</h3>
                    <p>{formOption.description}</p>
                </div>
                <div className="binary-selector-option-images">
                    {formOption.pictures.map((p, idx) => {
                        if (p.type === "emoji") {
                            return (
                                <h1 id={`${formOption.id}-img-${idx}`}>
                                    {p.value}
                                </h1>
                            );
                        }
                        if (p.type === "image") {
                            return (
                                <img
                                    id={`${formOption.id}-img-${idx}`}
                                    src={`${import.meta.env.BASE_URL}/${p.relativeSrcPath}`}
                                    alt={p.alt || formOption.description}
                                />
                            );
                        }
                        return <></>;
                    })}
                </div>
            </div>
        ),
    };
};
