"use client";
import { Icon } from "@/components/Icon";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/dashboard/shared/MainHeader";
import Broadcast from "@/components/dashboard/broadcast/broadcasts";

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };
  return (
    <div className="flex flex-col h-full w-full space-y-2">
      <MainHeader title="Broadcast">
        <Button
          size="md"
          onClick={() => router.push("broadcast/new-broadcast")}
        >
          <Icon.plus size={18} className="mr-1" />
          New Broadcast
        </Button>
      </MainHeader>

      <Broadcast />
      
    </div>
  );
}
