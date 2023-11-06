import { Todo } from "../types/types.ts";

export function TodoItem(props: Todo) {
  return (
    <div className="my-6">
      <a href={`todos/${props.id}`}>
        <p className="text-xl">{props.title}</p>
      </a>
      <div>
        <input
          type="checkbox"
          checked={props.is_done}
          className="checkbox checkbox-primary"
        />
      </div>
    </div>
  );
}
