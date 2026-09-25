import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type UseQueryStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

const useQueryState = <T>(
    param: string,
    initialValue: T,
): UseQueryStateReturnType<T> => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramValue = searchParams.get(param);
    let parsedValue: T;
    if (paramValue !== null) {
        parsedValue = JSON.parse(paramValue) as T;
    } else {
        parsedValue = initialValue;
    }

    const [value, setValue] = useState<T>(parsedValue);

    useEffect(() => {
        setSearchParams((prev) => {
            if (value !== null && value !== undefined && value !== "") {
                prev.set(param, JSON.stringify(value));
            } else prev.delete(param);
            return prev;
        });
    }, [value]);

    return [value, setValue];
};

export default useQueryState;
