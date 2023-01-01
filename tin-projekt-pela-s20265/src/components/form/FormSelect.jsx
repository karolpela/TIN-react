function FormSelect(props) {
  const className = props.error === '' ? '' : 'error-input';
  const name = props.name;
  const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);

  return (
    <>
      <label htmlFor={props.name}>
        {props.label}:
        {props.required && (
          <abbr title="required" aria-label="required">
            *
          </abbr>
        )}
      </label>
      <select
        className={className}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option>---select---</option>
        {props.options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {props.display.map((d) => opt[d]).join(' ')}
          </option>
        ))}
      </select>
      <span id={errorSpanId} className="errors-text">
        {props.error}
      </span>
    </>
  );
}

export default FormSelect;
