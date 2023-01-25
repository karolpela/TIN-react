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
        {/* TODO show this*/}
        <option>---select---</option>
        {props.options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {props.display
              .map((d) => {
                d = d.split('.');
                let label;
                let prop = d[0];
                if (d.length === 1) {
                  //allow access to props nested on 1 level
                  label = opt[prop];
                } else {
                  let nestedProp = d[1];
                  let obj = opt[prop];
                  label = obj[nestedProp];
                }
                return label;
              })
              .join(' ')}
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
