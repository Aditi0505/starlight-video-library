const Input = ({ inputType, label, placeholder, inputHandler, value }) => {
    return (
      <>
        <label
          htmlFor={inputType}
          className="required-content label-content ft-bolder"
        >
          {label}
        </label>
        <input
          type={inputType}
          required
          name={inputType}
          id={label.toLowerCase()}
          className="inputBox margin-tb-sm padding-xs input-width"
          placeholder={placeholder}
          onChange={(e) => inputHandler(e, label.toLowerCase())}
          value={value}
        />
      </>
    );
  };
  
  export { Input };
  