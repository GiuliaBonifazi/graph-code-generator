import Title from './components/Title'
import { useNavigate } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import useGraphFormContext from "./hooks/useGraphFormContext"


const DatasetSelection = () => {
    const navigate = useNavigate()

    const {handleChange, canToOptions} = useGraphFormContext()

    return <>
        <Title title='Upload your dataset'/>
        <div className='lg:flex lg:w-fill lg:content-center lg:justify-center space-x-4 mx-4 lg:mx-0'>
        <form 
        className='flex flex-col justify-center'
        onSubmit={
            (event) => {
                event.preventDefault()
                navigate('/graph-options/')
            }
        }>
            <TabGroup >
                <TabList className="space-x-2">
                    <Tab  className="rounded border genericButton w-fit h-fit p-2">Paste</Tab>
                    <Tab  className="rounded border genericButton w-fit h-fit p-2">Upload</Tab>
                </TabList>
                <TabPanels className="border rounded lg:w-[40rem] h-[20rem] lg:h-[25rem] min-w-[20rem] pasteArea">
                    <TabPanel className="w-full h-full">
                        <textarea 
                            id="pasteTextArea"
                            className='pasteArea resize-y w-full h-full'
                            placeholder="Paste your dataset here"
                            name="uploadData"
                            onChange={handleChange}
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
                                name="uploadData"
                                onChange={handleChange}
                            />
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
                <input 
                    className='genericButton border rounded h-fit w-24 p-2 self-end mt-4' 
                    type='submit'
                    disabled={!canToOptions}>
                </input>
            </form>
        </div>
    </>
}

export default DatasetSelection