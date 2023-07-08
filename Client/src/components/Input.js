const Input = ({
  type,
  placeholder,
  handleChange,
  required,
  name,
  className,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        className={className}
        required={required}
      />
    </>
  );
};
export default Input;
