import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";




export const TableLoader = () => {


    return (


        <div className="w-full">


            <Table>


                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]">SI No</TableHead>
                        <TableHead>Project Details</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Approach Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>


                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            {/* SI No */}
                            <TableCell>
                                <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                            </TableCell>

                            {/* Project Details */}
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                                        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                                    </div>
                                </div>
                            </TableCell>

                            {/* Contact */}
                            <TableCell>
                                <div className="space-y-2">
                                    <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                                </div>
                            </TableCell>

                            {/* Approach Date */}
                            <TableCell>
                                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <div className="h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                                    <div className="h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
