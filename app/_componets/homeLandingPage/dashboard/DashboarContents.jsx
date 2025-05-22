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
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle, List } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const PriorityIcon = ({ priority }) => {
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Slightly faster card appearance
      ease: "easeOut",
    },
  },
};

export default function DashboardContent() {
  const [emailData, setEmailData] = useState([]);
  const [token, setToken] = useState("abc");
  const [categories, setCategories] = useState([]);
  const [categoryDataMap, setCategoryDataMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!token) {
      if (!searchParams.get("token")) setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(`http://mailsync.l4it.net/l4mailapp/todoapi.php?token=${token}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setEmailData(data);

        const newCategories = new Set();
        const categoryMap = {};

        if (Array.isArray(data)) {
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
              priority: email.priority
                ? email.priority.toLowerCase()
                : "medium",
              from_email: email.from_email,
              action_link: email.action_link,
            };

            if (!categoryMap[category]) {
              categoryMap[category] = [];
            }
            categoryMap[category].push(task);
          });
        } else {
          console.warn("Fetched data is not an array:", data);
        }

        const sortedCategories = Array.from(newCategories).sort();
        setCategories(sortedCategories);
        setCategoryDataMap(categoryMap);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setIsLoading(false);
      });
  }, [token, searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // console.log(categoryDataMap);

  return (
    <div className="min-h-screen bg-[#eeeeee] dark:via-gray-800 dark:to-gray-700 p-4 md:p-6 flex flex-col ">
    

      {/* Kanban-style Columns Section */}
      <div className="flex flex-1 overflow-x-auto space-x-4 md:space-x-6 pb-4 custom-scrollbar">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <motion.div
              key={category}
              className="bg-white px-20  h-screen dark:bg-slate-800/60 p-13 md:p-4 rounded-xl shadow-lg min-w-[300px] sm:min-w-[320px] md:min-w-[360px] flex flex-col flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              {/* Column Header */}
              <div className="sticky top-0   dark:bg-slate-800/60 pt-1 pb-2.5 md:pb-3.5 z-10 border-b  border-slate-300 dark:border-slate-700 mb-3 md:mb-4 ">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 px-1 flex justify-between  pr-10">
                  <span className="text-black font-bold ml-5  ">
                    {category}
                  </span>
                  <Badge
                    variant="secondary"
                    className="px-2 py-0.5 text-xs md:text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200"
                  >
                    {categoryDataMap[category]?.length || 0}
                  </Badge>
                </h2>
              </div>

              {/* Task List Container - This is where vertical scroll happens */}
              <div className="flex-1 lg:w-100   space-y-3 scroll-my-2.5 md:space-y-4 overflow-y-auto pr-1 custom-scrollbar">
                {categoryDataMap[category]?.length > 0 ? (
                  categoryDataMap[category].map((task, taskIndex) => {
                    const borderColor =
                      {
                        high: "border-red-500 dark:border-red-600",
                        medium: "border-yellow-500 dark:border-yellow-600",
                        low: "border-green-500 dark:border-green-600",
                      }[task.priority] ||
                      "border-blue-500 dark:border-blue-600";
                    const textColor =
                      {
                        high: "text-red-700 dark:text-red-400",
                        medium: "text-yellow-700 dark:text-yellow-400",
                        low: "text-green-700 dark:text-green-400",
                      }[task.priority] || "text-blue-700 dark:text-blue-400";

                    return (
                      <motion.div
                        key={task.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: taskIndex * 0.03 }}
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 12px 20px -3px rgba(0,0,0,0.12), 0 5px 8px -3px rgba(0,0,0,0.08)",
                        }}
                        className="bg-white dark:bg-gray-800/80 rounded-lg transition-all duration-300 hover:bg-slate-50 dark:hover:bg-gray-700/70"
                      >
                        <Card
                          className={`border-l-4 ${borderColor} shadow-md group w-full bg-transparent`}
                        >
                          <CardHeader className="pb-2.5 pt-3.5 px-3.5 md:px-4">
                            <div className="flex justify-between items-start gap-2">
                              <CardTitle className="text-base md:text-lg lg:line-clamp-3  leading-tight font-bold">
                                {task.title}
                              </CardTitle>
                            </div>
                            {task.description && (
                              <CardDescription className="text-gray-600 dark:text-gray-400 mt-1.5 text-xs md:text-sm leading-snug">
                                {task.description.length > 90
                                  ? task.description.substring(0, 87) + "..."
                                  : task.description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent className="text-xs md:text-sm px-3.5 md:px-4 pb-3 pt-1.5">
                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Due
                                </p>
                                <p className="font-medium text-gray-700 dark:text-gray-300">
                                  {task.due}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  From
                                </p>
                                <p
                                  className="font-medium text-gray-700 dark:text-gray-300 truncate"
                                  title={task.assignee}
                                >
                                  {task.assignee}
                                </p>
                              </div>
                            </div>
                            {task.from_email && (
                              <div className="mt-2 md:mt-2.5">
                                <p className="text-gray-500 dark:text-gray-400">
                                  Email
                                </p>
                                <p
                                  className="font-medium text-gray-700 dark:text-gray-300 truncate"
                                  title={task.from_email}
                                >
                                  {task.from_email}
                                </p>
                              </div>
                            )}
                          </CardContent>

                          <CardFooter className="flex justify-end pt-2 pb-3 px-3.5 md:px-4">
                            <Drawer direction="right">
                              <DrawerTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs md:text-sm border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                  View Action
                                </Button>
                              </DrawerTrigger>
                              <DrawerContent>
                                <DrawerHeader>
                                  <DrawerTitle>{task?.title}</DrawerTitle>
                                  <DrawerDescription>
                                    {task?.description}
                                  </DrawerDescription>
                                </DrawerHeader>
                                <DrawerContent className="p-4 ">
                                  <div className="space-y-4">
                                    <div>
                                      <p className="font-bold ">
                                        {task?.title}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Due Date
                                      </p>
                                      <p>{task?.due}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Description
                                      </p>
                                      <p>{task?.description}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        From
                                      </p>
                                      <p>{task?.assignee}</p>
                                    </div>
                                    {task.from_email && (
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          Email
                                        </p>
                                        <p>{task?.from_email}</p>
                                      </div>
                                    )}

                                    <DrawerTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs md:text-md mt-6 p-4 shadow bg-red-500 font-semibold   text-white hover:bg-red-800 hover:text-white"
                                      >
                                        Close
                                      </Button>
                                    </DrawerTrigger>
                                  </div>
                                </DrawerContent>
                                <DrawerFooter>
                                  <DrawerClose asChild>
                                    <Button variant="outline">Close</Button>
                                  </DrawerClose>
                                </DrawerFooter>
                              </DrawerContent>
                            </Drawer>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[100px]">
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm md:text-base italic">
                      No tasks in this category.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="w-full text-center py-10 flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
              {token
                ? "No categories found or data is still loading."
                : "No token provided. Please sync your mail service."}
            </p>
          </div>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px; /* Slimmer scrollbar */
          height: 6px; /* Slimmer scrollbar */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin-top: 5px; /* Add some margin if header is sticky */
          margin-bottom: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a0aec0; /* gray-500 */
          border-radius: 10px;
          border: 1px solid transparent; /* Optional: for a slight padding effect */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096; /* gray-600 */
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568; /* gray-600 dark */
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2d3748; /* gray-700 dark */
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a0aec0 transparent; /* thumb and track */
        }
        .dark .custom-scrollbar {
          scrollbar-color: #4a5568 transparent; /* thumb and track for dark mode */
        }
      `}</style>
    </div>
  );
}
