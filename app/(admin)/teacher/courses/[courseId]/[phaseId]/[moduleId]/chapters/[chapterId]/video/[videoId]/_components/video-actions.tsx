"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface VideoActionsProps {
  disabled: boolean;
  courseId: string;
  phaseId: string;
  moduleId: string;
  chapterId: string;
  videoId: string
  isPublished: boolean;
};

export const VideoActions = ({
  disabled,
  courseId,
  phaseId,
  moduleId,
  chapterId,
  videoId,
  isPublished
}: VideoActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/${phaseId}/${moduleId}/chapters/${chapterId}/videos/${videoId}/unpublish`);
        toast.success("Video unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/${phaseId}/${moduleId}/chapters/${chapterId}/videos/${videoId}/publish`);
        toast.success("Video published");
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/${phaseId}/${moduleId}/chapters/${chapterId}//videos/${videoId}`);

      toast.success("Video deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/${phaseId}/${moduleId}/${chapterId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}