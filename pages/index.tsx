import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import WaterCompare from "../components/water.compare";
import WaterList from "../components/water.list";
import WaterRequired from "../components/water.required";
import useInput from "../hooks/use.input";
import { IListItem } from "../interface/list.item";
import { element } from "../styles/js/element";

export default function Home() {
  const [value, setValue] = useState("")
  const [required, setRequired] = useState(0);
  const formWeight = useInput();
  const [list, setList] = useState<IListItem[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const list = window.localStorage.getItem("water-list")
    if(!list) setList([] as IListItem[])
    else setList(JSON.parse(list))

    const required = window.localStorage.getItem("water-required")
    if(!required) setRequired(0)
    else {
      const temp = parseInt(JSON.parse(required), 10)
      setRequired(temp);
    }
  }, []);
  useEffect(() => {
    let sum = 0;
    const filtered = list.filter(el => {
      const dat = new Date(el.date);
      const today = new Date();
      return dat.getDate() === today.getDate() && dat.getMonth() === today.getMonth();
    })
    for(let i = 0; i < filtered.length; i++){
      sum += filtered[i].amount;
    }
    setTotal(sum);
  }, [list])
  const handleChange = (e) => {
    e.preventDefault();
    const temp = e.target.value;
    if(temp.length === 0) setValue("");
    const lastInput = temp[temp.length - 1];
    if(isNaN(lastInput)){
      return
    }
    setValue(temp);
  }
  const handleList = (e) => {
    e.preventDefault();
    const currentDate = Date.now();
    const obj = {
      key: Math.random().toString(16).slice(2),
      amount: parseInt(value),
      date: currentDate
    }
    const newList = [...list, obj];
    const str = JSON.stringify(newList);
    window.localStorage.setItem("water-list", str);
    setValue("");
    setList(newList);
  }
  const handleCalculate = (e) => {
    e.preventDefault();
    const temp = parseInt(formWeight.value, 10) * 30
    window.localStorage.setItem("water-required", temp.toString(10))
    setRequired(temp);
    return;
  }
  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Hello Water App!</h1>
      <Form className={element} onSubmit={handleList}>
        <Form.Group controlId="amount">
          <div className="d-flex">
            <Form.Control className="mr-1" type="text" onChange={handleChange} value={value} placeholder="방금 마신 물의 양"/>
            <Button variant="primary" type="submit" className="text-nowrap">입력</Button>
          </div>
          <Form.Text className="mt-1">물 한 컵 당 200ml라 생각해주세요.</Form.Text>
        </Form.Group>
      </Form>
      <Form className={element} onSubmit={handleCalculate}>
        <Form.Group controlId="amount" className="d-flex">
          <Form.Control className="mr-1" type="text" {...formWeight} placeholder="체중의 30배가 곧 하루 물 섭취량입니다."/>
          <Button variant="primary" type="submit" className="text-nowrap">계산</Button>
        </Form.Group>
      </Form>
      <div className={element}>
        <h3 className="font-weight-light">오늘 마신 물의 양 : {total}ml</h3>
        <WaterRequired required={required}/>
        <WaterList list={list} setList={setList}/>
        <WaterCompare total={total} required={required}/>
      </div>
    </Container>
  )
}
