export interface BtnProps {
  title: string;
  action?(): any;
  primary?: boolean;
  disabled?: boolean;
  name?: string;
}

const Btn = (props: BtnProps) => {
  const { title, action, primary, disabled, name } = props;
  return (
    <button
      type="submit"
      onClick={action}
      name={name}
      className={`${primary ? "primary_btn" : "outline_btn"} btn`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Btn;
