const Header = (props: any) => {
  return (
    <div className="w-full bg-[#600080] text-slate-100 px-4 py-4 shadow-lg">
      {props.children}
    </div>
  );
};

export default Header;
