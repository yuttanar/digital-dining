import useLiff from '@/contexts/liff.context';
import { IFood } from '@/interfaces/index.interface';
import { foods } from '@/mock-data/foods';
import { renderOrderFlex } from '@/utils/renderOrderFlex';
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2'
import RandomBanner from './RandomBanner';

import 'sweetalert2/src/sweetalert2.scss'

export default function FoodList() {
    const { liff } = useLiff()
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handlePageChange = () => {
        setCurrentPage((oldPage) => oldPage + 1);
    };

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return foods.slice(0, endIndex);
    }, [foods, currentPage, itemsPerPage]);

    const handleSelect = (food: IFood) => {
        Swal.fire({
            title: `คุณต้องการสั่งเมนู ${food.title} หรือไม่`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ใช่ สั่งเลย",
            confirmButtonColor: "#1f2937",
            cancelButtonText: `ยกเลิก`,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                sendMessages(food, "สั่งอาหารจ้าาาาา หิว รีบทำหน่อยนะ");
            }
        });
    }


    const handleRandom = () => {
        const random = Math.round((foods.length - 1) * Math.random())
        const food = foods[random]
        Swal.fire({
            text: `วันนี้คุณสุ่มได้ ${food.title} ต้องการสั่งเลยไหม`,
            imageUrl: food.thumbnailPhoto,
            imageHeight: "100px",
            showCancelButton: true,
            confirmButtonText: "ใช่ สั่งเลย",
            confirmButtonColor: "#1f2937",
            cancelButtonText: `ยกเลิก`,
            reverseButtons: true,
            padding: "3em",
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
                `
        }).then((result) => {
            if (result.isConfirmed) {
                sendMessages(food, "วันนี้คิดไม่ออกว่าจะกินอะไร สั่งเมนูนี้แล้วกัน");
            }
        });
    }

    const sendMessages = (food: IFood, text: string) => {
        const flexMessage = renderOrderFlex(food)
        if (liff.isInClient()) {
            liff
                .sendMessages([
                    {
                        type: "text",
                        text: text,
                    },
                    flexMessage
                ])
                .then(() => {
                    liff.closeWindow();
                })
                .catch((err) => {
                    console.log("error", err);
                });
        } else {
            liff.shareTargetPicker([
                {
                    type: "text",
                    text: text,
                },
                flexMessage
            ])
        }

    }
    return (
        <div>
            <RandomBanner open={open} setOpen={setOpen} callBack={handleRandom} />
            <div className="mx-auto max-w-2xl px-4 pt-8 pb-12 sm:px-6 sm:py-9 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900">หิวแล้ว🤤 สั่งเลย</h2>
                <div className="mt-5 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {paginatedData.map((food, key) => (
                        <div key={key} className="border border-gray-200 rounded-lg shadow">
                            <div className="relative">
                                <div className="relative h-72 w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
                                    <img
                                        src={food.thumbnailPhoto}
                                        alt={food.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="relative mt-2 mx-3">
                                    <h3 className="text-md font-medium text-gray-900 line-clamp-1">{food.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2 h-10">{food.description}</p>
                                </div>
                                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-tl-lg rounded-tr-lg p-4">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                    />
                                    <p className="relative text-lg font-semibold text-white">{Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB',
                                    }).format(food.price || 0)}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button
                                    onClick={() => handleSelect(food)}
                                    className="w-full relative flex items-center justify-center border rounded-br-lg rounded-bl-lg border-transparent bg-gray-800 px-8 py-2 text-sm font-medium text-white hover:bg-gray-600"
                                >
                                    เมนูนี้ ฉันเลือกนาย 👆<span className="sr-only">, {food.title}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                paginatedData.length < foods.length && (
                    <div className="flex justify-center">
                        <button
                            onClick={handlePageChange}
                            className="inline-flex rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
                        >
                            โหลดเพิ่ม หิว😱
                        </button>
                    </div>
                )
            }
            <br />
        </div>
    )
}
