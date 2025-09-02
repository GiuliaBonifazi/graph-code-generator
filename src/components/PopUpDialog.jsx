import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import useGraphFormContext from "../hooks/useGraphFormContext"

const PopUpDialog = () => {
  const {isPopUpOpen, setPopUpOpen, popUpMessage} = useGraphFormContext()
  return <Dialog open={isPopUpOpen} onClose={() => setPopUpOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border rounded bg-white p-12 errorBackground">
          <DialogTitle className="font-bold">Error!</DialogTitle>
          <Description>{popUpMessage}</Description>
          <button 
            className="self-end w-fit h-fit p-2 border rounded errorHighlight hover:border-4 hover:font-bold" 
            onClick={() => setPopUpOpen(false)}>
              Close
          </button>
        </DialogPanel>
      </div>
    </Dialog>
}

export default PopUpDialog