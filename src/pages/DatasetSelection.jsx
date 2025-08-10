import { useState } from 'react'
import Title from './components/Title'
import { useNavigate } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {STATE_PASTE, STATE_UPLOAD} from "./states/DatasetSelectionStates"


const DatasetSelection = () => {
    const [pageState, setPageState] = useState(STATE_PASTE)
    const navigate = useNavigate()

    return <>
        <Title title='Upload your dataset'/>
        <div className='lg:flex lg:w-fill lg:content-center lg:justify-center space-x-4'>
        <form 
        className='lg:flex lg:flex-col lg:justify-center'
        onSubmit={
            (event) => {
                event.preventDefault()
                navigate('/graph-options/')
            }
        }>
            <TabGroup >
                <TabList className="space-x-2">
                    <Tab  className="rounded border genericButton w-fit h-fit p-2" onClick={() => setPageState(() => STATE_PASTE)}>{STATE_PASTE}</Tab>
                    <Tab  className="rounded border genericButton w-fit h-fit p-2" onClick={() => setPageState(() => STATE_UPLOAD)}>{STATE_UPLOAD}</Tab>
                </TabList>
                <TabPanels className="border rounded lg:w-[40rem] lg:h-[25rem] min-w-[20rem] pasteArea">
                    <TabPanel className="w-full h-full">
                        <textarea 
                            id="pasteTextArea"
                            className='pasteArea resize-y w-full h-full'
                            placeholder="Paste your dataset here" 
                        />
                    </TabPanel>
                    <TabPanel className="w-full h-full">
                        <div
                            className='w-full h-full flex border pasteArea content-center justify-center'>
                            <input 
                                type="file" 
                                id="uploadFileInput" 
                                accept=".csv, .tsv, .txt"
                                className='text-center genericButton border rounded h-fit w-fit p-2 self-center'
                            />
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
                <input 
                    className='genericButton border rounded h-fit w-24 p-2 self-end mt-4' 
                    type='submit'>
                </input>
            </form>
        </div>
    </>
}

export default DatasetSelection