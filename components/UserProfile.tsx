import useLiff from '@/contexts/liff.context'
import React from 'react'

export default function UserProfile() {
    const { profile } = useLiff()

    return (
        <div className="rounded-br-2xl rounded-bl-2xl bg-gray-800 px-8 py-12 text-center">
            <h2 className="my-3 text-2xl font-semibold leading-7 tracking-tight text-white">ยินดีต้อนรับ👋</h2>
            {
                Object.keys(profile).length ?
                    (
                        <div>
                            <img className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={profile?.pictureUrl} alt="my profile" />
                            <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-white">{profile?.displayName}</h3>
                            <p className="text-md leading-6 text-gray-400">{profile?.statusMessage}</p>
                        </div>
                    ) : (
                        <div className='animate-pulse'>
                            <div className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 bg-slate-200" />
                            <div className="mt-6 text-xl font-semibold leading-7 tracking-tight text-white w-24 h-7 mx-auto bg-slate-200 rounded-xl"></div>
                            <div className="text-md leading-6 text-gray-400 w-20 rounded-xl h-4 mx-auto mt-2 bg-slate-200"></div>
                        </div>
                    )
            }
        </div>
    )
}
