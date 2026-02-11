import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, FolderOpen, Clock, CheckCircle, Server, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStats } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddProjectModal } from "@/components/projects/AddProjectModal";
import DateFilter from "@/components/common/DateFilter";
import StatCard from "@/components/common/StatCard";
import ProjectTable from "@/components/projects/ProjectTable";
import { useGetProjects } from "@/services/project/queries";
import { useAuth } from "@/context/AuthContext";
import { TableLoader } from "@/components/loaders/TableLoaders";
import Nodata from "@/components/loaders/Nodata";
import Error from "@/components/loaders/Error";




export default function ProjectsPage() {



  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [FilterDate, setFilterDate] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [DomainFilter, setDomainFilter] = useState<string>('all');



  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);



  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);




  // Auth context to get token
  const { getToken } = useAuth();




  // Fetch projects Data
  const { data: FilterdProjectData, isLoading, isFetching, isError } = useGetProjects(getToken() ?? "", searchTerm, FilterDate, statusFilter, DomainFilter, currentPage);




  return (


    <div className="space-y-6 w-full">



      {/* Page Header */}
      <div className="flex justify-between items-start">


        <div className="space-y-2">

          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>

          <p className="text-muted-foreground">
            Manage and monitor all your client projects in one place.
          </p>

        </div>


        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-700 hover:cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>

      </div>



      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">


        <StatCard
          title="Total Projects"
          value={mockStats.totalProjects}
          icon={FolderOpen}
          bgColor="bg-blue-500/10"
          description="All Projects In System"
          iconColor="text-blue-500"
        />


        <StatCard
          title="Pending Projects"
          value={mockStats.pendingProjects}
          description="Currently In Progress"
          icon={Clock}
          bgColor="bg-yellow-500/10"
          iconColor="text-yellow-500"
        />


        <StatCard
          title="Completed Projects"
          value={mockStats.completedProjects}
          description="Successfully Delivered"
          icon={CheckCircle}
          bgColor="bg-green-500/10"
          iconColor="text-green-500"
        />


        <StatCard
          title="Expired Domains"
          value={mockStats.expiredDomains}
          description="Renewal Required"
          icon={Globe}
          bgColor="bg-red-500/10"
          iconColor="text-red-500"
        />


        <StatCard
          title="Server Issues"
          value={mockStats.expiredServers}
          description="Attention Needed"
          icon={Server}
          bgColor="bg-gray-500/10"
          iconColor="text-gray-500"
        />


      </div>




      {/* Projects Table */}
      <Card className="card-elevated border border-gray-200 dark:border-blue-500/20 dark:bg-gradient-to-br dark:from-[#0d121e] dark:to-[#101627] shadow-sm">


        <CardHeader>


          <CardTitle>Projects (8)</CardTitle>


          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">


            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">

              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, clients, emails , countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sm:w-80 max-w-md"
                />
              </div>

            </div>


            <div className="flex flex-wrap gap-4">


              {/* Date Filter */}
              <DateFilter FilterDate={FilterDate} setFilterDate={setFilterDate} title="Filter Consultations" />



              {/* Status Filter */}
              <Select onValueChange={setStatusFilter} value={statusFilter}>

                <SelectTrigger className="w-40 text-black dark:text-white bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 backdrop-blur-sm">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>

                <SelectContent className='dark:bg-gray-900'>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>

              </Select>


              {/* Domain Filter */}
              <Select onValueChange={setDomainFilter} value={DomainFilter}>

                <SelectTrigger className="w-40 text-black dark:text-white bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 backdrop-blur-sm">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>

                <SelectContent className='dark:bg-gray-900'>
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="Expired">Expierd Domains</SelectItem>
                </SelectContent>

              </Select>


            </div>


          </div>


        </CardHeader>



        {/* Table */}
        <CardContent>

          {/* Loading UI */}
          {(isLoading || isFetching) && <TableLoader />}


          {/* Error UI */}
          {isError && <Error />}


          {/* No Data UI */}
          {FilterdProjectData?.results?.length === 0 && (
            <Nodata />
          )}


          {/* Projects Table */}
          {!isLoading && !isError && FilterdProjectData && FilterdProjectData?.results?.length > 0 && (
            < ProjectTable filteredProjects={FilterdProjectData?.results ?? []} currentPage={currentPage} setPage={setCurrentPage} totalPages={FilterdProjectData?.total_pages} />
          )}


        </CardContent>


      </Card>



      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>


  );


}