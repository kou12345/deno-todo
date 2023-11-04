type Todo = {
  id: number;
  title: string;
  is_done: boolean;
  created_at: Date;
  updated_at: Date;
};

export function Todo(props: Todo) {
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
