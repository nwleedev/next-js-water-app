import { ICompare } from "../interface/compare";
import {compare} from '../styles/js/element'

const WaterCompare = (props: ICompare) => {
  const {total, required} = props;
  if(!required) {
    return (
      <h6 className={compare + " text-danger rounded"}>최소 섭취량을 입력해주시기 바랍니다.</h6>
    )
  }
  if(total < required) {
    return (
      <h6 className={compare + " bg-danger text-white rounded"}>물 섭취량을 더 늘리도록 하세요.</h6>
    )
  } else {
    return (
      <h6 className={compare + " bg-success text-white rounded"}>최소 요구 섭취량을 채우셨습니다.</h6>
    )
  }
}

export default WaterCompare;