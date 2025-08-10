import { useState } from 'react'
import Title from './components/Title'
import GenericButton from './components/GenericButton'
import {datasetSelectionDefaultState, datasetSelectionStates} from './states/PageStates'
import { useNavigate } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


const DatasetSelection = () => {
    const [pageState, setPageState] = useState(datasetSelectionDefaultState)
    const buttonDims = "h-fit p-2 w-24 mb-2"
    const inputAreasDims = "lg:w-[40rem] lg:h-[25rem]"
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
            <TabGroup className="w-full h-fit">
                <TabList className="space-x-2">
                    <Tab  className="rounded border genericButton w-fit h-fit p-2" onClick={() => setPageState(() => "Paste")}>Paste</Tab>
                    <Tab  className="rounded border genericButton w-fit h-fit p-2" onClick={() => setPageState(() => "Upload")}>Upload</Tab>
                </TabList>
                <TabPanels className="border rounded w-full">
                    <TabPanel>
                        <textarea 
                            id="pasteTextArea"
                            className={'pasteArea border resize-none ' + inputAreasDims}
                            placeholder="Paste your dataset here" 
                        />
                    </TabPanel>
                    <TabPanel>
                        <div
                            className={inputAreasDims + ' flex border pasteArea content-center justify-center'}>
                            <input 
                                type="file" 
                                id="uploadFileInput" 
                                accept=".csv, .tsv, .txt"
                                className='text-center h-fit genericButton border rounded h-fit w-fit p-2 self-center'
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