"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Button from "@/components/ui/Button";


export default function ModalDialog({
  buttonName = "Open Dialog",
  title = "Dialog Title",
  children,
  footerLeftContent = null,
  buttonDisable = false,
  onAgree = () => {},
  onCancel = () => {},
}) {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        size="md"
        variant="outline"
        className="flex items-center"
        disabled={buttonDisable}
        icon="zap"
      >
        <span className="hidden lg:flex">{buttonName}</span>
      </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-2xl [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            {title}
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto"
          >
            <DialogDescription asChild>
              <div className="px-6 py-4">{children}</div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t border-border px-6 py-4 sm:items-center">
          {footerLeftContent && (
            <span className="grow text-xs text-muted-foreground max-sm:text-center">
              {footerLeftContent}
            </span>
          )}
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!hasReadToBottom} onClick={onAgree}>
              Send
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
