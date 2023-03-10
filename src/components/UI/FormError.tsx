const FormError = (props: any) => {
  const { title, classes } = props;
  let setClasses = "text-xs italic text-red-500";
  if (classes) {
    setClasses = `${setClasses} ${classes}`;
  } else {
    setClasses = `${setClasses} text-sm font-normal`;
  }
  return (
    <p className={setClasses} role="alert">
      {title}
    </p>
  );
};

export default FormError;
