import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MessageSquareMore } from "lucide-react";

type PostCardProps = {
  id: string;
  userImage: string;
  username: string;
  createdDate: Date;
  title: string;
  description: string;
  totalComments: number;
  status: "ANSWERED" | "UNANSWERED";
};

export const PostCard = (props: PostCardProps) => {
  const postDetailURL = `/post/${props.id}`;
  return (
    <div className="space-y-4 rounded-xl border p-6 shadow">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage
              src={props.userImage || undefined}
              alt={`${props.username}'s avatar`}
            />
            <AvatarFallback>
              {props.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <Link href={"/profile/" + props.username}>
              <p className="font-medium">{props.username}</p>
            </Link>
            <p className="text-muted-foreground text-sm">
              {props.createdDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        {props.status === "UNANSWERED" ? (
          <Badge className="h-fit" variant={"secondary"}>
            {props.status}
          </Badge>
        ) : (
          <Badge className="h-fit" variant={"default"}>
            {props.status}
          </Badge>
        )}
      </div>

      {/* Content */}
      <Link href={postDetailURL} className="group">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold group-hover:text-blue-500">
            {props.title}
          </h3>
          <p className="">{props.description}</p>
        </div>
      </Link>

      {/* Footer */}
      <div className="mt-4 flex justify-between border-t pt-3">
        <div className="text-muted-foreground flex items-center gap-1">
          <MessageSquareMore className="size-4" />
          <p className="text-sm">{props.totalComments}</p>
        </div>
        <Link href={postDetailURL} className="text-sm">
          View Post
        </Link>
      </div>
    </div>
  );
};
