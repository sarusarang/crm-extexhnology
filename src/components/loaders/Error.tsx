import { ServerCrash } from "lucide-react";


export default function Error() {


    return (

        <div className="w-full min-h-[500px] flex flex-col items-center justify-center text-red-500 space-y-3 animate-fade-in">
            {/* Icon with pulsing background */}
            <div className="relative flex items-center justify-center">
                {/* Pulse effect */}
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-red-400/20 dark:bg-red-500/20 animate-ping" />

                {/* Icon container */}
                <div className="relative p-6 rounded-full bg-red-100 dark:bg-red-900/30">
                    <ServerCrash className="h-10 w-10 text-red-500 dark:text-red-400" />
                </div>
            </div>

            {/* Error Text */}
            <p className="text-lg font-semibold">Server Error</p>
            <p className="text-sm text-red-400 dark:text-red-300 max-w-md text-center">
                Something went wrong while fetching data. Please check your connection or try again later.
            </p>
        </div>

    )


}
