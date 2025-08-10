import Title from "./components/Title"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

const GraphReview = () => {
    return <>
        <Title title="Graph review"></Title>
        <div className="mx-8 lg:mx-40 flex items-center flex-col space-y-2">
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
                <textarea className="pasteArea border rounded resize-y min-w-[20rem] h-40" placeholder="Prompt goes here..."></textarea>
            </div>
        </div>

    </>
}

export default GraphReview