"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const PaginationButton = (props: { page: number; baseUrl: string }) => {
  const router = useRouter();
  const handleClickPrevious = () => {
    const searchParams = new URLSearchParams({
      page: String(props.page - 1),
    });
    const url = `${props.baseUrl}?${searchParams.toString()}`;
    router.push(url);
  };

  const handleClickNext = () => {
    const searchParams = new URLSearchParams({
      page: String(props.page + 1),
    });
    const url = `${props.baseUrl}?${searchParams.toString()}`;
    router.push(url);
  };
  return (
    <div className="flex gap-2">
      <Button onClick={handleClickPrevious} variant={"outline"} size={"sm"}>
        Précédent
      </Button>
      <Button onClick={handleClickNext} variant={"outline"} size={"sm"}>
        suivant
      </Button>
    </div>
  );
};
