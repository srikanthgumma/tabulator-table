import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Tabulator() {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [descriptions, setDescription] = useState('');
    useEffect(() => {
        axios.get(' https://jsonplaceholder.typicode.com/todos').then(function (response) {
            setData(response.data.slice(0, 20).filter((val) => val.description = 'Hello World..'))
        })
    }, []);

    const submitting = (e) => {
        e.preventDefault();
        setData([...data, { title: title, description: descriptions, completed: status }])
        setDescription('');
        setTitle('');
    }

    const TitleEdit = (val, index, array1) => {
        let newValue = prompt(`Enter a new value for ${val}`);
        if (newValue === '') {
            alert('Should not be empty')
        } else {
            data.splice(index, 1, { title: newValue, description: array1[index].description, completed: array1[index].completed });
            setData([...data])
        }
    }

    const descriptionEdit = (val, index, array1) => {
        let newValue = prompt(`Enter a new value for ${val}`);
        if (newValue === '') {
            alert('Should not be empty')
        } else {
            data.splice(index, 1, { title: array1[index].title, description: newValue, completed: array1[index].completed });
            setData([...data])
        }
    }

    const statusEdit = (val, index, array1) => {

    }

    return (
        <div style={{ width: '100%', padding: 18 }}>
            <h1>Task List Manager with Editable Table</h1>
            <div style={{padding: 15, margin: 'auto', marginBottom: '66px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                <form style={{ width: '100%', maxWidth: '700px', width: '100%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }} onSubmit={submitting}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', alignContent: 'flex-start' }}>
                        <label style={{ fontWeight: 'bold' }} >Title</label>
                        <input type='text' name='title' placeholder='enter the title' style={{ padding: 10, width: '100%', border: '1px solid black' }} value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                        <label style={{ fontWeight: 'bold' }}>Description</label>
                        <textarea rows={4} cols={20} placeholder='type the description' style={{ padding: 10, width: '100%', border: '1px solid black' }} value={descriptions} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                        <label style={{ fontWeight: 'bold' }} >Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 10, width: '100%', border: '1px solid black' }}>
                            <option value="Done">Done</option>
                            <option value="In Progress">In Progress</option>
                            <option value="To Do">To Do</option>
                        </select>
                    </div>
                    <input type='submit' value='Submit' style={{ fontSize: 18, width: 'fit-content', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10 }} />
                </form>
            </div>
            <div style={{overflowX:'auto'}}>
            <table style={{ borderCollapse: 'collapse', width: '900px', margin: 'auto', overflow: 'auto' }}>
                <tr style={{ backgroundColor: '#D3d3d3' }}>
                    <th>Title <button onClick={() => {
                        data.sort((a, b) => {
                            if (a.title < b.title) {
                                return -1;
                            }
                            if (a.title > b.title) {
                                return 1;
                            }
                            return 0;
                        });
                        setData([...data])
                    }} style={{ border: 'none' }}>sort</button></th>
                    <th>Description <button onClick={() => {
                        data.sort((a, b) => {
                            if (a.description < b.description) {
                                return -1;
                            }
                            if (a.description > b.description) {
                                return 1;
                            }
                            return 0;
                        });
                        setData([...data])
                    }} style={{ border: 'none' }}>sort</button></th>
                    <th style={{ padding: 10 }}>Status
                    </th>
                    <th>Action</th>
                </tr>
                {data && data.map((item, ind, aray) => {
                    return (
                        <tr key={ind} style={{ backgroundColor: item.completed == true ? 'pink' : item.completed == 'In Progress' ? '#FF7F7F' : item.completed == 'Done' ? 'pink' : '#FF7F7F' }}>
                            <td style={{ maxWidth: '200px' }}>{item.title}<button onClick={() => TitleEdit(title, ind, aray)} style={{ border: 'none', color: 'red', marginLeft: 6 }}>edit</button></td>
                            <td style={{ maxWidth: '800px' }} >{item.description}<button onClick={() => descriptionEdit(descriptions, ind, aray)} style={{ border: 'none', color: 'red', marginLeft: 6 }}>edit</button></td>
                            <td style={{ color: 'black', padding: 20, maxWidth: '790px' }}>{item.completed == true ? 'Done' : item.completed == 'To Do' ? 'To Do' : item.completed == 'In Progress' ? 'In Progress' : item.completed == 'Done' ? 'Done' : 'To Do'}
                                {/* <button onClick={() => statusEdit(status, ind, aray)} style={{ border: 'none', color: 'red', marginLeft: 6 }}>edit</button> */}
                            </td>
                            <td><button onClick={(ind) => {
                                data.splice(ind, 1);
                                setData([...data])
                            }} style={{ border: 'none' }} >Delete</button></td>
                        </tr>
                    )
                })}
            </table>
            </div>
          
        </div >
    )
}
