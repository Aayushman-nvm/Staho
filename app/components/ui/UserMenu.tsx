"use client";

import { useState } from "react";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

function UserMenu() {
  const registerModal=useRegisterModal();
  const [isOpen, setIsOpen]=useState(false);
  function toggleOpen(){
    setIsOpen(!isOpen);
  }
  return (
    <div onClick={toggleOpen}>UserMenu
        <Avatar/>
        {!isOpen&&(
          <div>
            <MenuItem onClick={()=>{}} label={"Log In"}/>
            <MenuItem onClick={registerModal.onOpen} label={"Sign up"}/>
          </div>
        )}
    </div>
  )
}

export default UserMenu