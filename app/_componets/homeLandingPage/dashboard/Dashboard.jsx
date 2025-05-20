'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  AlertTriangle,
  Clock,
  CheckCircle,
  List,
} from "lucide-react";
import { motion } from "framer-motion";

// Enhanced sample data for tasks
const tasks = {
  high: [
    {
      id: 1,
      title: "Critical Security Patch",
      description: "Zero-day vulnerability in auth system",
      status: "Urgent",
      due: "Today",
      assignee: "Security Team",
    },
    {
      id: 2,
      title: "Production Outage",
      description: "Main API servers are down",
      status: "Critical",
      due: "ASAP",
      assignee: "DevOps",
    },
  ],
  medium: [
    {
      id: 3,
      title: "Dashboard Redesign",
      description: "New UI components for analytics",
      status: "In Progress",
      due: "Fri",
      assignee: "Design Team",
    },
    {
      id: 4,
      title: "API Documentation",
      description: "Update Swagger docs for v2",
      status: "Pending Review",
      due: "Next Week",
      assignee: "Technical Writers",
    },
  ],
  low: [
    {
      id: 5,
      title: "Code Refactoring",
      description: "Legacy payment processor cleanup",
      status: "Backlog",
      due: "Later",
      assignee: "Backend Team",
    },
    {
      id: 6,
      title: "Accessibility Audit",
      description: "WCAG compliance check",
      status: "Scheduled",
      due: "Next Sprint",
      assignee: "QA Team",
    },
  ],
  all: [
    {
      id: 1,
      title: "Critical Security Patch",
      priority: "high",
      status: "Urgent",
    },
    { id: 2, title: "Production Outage", priority: "high", status: "Critical" },
    {
      id: 3,
      title: "Dashboard Redesign",
      priority: "medium",
      status: "In Progress",
    },
    {
      id: 4,
      title: "API Documentation",
      priority: "medium",
      status: "Pending Review",
    },
    { id: 5, title: "Code Refactoring", priority: "low", status: "Backlog" },
    {
      id: 6,
      title: "Accessibility Audit",
      priority: "low",
      status: "Scheduled",
    },
  ],
};

const PriorityIcon = (priority) => {
  switch (priority) {
    case "high":
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case "medium":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "low":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return <List className="w-5 h-5 text-blue-500" />;
  }
};

const StatusBadge = (status) => {
  const statusMap = {
    Urgent: { color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
    Critical: { color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
    "In Progress": {
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    "Pending Review": {
      color: "text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    Backlog: { color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-800" },
    Scheduled: {
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
  };

  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
        statusMap[status]?.bg || ""
      } ${statusMap[status]?.color || ""}`}
    >
      {status}
    </span>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const tabContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h1 className="text-3xl mt-10 font-bold text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Priority Task Manager
            </h1>
          </div>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mt-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Organize and track tasks by priority level with visual indicators
          </motion.p>
        </motion.div>

        <Tabs defaultValue="high" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl gap-1 h-auto">
              {[
                {
                  value: "all",
                  label: "All Tasks",
                  count: tasks.all.length,
                  color: "blue",
                },
                {
                  value: "high",
                  label: "High",
                  count: tasks.high.length,
                  color: "red",
                },
                {
                  value: "medium",
                  label: "Medium",
                  count: tasks.medium.length,
                  color: "yellow",
                },
                {
                  value: "low",
                  label: "Low",
                  count: tasks.low.length,
                  color: "green",
                },
              ].map((tab, index) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <TabsTrigger
                    value={tab.value}
                    className={`data-[state=active]:shadow-sm rounded-lg py-3 transition-all duration-300 ${
                      tab.color === "red"
                        ? "data-[state=active]:bg-red-700 data-[state=active]:text-white hover:bg-red-50 dark:hover:bg-red-900/20"
                        : tab.color === "yellow"
                        ? "data-[state=active]:bg-yellow-500 data-[state=active]:text-white hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                        : tab.color === "green"
                        ? "data-[state=active]:bg-green-500 data-[state=active]:text-white hover:bg-green-50 dark:hover:bg-green-900/20"
                        : "data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PriorityIcon priority={tab.value} />
                      <span>{tab.label}</span>
                      <Badge
                        variant="secondary"
                        className={`px-2 py-0.5 ${
                          tab.color === "red"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : tab.color === "yellow"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : tab.color === "green"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {tab.count}
                      </Badge>
                    </div>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>

          {/* High Priority Tab */}
          <TabsContent value="high" className="mt-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {tasks.high.map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-l-4 border-red-700 dark:border-red-600 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-3">
                        <CardTitle className="text-lg font-bold text-red-600 dark:text-red-400">
                          {task.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Due</p>
                          <p className="font-medium">{task.due}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Assignee
                          </p>
                          <p className="font-medium">{task.assignee}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                          Details
                        </Button>
                      </motion.div>
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200 dark:shadow-red-900/50">
                          Resolve Now
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Medium Priority Tab */}
          <TabsContent value="medium" className="mt-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {tasks.medium.map((task) => (
                <motion.div
                  key={task.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-l-4 border-yellow-500 dark:border-yellow-600 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-3">
                        <CardTitle className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          {task.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Due</p>
                          <p className="font-medium">{task.due}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Assignee
                          </p>
                          <p className="font-medium">{task.assignee}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button
                          variant="outline"
                          className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                        >
                          Details
                        </Button>
                      </motion.div>
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-md shadow-yellow-200 dark:shadow-yellow-900/50">
                          Update Status
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Low Priority Tab */}
          <TabsContent value="low" className="mt-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {tasks.low.map((task) => (
                <motion.div
                  key={task.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-l-4 border-green-500 dark:border-green-600 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-3">
                        <CardTitle className="text-lg font-bold text-green-600 dark:text-green-400">
                          {task.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {task.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Due</p>
                          <p className="font-medium">{task.due}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Assignee
                          </p>
                          <p className="font-medium">{task.assignee}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/30"
                        >
                          Details
                        </Button>
                      </motion.div>
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200 dark:shadow-green-900/50">
                          Schedule
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* All Tasks Tab */}
          <TabsContent value="all" className="mt-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {tasks.all.map((task) => (
                <motion.div
                  key={task.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`border-l-4 shadow-lg hover:shadow-xl transition-shadow duration-300 group ${
                      task.priority === "high"
                        ? "border-red-500 dark:border-red-600"
                        : task.priority === "medium"
                        ? "border-yellow-500 dark:border-yellow-600"
                        : "border-green-500 dark:border-green-600"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start gap-3">
                        <CardTitle
                          className={`text-lg font-bold ${
                            task.priority === "high"
                              ? "text-red-600 dark:text-red-400"
                              : task.priority === "medium"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {task.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-3">
                        <PriorityIcon priority={task.priority} />
                        <span className="text-sm font-medium capitalize">
                          {task.priority} Priority
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Task ID
                        </span>
                        <span className="font-mono">#{task.id}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button
                          variant="outline"
                          className={`${
                            task.priority === "high"
                              ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
                              : task.priority === "medium"
                              ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                              : "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/30"
                          }`}
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}