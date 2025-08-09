import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import type { CardUserProps } from "../libs/CardUserType";
import axios from "axios";
import { useState, useEffect} from "react";

export default function RandomUserPage() {
  const [users, setUsers] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(() =>{
    const num = window.localStorage.getItem("genAmount");
    return num !== null ? JSON.parse(num): 1;
  });

  // บันทึกค่า genAmount ลง localStorage ทุกครั้งที่มันเปลี่ยน
  
  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    
    //Your code here
    const cleanUsers = users.map(cleanUser);
    setUsers(cleanUsers);
    //Process result from api response with map function. Tips use function from /src/libs/CleanUser
    //Then update state with function : setUsers(...)
    setIsLoading(false);
  };

  useEffect(() => {

    localStorage.setItem("genAmount", JSON.stringify(genAmount));

  },[genAmount])


  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => setGenAmount(event.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {Array.isArray(users) && !isLoading && users.map((u: CardUserProps )=> < UserCard name={u.name} imgUrl={u.imgUrl} address={u.address} email={u.email} />)}
    </div>
  );
}
