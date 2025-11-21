"use client";

import {PuffLoader} from "react-spinners"

function Loader() {
  return (
    <div>Loader
        <PuffLoader size={100} color="red"/>
    </div>
  )
}

export default Loader