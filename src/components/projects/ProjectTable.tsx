import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, Trash2 } from "lucide-react";
import { EnhancedProjectDetailsModal } from "./EnhancedProjectDetailsModal";
import { DeleteProjectModal } from "./DeleteProjectModal";
import type { Project } from "@/types/project";





// Project Table Props
interface ProjectTableProps {
    filteredProjects: Project[];
    currentPage: number;
    setPage: (page: number) => void;
    totalPages: number;
}




export default function ProjectTable({ filteredProjects, currentPage, setPage, totalPages }: ProjectTableProps) {




    // State to manage selected project for details view and deletion
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [projectToDelete, setProjectToDelete] = useState<any | null>(null);




    // Modal states
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);




    // Function to get the status badge based on project status
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Completed</Badge>;
            case "active":
                return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
            case "on-hold":
                return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">On Hold</Badge>;
            case "cancelled":
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };





    return (


        <>

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

                    {filteredProjects?.map((project, index) => (


                        <TableRow key={project?.unique_id} className="hover:bg-blue-300/10 transition-colors">



                            {/* SI No */}
                            <TableCell className="font-medium">
                                {(currentPage - 1) * 10 + (index + 1)}
                            </TableCell>



                            {/* Project Details */}
                            <TableCell>

                                <div className="flex items-center space-x-3">

                                    <Avatar className="h-10 w-10">
                                        {project?.client_logo ? (
                                            <AvatarImage src={project?.client_logo} alt={project?.client_name} />
                                        ) : (
                                            <AvatarFallback className="bg-blue-600 text-white font-semibold">
                                                {project?.client_name
                                                    ?.split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")
                                                    .substring(0, 2)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>

                                    <div>
                                        <p className="font-medium">{project?.work_type}</p>
                                        <p className="text-sm text-muted-foreground">{project?.client_name}</p>
                                    </div>

                                </div>

                            </TableCell>



                            {/* Contact */}
                            <TableCell>
                                <div>
                                    <p className="font-medium">{project?.phone_number}</p>
                                    <p className="text-sm text-muted-foreground">{project?.email}</p>
                                </div>
                            </TableCell>



                            {/* Approach Date */}
                            <TableCell>
                                {new Date(project?.client_approach_date)?.toLocaleDateString()}
                            </TableCell>



                            {/* Status */}
                            <TableCell>
                                {getStatusBadge(project?.project_status)}
                            </TableCell>



                            {/* Actions */}
                            <TableCell className="text-right">


                                <div className="flex justify-end space-x-2">


                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => { setSelectedProject(project); setIsDetailsModalOpen(true); }}
                                        className="h-8 w-8 p-0 hover:cursor-pointer hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/20"
                                    >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View project</span>
                                    </Button>


                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => { setProjectToDelete(project); setIsDeleteModalOpen(true); }}
                                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 hover:cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete project</span>
                                    </Button>


                                </div>


                            </TableCell>


                        </TableRow>


                    ))}


                </TableBody>





            </Table>


            {/* Pagination Bar */}
            <div className="flex justify-center px-4 py-3 gap-2 items-center">

                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
                    Previous
                </Button>

                <span className="text-sm font-medium dark:text-white">Page {currentPage} of {totalPages}</span>

                <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
                    Next
                </Button>

            </div>



            {/* Project Details Modal */}
            <EnhancedProjectDetailsModal
                project={selectedProject}
                isOpen={isDetailsModalOpen}
                onClose={() => { setIsDetailsModalOpen(false) }}
            />



            {/* Delete Project Modal */}
            <DeleteProjectModal
                project={projectToDelete}
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false) }}
            />


        </>


    )


}
