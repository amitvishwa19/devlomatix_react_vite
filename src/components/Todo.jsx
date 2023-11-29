import React, { useEffect, useState } from 'react'
import { addTodo, removeTodo } from '../redux/reducers/TodoReducer'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Todo() {

    const dispach = useDispatch()
    const [todo, setTodo] = useState('')
    const todos = useSelector(data => data.todos.todosData)


    useEffect(() => {
        console.log(todos)
    }, [todos])


    const handleAddTodo = () => {
        if (todo !== '') {
            dispach(addTodo(todo))
            setTodo('')
            toast.success('Item added successfully added to your Todo List ');
        } else {
            toast.error('Please enter something to add !');
        }
    }

    const handleRemoveTodo = (item) => {
        dispach(removeTodo(item))
        toast.success('Item deleted successfully from your Todo List ');
    }

    return (
        <Card style={{ width: '50%' }}>
            <Card.Header>
                <Card.Title style={{ marginBottom: 10 }}>Todo App with Redux</Card.Title>
                <InputGroup className="mb-3">
                    <Form.Control placeholder="Add a new Todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
                    <Button onClick={handleAddTodo} id="basic-addon2" style={{ cursor: 'pointer' }}>Add Todo</Button>
                </InputGroup>
            </Card.Header>
            <Card.Body>

                <ListGroup>

                    {
                        todos.length > 0 ?
                            todos.map((item, index) => {
                                return (

                                    // <div key={index} style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', padding: 5, margin: 5 }}>
                                    //     <li key={index}>{item.text} </li>
                                    //     <span className='cursor-pointer bg-zinc-500 rounded  px-2' onClick={() => { handleRemoveTodo(item) }}>Delete</span>
                                    // </div>
                                    <ListGroup.Item key={index} className='d-flex justify-content-between align-items-start'>
                                        {item.text}
                                        <span onClick={() => { handleRemoveTodo(item)}} style={{cursor:'pointer',fontSize:12,backgroundColor:'grey',borderRadius:5,paddingInline:5,alignItems:'center'}}>Delete</span>
                                    </ListGroup.Item>
                                )
                            }) : <span className=''>No Todo item found</span>
                    }
                </ListGroup>
            </Card.Body>
            <Toaster />
        </Card>
    )
}
