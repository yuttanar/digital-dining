import { Liff } from "@line/liff";

export type Profile = Awaited<ReturnType<Liff["getProfile"]>>

export interface ILiffContext {
    liff: Liff
    liffError: string | null
    profile: Profile
}

export interface IFood {
    thumbnailPhoto: string
    title: string
    description: string
    price: number
    ingredientKeywords: string
}

export interface IRandomBannerProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    callBack: () => void
}