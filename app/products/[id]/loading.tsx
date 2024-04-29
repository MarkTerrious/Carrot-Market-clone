import { PhotoIcon } from "@heroicons/react/24/solid";

export default function ProductLoading()
{
    return (
        <div className="flex flex-col gap-5 animate-pulse">
            <div className="border-4 border-neutral-700 border-dashed
            rounded-md flex justify-center items-center aspect-square">
                <PhotoIcon className="h-28"/>
            </div>

            <div className="flex items-center gap-2">
                <div className="size-14 rounded-full bg-neutral-700"></div>
                <div className="flex flex-col gap-1">
                    <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                    <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                </div>
            </div>

            <div className="h-10 w-80 bg-neutral-700 rounded-md"/>
        </div>
    )   
}