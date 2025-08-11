import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'


function CriterionDisclosure(props) {
  let level = ""
  switch (props.level) {
    case"W": 
      level = "warning"
      break;
    case "E":
      level = "error"
      break;
    case "C":
      level = "check"
      break;
  }
  return <Disclosure key={props.id + "-disclosure"} as="div" className="flex flex-col text-left">
    <DisclosureButton key={props.id + "-button"} className={"p-2 text-left hover:border " + level + "Background"}>{props.criterion}</DisclosureButton>
    <DisclosurePanel key={props.id + "-panel"} className={"text-left p-2 "  + level + "Highlight"}>
      {props.explanation}
    </DisclosurePanel>
  </Disclosure>
}

export default CriterionDisclosure