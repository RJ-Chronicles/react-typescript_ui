const Heading = (props: any) => {
  return (
    <div className="w-full bg-slate-200 text-slate-800 px-4 py-6 shadow-lg rounded-md">
      {props.children}
    </div>
  );
};
export default Heading;
