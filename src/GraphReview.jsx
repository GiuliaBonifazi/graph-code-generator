import Title from "./components/Title"
import CriterionDisclosure from "./components/CriterionDisclosure"
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import useGraphFormContext from "./hooks/useGraphFormContext"

const GraphReview = () => {
    const {options} = useGraphFormContext()

    return <>
        <Title title="Graph review"></Title>
        <div className="w-full h-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 px-4 lg:px-0 items-center justify-center">
            <div className="mx-4 lg:mx-8 flex w-full items-center flex-col space-y-2">
                <h2 className="text-left self-start">Your graph code</h2>
                <TabGroup className="w-full">
                    <TabList className="space-x-2">
                        <Tab className="rounded border genericButton w-fit h-fit p-2">JavaScript</Tab>
                        <Tab className="rounded border genericButton w-fit h-fit p-2">Python</Tab>
                    </TabList>
                    <TabPanels className="border rounded w-full h-[40rem] pasteArea overflow-auto">
                        <TabPanel>
                            <pre className="whitespace-pre-wrap"><code>{options.graphs.js}</code></pre>
                        </TabPanel>
                        <TabPanel>
                            <pre className="whitespace-pre-wrap"><code>{options.graphs.py}</code></pre>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <div className="flex flex-col w-full">
                    <h2 className="text-left">Used prompt:</h2>
                    <textarea className="pasteArea border rounded resize-y min-w-[20rem] h-40" placeholder="Prompt goes here..." defaultValue={options.optionsPrompt}></textarea>
                </div>
            </div>
            <Disclosure as="div" className="flex flex-col self-start mr-4">
                <DisclosureButton className="border rounded genericButton w-fit h-fit p-2">Check criteria</DisclosureButton>
                <DisclosurePanel className="border rounded text-left lg:min-w-[20rem]">
                    {
                        options.criteria.map((element) => {
                            return <CriterionDisclosure key={element.id} id={element.id} level={element.level} name={element.name} desc={element.desc}/>
                        })
                    }
                </DisclosurePanel>
            </Disclosure>
        </div>
    </>
}

export default GraphReview