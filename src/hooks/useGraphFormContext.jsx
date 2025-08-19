import { useContext } from "react";
import GraphFormContext from "../contexts/GraphFormContext";

const useGraphFormContext = () => {
    return useContext(GraphFormContext)
}

export default useGraphFormContext