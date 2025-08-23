import { Search } from "lucide-react";


export default function Nodata() {


    return (

        <div className="w-full min-h-[500px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4 animate-fade-in">

            <div className="relative flex items-center justify-center">

                <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-400/20 dark:bg-blue-500/20 animate-ping" />

                <div className="relative p-6 rounded-full bg-gray-100 dark:bg-gray-800">
                    <Search className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                </div>

            </div>

            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
                Try adjusting your filters or add a new project.
            </p>

        </div>

    )

}
