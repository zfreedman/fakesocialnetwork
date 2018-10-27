import classnames from "classnames";
import propTypes from "prop-types";
import React from "react";

const TextFieldGroup = ({
  disabled,
  error,
  info,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <div className="form-group">
      <input
        className={
          classnames(
              "form-control form-control-lg",
              {
                "is-invalid": error,
              }
          )
        }
        disabled={disabled}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />

      {
        info && <small className="form-text text-muted">{ info }</small>
      }

      {
        error && <div className="invalid-feedback">{ error }</div>
      }
    </div>
  );
};

TextFieldGroup.propTypes = {
  disabled:     propTypes.string,
  error:        propTypes.string,
  info:         propTypes.string,
  onChange:     propTypes.func.isRequired,
  name:         propTypes.string.isRequired,
  placeholder:  propTypes.string,
  type:         propTypes.string.isRequired,
  value:        propTypes.string.isRequired,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;