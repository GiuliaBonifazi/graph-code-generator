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
                    <TabPanels className="border rounded w-full min-h-[40rem] min-w-[20rem] pasteArea">
                        <TabPanel>
                            <pre><code>console.log("Here's your JS code!")</code></pre>
                        </TabPanel>
                        <TabPanel>
                            <pre><code>print("Here's your Python code!")</code></pre>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <div className="flex flex-col w-full">
                    <h2 className="text-left">Used prompt:</h2>
                    <textarea className="pasteArea border rounded resize-y min-w-[20rem] h-40" value={options.optionsPrompt} placeholder="Prompt goes here..."></textarea>
                </div>
            </div>
            <Disclosure as="div" className="flex flex-col self-start mr-4">
                <DisclosureButton className="border rounded genericButton w-fit h-fit p-2">Check criteria</DisclosureButton>
                <DisclosurePanel className="border rounded text-left lg:min-w-[20rem]">
                    {
                        [   {criterion: "Le banane", explanation: "Maperche", level: "E"},
                            {criterion: "sono belle", explanation: "banane", level:"W"},
                            {criterion: "Uffaaaa uffa", explanation: "sì", level:"C"}
                        ].map((element) => {
                            const id = element.criterion.replace(" ", "-")
                            return <CriterionDisclosure key={id} id={id} level={element.level} criterion={element.criterion} explanation={element.explanation}/>
                        })
                    }
                </DisclosurePanel>
            </Disclosure>
        </div>
    </>
}

export default GraphReview