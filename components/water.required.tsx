import { IRequired } from "../interface/required";

const WaterRequired = (props: IRequired) => {
  const {required} = props;
  if (!required) return <></>;
  return <h6 className="text-primary font-weight-bold">하루동안 마셔야 하는 물의 양: {required}ml</h6>
}

export default WaterRequired;