interface ITextField {
    name: string,
    id: string,
    labelText?: string,
    isRequired?: boolean,
}

export default function TextField(props: ITextField) {
    const {
        name,
        id,
        labelText,
        isRequired = false
    } = props;

    return (
        <div className="mb-4 w-full">
            {labelText && <label
                htmlFor={id}
                className="block mb-1 text-white"
            >
                {labelText}
            </label>}
            <div className="rounded bg-border-gradient p-[1px] w-full">
                <textarea 
                    id={id}
                    name={name}
                    rows={3}
                    draggable={false}
                    required={isRequired}
                    className="rounded bg-purple text-white py-2 px-3 w-full resize-none mb-[-7px]"
                />
            </div>
        </div>
    );
}