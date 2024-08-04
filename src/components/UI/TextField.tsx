interface ITextField {
  name: string;
  id: string;
  labelText?: string;
  isRequired?: boolean;
}

export default function TextField(props: ITextField) {
  const { name, id, labelText, isRequired = false } = props;

  return (
    <div className="mb-4 w-full">
      {labelText && (
        <label htmlFor={id} className="mb-1 block text-white">
          {labelText}
        </label>
      )}
      <div className="w-full rounded bg-border-gradient p-[1px]">
        <textarea
          id={id}
          name={name}
          rows={3}
          draggable={false}
          required={isRequired}
          className="mb-[-7px] w-full resize-none rounded bg-purple px-3 py-2 text-white"
        />
      </div>
    </div>
  );
}
