export default function Footer() {
    return (
        <div className="flex items-center justify-center bg-gray-900 px-6 py-3">
            <p className="text-sm leading-6 text-white">
                <strong className="font-semibold">Make with 💻 by Yuttanar</strong>
                <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                    <circle cx={1} cy={1} r={1} />
                </svg>
                Food data and images from <a className="font-bold" href="https://www.wongnai.com">Wongnai Cooking</a> 🙏
            </p>
        </div>
    )
}
