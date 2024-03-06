import {  createContext, useContext, useEffect, useState } from 'react';
import type { Liff } from "@line/liff";
import { ILiffContext, Profile } from '@/interfaces/index.interface';
import { ScriptProps } from 'next/script';


const LiffContext = createContext<ILiffContext>({} as ILiffContext);

export function LiffContextProvider(props:ScriptProps) {
    const [liffObject, setLiffObject] = useState<Liff>({} as Liff);
    const [liffError, setLiffError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile>({} as Profile);

    useEffect(() => {
        import("@line/liff")
            .then((liff) => liff.default)
            .then((liff) => {
                liff
                    .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "" })
                    .then(() => {
                        if (!liff.isLoggedIn()) {
                            liff.login();
                        }

                        liff
                            .getProfile()
                            .then((profile) => {
                                setProfile(profile);
                            })
                        setLiffObject(liff);
                    })
                    .catch((error: Error) => {
                        setLiffError(error.toString());
                    });
            });
    }, []);



    const LiffContextValues: ILiffContext = {
        liff: liffObject,
        liffError,
        profile
    };

    return <LiffContext.Provider value={LiffContextValues}>{props.children}</LiffContext.Provider>;
}

const useLiff = (): ILiffContext => {
    const context = useContext(LiffContext);
    return {
        liff: context.liff,
        liffError: context.liffError,
        profile: context.profile
    };
};
export default useLiff;
