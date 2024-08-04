interface IInput {
  name: string;
  id: string;
  labelText?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function Input(props: IInput) {
  const { name, id, labelText, type = "text" } = props;

  return (
    <div className="mb-4">
      {labelText && (
        <label htmlFor={id} className="mb-1 block text-white">
          {labelText}
        </label>
      )}
      <div className="rounded bg-border-gradient p-[1px]">
        <input
          id={id}
          name={name}
          type={type}
          className="w-full rounded bg-purple px-3 py-2 text-white"
        />
      </div>
    </div>
  );
}
