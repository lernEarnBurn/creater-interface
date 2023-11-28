import { Skeleton } from "./skeleton";

export function BlogSkeleton() {
  return (
    <div className="z-10 rounded-lg dark:bg-opacity-90 mt-[4.5vh] py-2 px-3 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden justify-center items-center">
      <Skeleton className="h-[3.5vh] w-[16vw] bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 m-auto mt-2 mb-2" />
      <Skeleton className="h-[2.2vh] w-[12vw] bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 author m-auto mb-3" />

      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[28vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[27vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[27.3vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[27.9vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[26.9vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[28vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[27vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[27.4vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[28vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[27.9vw] h-[2.4vh] mt-2 ml-10" />
      <Skeleton className="bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20 content w-[21vw] h-[2.4vh]  mt-2 ml-10" />
    </div>
  );
}
