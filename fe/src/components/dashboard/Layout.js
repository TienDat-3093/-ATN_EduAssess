/* import SideBar from "./SideBar";
import Index from "./myexams/Index";
import Create from "./myexams/Create";
import React,{useEffect,useState} from "react";
import { Route, Routes } from "react-router-dom";
export default function Layout() {
  const [onCreateClick, setOnCreateClick] = useState(false);

  const handleCreateClick =()=>{
    setOnCreateClick(true);
  }
  const handleBacktoIndex =()=>{
    setOnCreateClick(false);
  }
  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <SideBar />

            {onCreateClick?<Create onBacktoIndex={handleBacktoIndex}/>:<Index onCreateClick={handleCreateClick}/>}
            
          </div>
        </div>
      </section>
    </>
  );
}
 */