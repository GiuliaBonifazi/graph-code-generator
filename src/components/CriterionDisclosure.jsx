import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'


function CriterionDisclosure({level, id, name, desc} = props) {
  let levelClass = ""
  switch (level) {
    case"W": 
      levelClass = "warning"
      break;
    case "E":
      levelClass = "error"
      break;
    case "C":
      levelClass = "correct"
      break;
    default:
      levelClass = "warning"
      break;
  }
  return <Disclosure key={id + "-disclosure"} as="div" className="flex flex-col text-left">
    <div className={'flex flex-row ' + levelClass + "Background w-full"}>
      <DisclosureButton key={id + "-button"} className={"p-2 text-left hover:border "}>{name}</DisclosureButton>
      <input type="checkbox" dims="w-fit"></input>
    </div>
    <DisclosurePanel key={id + "-panel"} className={"text-left p-2 "  + levelClass + "Highlight"}>
      {desc}
    </DisclosurePanel>
  </Disclosure>
}

export default CriterionDisclosure