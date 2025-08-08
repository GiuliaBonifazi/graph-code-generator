import { useState } from 'react'
import Title from './components/Title'
import GenericButton from './components/GenericButton'
import DatasetSelectionStates from './states/DatasetSelectionStates'
import { useNavigate } from 'react-router-dom'


const DatasetSelection = () => {
    const [pageState, setPageState] = useState(DatasetSelectionStates.PASTE)
    const buttonDims = "h-fit p-2 w-24 mb-2"
    const inputAreasDims = "lg:w-[40rem] lg:h-[25rem]"
    const navigate = useNavigate()

    return <>
        <Title title='Upload your dataset'/>
        <div className='lg:flex lg:w-fill lg:content-center lg:justify-center space-x-4'>
            <ul className='w-fit h-fit'>
                <li><GenericButton label='Paste' dims={buttonDims} onClick={() => setPageState(() => DatasetSelectionStates.PASTE)}/></li>
                <li><GenericButton label='Upload' dims={buttonDims} onClick={() => setPageState(() => DatasetSelectionStates.UPLOAD)}/></li>
            </ul>
            <form 
                className='lg:flex lg:flex-col lg:justify-center'
                onSubmit={
                    (event) => {
                        event.preventDefault()
                        navigate('/graph-options/')
                    }
                }>
                {(() => {switch (pageState) {
                    case DatasetSelectionStates.PASTE:
                        return <textarea 
                            id="pasteTextArea"
                            className={'pasteArea border resize-none ' + inputAreasDims}
                            placeholder="Paste your dataset here" 
                        />;
                    case DatasetSelectionStates.UPLOAD:
                        return <div
                            className={inputAreasDims + ' flex border pasteArea content-center justify-center'}>
                            <input 
                                type="file" 
                                id="uploadFileInput" 
                                accept=".csv, .tsv, .txt"
                                className='text-center h-fit genericButton border rounded h-fit w-fit p-2 self-center'
                            />
                        </div>;
                    default:
                        return <div className={inputAreasDims}>Select a dataset option</div>;
                }})()}
                <input 
                    className='genericButton border rounded h-fit w-24 p-2 self-end mt-4' 
                    type='submit'>
                </input>
            </form>
        </div>
    </>
}

export default DatasetSelection