import { useContext } from "react";
import GraphFormContext from "../contexts/GraphFormContext";

const useGraphFormContext = () => {
    const context = useContext(GraphFormContext);
    if (!context) {
        throw new Error("useGraphFormContext must be used within a GraphFormProvider");
    }
    return context;
}

export default useGraphFormContext