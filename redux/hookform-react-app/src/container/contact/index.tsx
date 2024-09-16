import "./index.css";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

enum FIELD_KEY {
  MESSAGE = "message",
  NAME = "name",
}

interface FormType {
  [FIELD_KEY.MESSAGE]: string;
  [FIELD_KEY.NAME]: string;
}
interface ContainerProps {
  name: string;
}

const validateRequired = (value: string): string | true =>
  value.length === 0 ? "Field cannot be empty" : true;
const isNumber = (value: string): string | true =>
  isNaN(Number(value)) ? "Value must be a number" : true;

export default function Container({ name }: ContainerProps) {
  const { register, formState, handleSubmit, reset } = useForm<FormType>({
    mode: "onChange",
    values: { [FIELD_KEY.MESSAGE]: "test message", [FIELD_KEY.NAME]: name },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve("test"), 5000)
    );
  };

  const onError: SubmitErrorHandler<FormType> = (errors) =>
    console.log("errors", errors);

  return (
    <div className="contact">
      <div className="contact__title">Contact form</div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="contact__form"
      >
        <input
          placeholder="Your message"
          className="contact__input"
          {...register(FIELD_KEY.MESSAGE, {
            validate: {
              validateRequired,
              isNumber,
            },
          })}
        />
        {formState.errors[FIELD_KEY.MESSAGE] && (
          <span>{formState.errors[FIELD_KEY.MESSAGE]?.message}</span>
        )}
        <button
          disabled={!formState.isValid || formState.isSubmitting}
          className="contact__button"
          type="submit"
        >
          Submit
        </button>
        {formState.isSubmitting && <span>Loading...</span>}
        <span>Submit count: {formState.submitCount}</span>
      </form>
    </div>
  );
}
