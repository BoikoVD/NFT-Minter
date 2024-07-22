interface IInput {
    name: string,
    id: string,
    labelText?: string,
    type?: React.HTMLInputTypeAttribute
}

export default function Input(props: IInput) {
    const {
        name,
        id,
        labelText,
        type = 'text'
    } = props;

    return (
        <div className="mb-4">
            {labelText && <label
                htmlFor={id}
                className="block mb-1 text-white"
            >
                {labelText}
            </label>}
            <div className="rounded bg-border-gradient p-[1px]">
                <input
                    id={id}
                    name={name}
                    type={type}
                    className="rounded bg-purple text-white py-2 px-3 w-full"
                />
            </div>
        </div>
    );
}