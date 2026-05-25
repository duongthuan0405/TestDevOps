import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type PageProps = {
  params: {
    id: string;
  };

  searchParams: {
    page?: number;
    pageSize?: number;
  };
};
export default async function Page({ params, searchParams }: PageProps) {
  const finalParams = await params;
  const finalSearchParams = await searchParams;
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton className="h-6 w-[200px] mb-4" />
          <Skeleton className="h-4 w-[300px] mb-2" />
          <Skeleton className="h-4 w-[250px] mb-2" />
        </div>
      }
    >
      <Detail
        userId={finalParams.id}
        page={finalSearchParams.page}
        pageSize={finalSearchParams.pageSize}
      />
    </Suspense>
  );
}

type DetailProps = {
  userId: string;
  page?: number;
  pageSize?: number;
};

async function Detail(props: DetailProps) {
  await new Promise<string>(function (resolve, reject) {
    setTimeout(function () {
      resolve("resolved");
    }, 5000);
  });

  return (
    <>
      <h1>Customer Detail</h1>
      <p>User ID: {props.userId}</p>
      {props.page && <p>Page: {props.page}</p>}
      {props.pageSize && <p>Page Size: {props.pageSize}</p>}
    </>
  );
}
