import {Title} from "./components/Title"
import CriterionDisclosure from "./components/CriterionDisclosure"
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import useGraphFormContext from "./hooks/useGraphFormContext"
import { IconContext } from "react-icons"
import PopUpDialog from "./components/PopUpDialog"

const LEVEL_LEGEND = `Check the checkbox beside the criterion if the LLM evaluation was wrong. 
The levels are:
- W for warning if the LLM could not determine whether the criterion was respected or not;
- E for error if the criterion was not respected;
- C for correct if the criterion was respected.`

const GraphReview = () => {
    const {options, updateSingleCriterion, onSubmitReports, canSubmitReports} = useGraphFormContext()

    return <>
        <Title title="Graph review"></Title>
        <PopUpDialog></PopUpDialog>
        <div className="w-full h-full flex flex-col lg:flex-row py-8 px-8 gap-4">
            <div className="flex flex-col flex-grow space-y-2">
                <h2 className="text-left self-start">Your graph code</h2>
                <TabGroup className="w-full">
                    <TabList className="space-x-2">
                        <Tab className="rounded border genericButton w-fit h-fit p-2">JavaScript</Tab>
                        <Tab className="rounded border genericButton w-fit h-fit p-2">Python</Tab>
                    </TabList>
                    <TabPanels className="border rounded max-w-full w-full h-[40rem] pasteArea overflow-auto">
                        <TabPanel>
                            <pre className="whitespace-pre-wrap max-w-full break-words overflow-auto w-full h-full">
                                <code className="max-w-full break-words">
                                    {options.graphs.js}
                                </code>
                            </pre>
                        </TabPanel>
                        <TabPanel>
                            <pre className="whitespace-pre-wrap max-w-full break-words overflow-auto w-full h-full">
                                <code className="max-w-full break-words">
                                    {options.graphs.py}
                                </code>
                            </pre>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
            <Disclosure as="div" className="flex flex-col self-start lg:w-[20rem] shrink-0">
                <DisclosureButton className="border rounded genericButton w-fit h-fit p-2">Check criteria</DisclosureButton>
                <div className="flex flex-col md:flex-row lg:flex-col">
                    <pre className="md:w-[30rem] w-fit lg:w-fit">{LEVEL_LEGEND}</pre>
                    <DisclosurePanel className="border rounded text-left w-[20rem]">
                        {
                            options.criteria.map((element) => {
                                return <CriterionDisclosure 
                                    key={element.criterion_id} 
                                    id={element.criterion_id} 
                                    level={element.level} 
                                    name={element.name} 
                                    desc={element.description}
                                    onChange={updateSingleCriterion}
                                />
                            })
                        }
                        <button onClick={onSubmitReports} 
                            disabled={!canSubmitReports} 
                            className="genericButton w-full p-2">
                            Submit
                        </button>
                    </DisclosurePanel>
                </div>
            </Disclosure>
        </div>
        {/* <div className="flex flex-col w-full px-8 pb-8">
            <h2 className="text-left">Used prompt:</h2>
            <textarea className="pasteArea border rounded resize-y min-w-[20rem] h-40" placeholder="Prompt goes here..." defaultValue={options.optionsPrompt}></textarea>
        </div> */}
    </>
}

export default GraphReview