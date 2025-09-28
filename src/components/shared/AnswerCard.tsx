import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AnswerCardProps = {
  id: string;
  username: string;
  createdAt: string;
  userImage: string;
  body: string;
};

export const AnswerCard = (props: AnswerCardProps) => {
  return (
    <div className="space-y-4 rounded-xl border p-6 shadow">
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={props.userImage ?? ""} />
          <AvatarFallback>
            {props.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="font-medium">{props.username}</p>
          <p className="text-muted-foreground text-sm">{props.createdAt}</p>
        </div>
      </div>

      <div>
        <p>{props.body}</p>
      </div>
    </div>
  );
};
