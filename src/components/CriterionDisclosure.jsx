import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { CiCircleQuestion, CiCircleCheck, CiCircleRemove } from "react-icons/ci";


function CriterionDisclosure({level, id, name, desc, onChange} = props) {
  let levelClass = ""
  let icon = null
  switch (level) {
    case"W": 
      levelClass = "warning"
      icon = <CiCircleQuestion></CiCircleQuestion>
      break;
    case "E":
      levelClass = "error"
      icon = <CiCircleRemove></CiCircleRemove>
      break;
    case "C":
      levelClass = "correct"
      icon = <CiCircleCheck></CiCircleCheck>
      break;
    default:
      levelClass = "warning"
      break;
  }
  return <Disclosure key={id + "-disclosure"} as="div" className="flex flex-col text-left">
    <div className={'flex flex-row ' + levelClass + "Background w-full items-center"}>
      <DisclosureButton key={id + "-button"} className={"p-2 text-left hover:border "}>{name}</DisclosureButton>
      {icon}
      <input name={id} type="checkbox" dims="w-fit" onChange={onChange}></input>
    </div>
    <DisclosurePanel key={id + "-panel"} className={"text-left p-2 "  + levelClass + "Highlight"}>
      {desc}
    </DisclosurePanel>
  </Disclosure>
}

export default CriterionDisclosure