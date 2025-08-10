import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'


function CriterionDisclosure(props) {
    return <Disclosure>
      <DisclosureButton className="py-2">{props.criterion}</DisclosureButton>
      <DisclosurePanel className="text-gray-500">
        {props.explanation}
      </DisclosurePanel>
    </Disclosure>
}

export default CriterionDisclosure