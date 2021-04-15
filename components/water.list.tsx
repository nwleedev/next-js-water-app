import { Button } from "react-bootstrap";
import { IListProps } from "../interface/list.props";
import { overflowY } from "../styles/js/element";

const WaterList = (props: IListProps) => {
  const {list, setList} = props;
  const filtered = list.filter(el => {
    const dat = new Date(el.date);
    const today = new Date();
    return dat.getDate() === today.getDate() && dat.getMonth() === today.getMonth();
  })
  const handleRemove = (e: any, key: string) => {
    e.preventDefault();
    const newList = list.filter(el => el.key !== key);
    const str = JSON.stringify(newList);
    window.localStorage.setItem("water-list", str);
    setList(newList);
  }
  return (
    <div className={overflowY}>
      {filtered.map(el => (
        <div key={el.key} className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="my-2">{el.amount}ml</h3>
            <h6>{new Date(el.date).toLocaleString()}</h6>
          </div>
          <Button variant="danger" size="sm" onClick={e => handleRemove(e, el.key)}>remove</Button>
        </div>
      ))}
    </div>
  );
}

export default WaterList;