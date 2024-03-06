import { IFood } from "@/interfaces/index.interface"

export const renderOrderFlex = (food: IFood):any => {
    return {
        "type": "flex",
        "altText": "สั่งอาหารใหม่",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": food.thumbnailPhoto,
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "md",
                "contents": [
                    {
                        "type": "text",
                        "text": "สั่งอาหารใหม่",
                        "wrap": true,
                        "weight": "bold",
                        "gravity": "center",
                        "size": "xl"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "margin": "lg",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "เมนู",
                                        "color": "#aaaaaa",
                                        "size": "sm",
                                        "flex": 1,
                                        "wrap": true
                                    },
                                    {
                                        "type": "text",
                                        "text": food.title,
                                        "wrap": true,
                                        "size": "sm",
                                        "color": "#666666",
                                        "flex": 4
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "ราคา",
                                        "color": "#aaaaaa",
                                        "size": "sm",
                                        "flex": 1
                                    },
                                    {
                                        "type": "text",
                                        "text": Intl.NumberFormat('th-TH', {
                                            style: 'currency',
                                            currency: 'THB',
                                        }).format(food.price || 0),
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 4
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
}