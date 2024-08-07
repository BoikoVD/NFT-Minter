import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";
import InputErrorMessage from "./InputErrorMessage";

interface ITextField {
  name: string;
  id: string;
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  labelText?: string;
  rows?: number;
  error?: string;
}

export default forwardRef<HTMLTextAreaElement, ITextField>(
  function TextField(props, ref) {
    const { name, id, onChange, onBlur, labelText, rows = 3, error } = props;

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
            onChange={onChange}
            onBlur={onBlur}
            rows={rows}
            draggable={false}
            className="mb-[-8px] w-full resize-none rounded bg-purple px-3 py-2 text-white"
            ref={ref}
          />
        </div>
        <InputErrorMessage error={error} />
      </div>
    );
  }
);
