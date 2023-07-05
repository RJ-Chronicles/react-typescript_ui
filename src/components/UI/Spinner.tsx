import { ColorRing, Dna } from "react-loader-spinner";
import Backdrop from "@mui/material/Backdrop";
interface SpinnerProps {
  width: string;
  height: string;
  visible: boolean;
}
const Spinner = (props: SpinnerProps) => {
  const { width = 100, height = 100, visible = true } = props;
  return (
    <Backdrop
      sx={{ color: "#ccfff5", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={visible}
    >
      <div className="flex justify-center items-center w-80 h-36 bg-slate-100 border-2 border-slate-400">
        {/* <ColorRing
          visible={visible}
          height={height}
          width={width}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        /> */}
        <Dna
          visible={true}
          height={width}
          width={height}
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        {/* <BallTriangle
          height={120}
          width={120}
          radius={5}
          color="#00539C"
          ariaLabel="ball-triangle-loading"
          visible={visible}
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        /> */}
      </div>
    </Backdrop>
  );
};

export default Spinner;
