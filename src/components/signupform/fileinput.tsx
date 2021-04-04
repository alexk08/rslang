import React from 'react';

const FileInput = (props: any) => {
    const onChange = (e: any) => {
        const { input: { onChange } } = props;
        onChange(e.target.files[0]);
    }

    return (
        <input type="file" value={props.value} onChange={onChange}></input>
    );
}

export { FileInput };