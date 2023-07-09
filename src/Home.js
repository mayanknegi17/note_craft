import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TopBarLoader from './components/TopBarLoader';

function Home() {

    const [noteData, setNoteData] = useState({
        title: "",
        description: ""
    });
    const [search, setSearch] = useState("")

    const [notesList, setNotesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [callGet, setCallGet] = useState(false)

    useEffect(() => {
        getNotes();
    }, [callGet])

    const getNotes = async () => {
        try {
            const response = await axios.get('https://cloud-notes-znsm.onrender.com/api/todos/get', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status == 200) {
                setNotesList(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleAddNote = async () => {
        if (noteData.title !== "" && noteData.description !== "") {
            setLoading(true);
            try {
                const response = await axios.post('https://cloud-notes-znsm.onrender.com/api/todos/add', noteData);
                if (response.status == 200) {
                    setNoteData({
                        title: "",
                        description: ""
                    });
                    setLoading(false);
                    setCallGet(!callGet);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        else {
            alert("Please Fill title and discription")
        }
    }

    const handleInput = (e) => {
        let value = e.target.value, name = e.target.name;
        setNoteData({
            ...noteData,
            [name]: value
        });
    }

    const handleDelete = async (item) => {
        setLoading(true);
        console.log("ddddddd", item)
        try {
            const response = await axios.delete(`https://cloud-notes-znsm.onrender.com/api/todos/delete/${item._id}`);
            if (response.status == 200) {
                setLoading(false);
                setCallGet(!callGet);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const searchValue = async (e) => {
        if(e.key == "Enter") {
            setLoading(true);
            try {
                const response = await axios.get(`https://cloud-notes-znsm.onrender.com/api/todos/search?query=${search}`);
                if (response.status == 200) {
                    setLoading(false);
                    setNotesList(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return (
        <div className='notes-container'>
            <section className='nc-left-section'>
                <form className='ncls-form'>
                    {loading && <TopBarLoader />}
                    <h3>Write Your Note</h3>
                    <div className='nclsf-field'>
                        <label>Title</label>
                        <input type="text" name="title" value={noteData.title} onChange={handleInput} />
                    </div>
                    <div className='nclsf-field'>
                        <label>Description</label>
                        <input placeholder='Write your note here' name="description" value={noteData.description} onChange={handleInput} />
                    </div>
                    <button type='button' onClick={handleAddNote} disabled={noteData.title == "" || noteData.description == "" || loading}>Add Note</button>
                </form>
            </section>
            <section className='nc-right-section'>
                <h3>Notes Collection</h3>
                <div className='ncrs-search'>
                    <input type='text' placeholder='Search...' value={search} onChange={handleSearch} onKeyDown={searchValue} />
                </div>
                <ul>
                    {notesList.length !== 0 ?
                        notesList.map((item, index) =>
                            <li key={index}>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                                <div className='list-button'>
                                    {/* <button type='button' >Update</button> */}
                                    <button type='button' className='delete' onClick={() => handleDelete(item)} disabled={loading}>Delete</button>
                                </div>
                            </li>) :
                        <li className='no-data-found'>No Notes Found</li>
                    }
                </ul>
            </section>
        </div>
    )
}

export default Home