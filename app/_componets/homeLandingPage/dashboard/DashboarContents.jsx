"use client";
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
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

// const StatusBadge = (status) => {
//   const statusMap = {
//     Urgent: { color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
//     Critical: { color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
//     "In Progress": {
//       color: "text-blue-600",
//       bg: "bg-blue-100 dark:bg-blue-900/30",
//     },
//     "Pending Review": {
//       color: "text-yellow-600",
//       bg: "bg-yellow-100 dark:bg-yellow-900/30",
//     },
//     Backlog: { color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-800" },
//     Scheduled: {
//       color: "text-green-600",
//       bg: "bg-green-100 dark:bg-green-900/30",
//     },
//   };

//   return (
//     <span
//       className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
//         statusMap[status]?.bg || ""
//       } ${statusMap[status]?.color || ""}`}
//     >
//       {status}
//     </span>
//   );
// };

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export default function DashboardContent() {
  const [emailData, setEmailData] = useState([]);
  const [token, setToken] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryDataMap, setCategoryDataMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://mailsync.l4it.net/l4mailapp/todoapi.php?token=${token}`, {
      method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setEmailData(data);

        const newCategories = new Set();
        const categoryMap = {};

        data.forEach((email) => {
          const category = email.category || "Uncategorized";
          newCategories.add(category);

          const task = {
            id: email.id,
            title: email.title,
            description: email.description,
            status: category,
            due: email.due_at
              ? new Date(email.due_at).toLocaleDateString()
              : "No due date",
            assignee: email.from_name,
            priority: email.priority ? email.priority.toLowerCase() : "medium",
            from_email: email.from_email,
            action_link: email.action_link,
          };

          if (!categoryMap[category]) {
            categoryMap[category] = [];
          }

          categoryMap[category].push(task);
        });

        setCategories(Array.from(newCategories).sort());
        setCategoryDataMap(categoryMap);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setIsLoading(false);
      });
  }, [token]);

  console.log(emailData);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        <div className=" w-full pt-10 ">
          <h1 className="text-4xl md:text-5xl text-center  font-extrabold bg-gradient-to-r  from-blue-600 to-purple-600 text-transparent bg-clip-text pb-10">
            L4IT Mail Sync Dashboard
          </h1>
          <p className=" text-center text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Organize and track your Mail with clarity, grouped smartly by
            categories and priorities.
          </p>
        </div>
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="flex justify-center items-center mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  {/* <Sparkles className="w-8 h-8 text-yellow-500" /> */}
                </motion.div>
              </div>
            </motion.div>
          </div>
          {/* <motion.p
            className="text-gray-600 dark:text-gray-400 mt-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Organize and track tasks by their categories
          </motion.p> */}
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Tabs defaultValue={categories[0] || "all"} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TabsList className="grid w-full grid-cols-4 bg-gray-100  p-1 rounded-xl gap-1 h-auto">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <TabsTrigger
                      value={category}
                      className="data-[state=active]:shadow-sm rounded-lg py-3 transition-all duration-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <div className="flex w-40 items-center gap-2">
                        <List className="w-5 h-5 text-blue-500" />
                        <p className="truncate max-w-xs">{category}</p>
                        <Badge
                          variant="secondary"
                          className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {categoryDataMap[category]?.length || 0}
                        </Badge>
                      </div>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <motion.div
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  {categoryDataMap[category]?.map((task) => {
                    const priorityColor = getPriorityColor(task.priority);
                    const borderColor =
                      {
                        high: "border-red-500 dark:border-red-600",
                        medium: "border-yellow-500 dark:border-yellow-600",
                        low: "border-green-500 dark:border-green-600",
                      }[task.priority] ||
                      "border-blue-500 dark:border-blue-600";

                    const textColor =
                      {
                        high: "text-red-600 dark:text-red-400",
                        medium: "text-yellow-600 dark:text-yellow-400",
                        low: "text-green-600 dark:text-green-400",
                      }[task.priority] || "text-blue-600 dark:text-blue-400";

                    return (
                      <motion.div
                        key={task.id}
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                      >
                        <Card
                          className={`border-l-4 ${borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300 group`}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start gap-3">
                              <CardTitle
                                className={`text-lg font-bold ${textColor}`}
                              >
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
                                <p className="text-gray-500 dark:text-gray-400">
                                  Due
                                </p>
                                <p className="font-medium">{task.due}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  From
                                </p>
                                <p className="font-medium">{task.assignee}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <motion.div
                              whileHover="hover"
                              whileTap="tap"
                              variants={buttonVariants}
                            >
                              <Button
                                variant="outline"
                                className={`border-${priorityColor}-200 text-${priorityColor}-600 hover:bg-${priorityColor}-50 dark:border-${priorityColor}-900 dark:text-${priorityColor}-400 dark:hover:bg-${priorityColor}-900/30`}
                                onClick={() =>
                                  window.open(task.action_link, "_blank")
                                }
                              >
                                View Email
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover="hover"
                              whileTap="tap"
                              variants={buttonVariants}
                            >
                              <Button
                                className={`bg-${priorityColor}-600 hover:bg-${priorityColor}-700 text-white shadow-md shadow-${priorityColor}-200 dark:shadow-${priorityColor}-900/50`}
                              >
                                Mark as Done
                              </Button>
                            </motion.div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}
