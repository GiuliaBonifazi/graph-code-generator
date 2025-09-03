import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'


function CriterionDisclosure({level, id, name, desc, onChange} = props) {
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
    <div className={'flex flex-row ' + levelClass + "Background w-full items-center p-2 space-x-2"}>
      <DisclosureButton key={id + "-button"} className={"text-left hover:border "}>{`${level}: ${name}`}</DisclosureButton>
      <input name={id} type="checkbox" className="self-center justify-end" onChange={onChange}></input>
    </div>
    <DisclosurePanel key={id + "-panel"} className={"text-left p-2 "  + levelClass + "Highlight"}>
      {desc}
    </DisclosurePanel>
  </Disclosure>
}

export default CriterionDisclosure