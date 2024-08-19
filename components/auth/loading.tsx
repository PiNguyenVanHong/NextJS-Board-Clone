import Image from "next/image"

export const Loading = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Image
                className="animate-pulse duration-700"
                src={"/logo.png"}
                alt="Logo"
                width={120}
                height={120}
            />
        </div>
    );
}