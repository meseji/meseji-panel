"use client";
import { Icon } from "@/components/Icon";
import Title from "@/components/ui/Title";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import CreateBroadcast from "@/components/dashboard/broadcast/create-broadcast";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/dashboard/shared/MainHeader";

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
      {/* <div className="flex flex-col md:flex-row lg:flex-row  justify-between ">
        <Title>Broadcast</Title>
        <div className="flex items-center gap-3">
          <Button
            size="md"
            onClick={() => router.push("broadcast/new-broadcast")}
          >
            <Icon.plus size={18} className="mr-1" />
            New Broadcast
          </Button>
        </div>
      </div> */}
      <MainHeader title="Broadcast">
        <Button
          size="md"
          onClick={() => router.push("broadcast/new-broadcast")}
        >
          <Icon.plus size={18} className="mr-1" />
          New Broadcast
        </Button>
      </MainHeader>

      <CreateBroadcast />
    </div>
  );
}
