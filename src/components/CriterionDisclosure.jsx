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
    default:
      levelClass = "check"
      break;
  }
  return <Disclosure key={id + "-disclosure"} as="div" className="flex flex-col text-left">
    <DisclosureButton key={id + "-button"} className={"p-2 text-left hover:border " + levelClass + "Background"}>{name}</DisclosureButton>
    <DisclosurePanel key={id + "-panel"} className={"text-left p-2 "  + levelClass + "Highlight"}>
      {desc}
    </DisclosurePanel>
  </Disclosure>
}

export default CriterionDisclosure