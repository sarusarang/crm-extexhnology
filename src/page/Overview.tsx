import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FolderOpen, Clock, CheckCircle, Server, Globe } from "lucide-react";
import { mockStats } from "@/lib/mock-data";
import StatCard from "@/components/common/StatCard";




// Mock data for charts
const chartData = [
  { month: "Jan", projects: 12, completed: 8 },
  { month: "Feb", projects: 15, completed: 11 },
  { month: "Mar", projects: 8, completed: 6 },
  { month: "Apr", projects: 20, completed: 15 },
  { month: "May", projects: 18, completed: 12 },
  { month: "Jun", projects: 25, completed: 20 },
];



// Mock data for project types
const projectTypeData = [
  { name: "Web Development", value: 45, color: "#3B82F6" },
  { name: "Mobile Apps", value: 30, color: "#FACC15" },
  { name: "Custom Software", value: 25, color: "#22C55E" },
];




export default function OverviewPage() {


  return (


    <div className="space-y-6">


      {/* Page Header */}
      <div className="space-y-2">

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Project Overview
        </h1>

        <p className="text-muted-foreground">
          Quick insights into your project portfolio and performance.
        </p>

      </div>


      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">


        <StatCard
          title="Total Projects"
          value={mockStats.totalProjects}
          description="All Projects In System"
          icon={FolderOpen}
          bgColor="bg-blue-500/10"
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



      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">



        {/* Projects Timeline Chart */}
        <Card className="card-elevated border border-gray-200 dark:border-blue-500/20 dark:bg-gradient-to-br dark:from-[#0E1422] dark:to-[#12192a] shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]">

          <CardHeader>

            <CardTitle className="text-gray-900 dark:text-white">
              Project Timeline
            </CardTitle>

            <CardDescription>
              Project starts and completions over the last 6 months
            </CardDescription>

          </CardHeader>


          <CardContent>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />

                <Tooltip contentStyle={{ background: "#0E1422", border: "1px solid #3B82F6", color: "#fff" }} />

                <Bar dataKey="projects" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#00C6FB" radius={[4, 4, 0, 0]} />

              </BarChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>



        {/* Project Types Distribution */}
        <Card className="card-elevated border border-gray-200 dark:border-blue-500/20 dark:bg-gradient-to-br dark:from-[#0E1422] dark:to-[#12192a] shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]">


          <CardHeader>

            <CardTitle className="text-gray-900 dark:text-white">
              Project Types
            </CardTitle>

            <CardDescription>
              Distribution of project types in current portfolio
            </CardDescription>

          </CardHeader>


          <CardContent>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{ background: "#0E1422", border: "1px solid #3B82F6" }}
                  itemStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#ffffff" }}
                />


              </PieChart>

            </ResponsiveContainer>


            <div className="flex flex-wrap gap-4 mt-4">
              {projectTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>


          </CardContent>


        </Card>


      </div>

    </div>
  );
}
